const candidateRepository = require('../repositories/candidateRepository');
const { Skill, Resume, CandidateQuestion, MatchResult } = require('../models');
const aiService = require('./aiService');

class CandidateService {
  async getAllCandidates() {
    return await candidateRepository.findAll();
  }

  async getCandidateById(id) {
    return await candidateRepository.findById(id);
  }

  async updateStatus(id, status) {
    return await candidateRepository.updateStatus(id, status);
  }

  async searchAndRank(query, location = '') {
    const candidates = await candidateRepository.findByKeywordsOrLocation(query, location);
    if (candidates.length === 0) return [];

    try {
      const aiRankings = await aiService.rankCandidates(candidates, `Search Query: ${query}, Location: ${location}`);
      
      return candidates.map(c => {
        const ranking = aiRankings.find(r => r.id === c.id) || { matchScore: 0, reasoning: 'No AI feedback' };
        return {
          ...c.toJSON(),
          matchScore: ranking.matchScore,
          aiReasoning: ranking.reasoning,
          isQualified: ranking.matchScore >= 70
        };
      }).sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
      console.error('AI Ranking failed, falling back to basic search:', error);
      // Fallback: the repository already filtered by location and keywords (OR logic)
      return candidates.map(c => ({
        ...c.toJSON(),
        matchScore: 50, // Static score for fallback
        isQualified: true
      }));
    }
  }

  async processResumeUpload(file, candidateData, textContent) {
    // 1. Intelligent Evaluation using Gemini AI
    const aiResult = await aiService.parseResume(textContent);
    
    // 2. Create Candidate
    console.log('STEP 2: Creating candidate record...');
    const candidate = await candidateRepository.create({
      name: aiResult.name || candidateData.name,
      title: aiResult.title || candidateData.title,
      experience: aiResult.experience || candidateData.experience,
      education: aiResult.education || candidateData.education,
      status: 'pending'
    });
    console.log('CANDIDATE CREATED:', candidate.id);
    
    // 3. Create Resume entry
    console.log('STEP 3: Creating resume record...');
    const path = require('path');
    const fs = require('fs');
    const uploadDir = path.join(__dirname, '../../uploads');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Save buffer to disk
    fs.writeFileSync(filePath, file.buffer);
    console.log('FILE SAVED TO DISK:', filePath);

    const resume = await Resume.create({
      candidate_id: candidate.id,
      file_name: file.originalname,
      file_path: filePath
    });
    console.log('RESUME RECORD CREATED:', resume.id);

    // 4. Extract and Save Skills
    const extractedSkills = aiResult.skills || [];
    const requiredSkills = ['JavaScript', 'React', 'Node.js', 'SQL', 'AWS'];
    
    const matched = extractedSkills.filter(s => typeof s === 'string' && requiredSkills.some(rs => s.includes(rs)));
    const missing = requiredSkills.filter(rs => !extractedSkills.some(s => typeof s === 'string' && s.includes(rs)));
    const score = Math.round((matched.length / requiredSkills.length) * 100);

    let classification = 'Rejected';
    if (score >= 80) classification = 'Excellent Match';
    else if (score >= 60) classification = 'Good Match';
    else if (score >= 40) classification = 'Average';

    // Auto-update candidate status
    candidate.status = (classification === 'Excellent Match' || classification === 'Good Match') ? 'shortlisted' : 'rejected';
    candidate.score = score;
    await candidate.save();
    console.log('CANDIDATE STATUS UPDATED');

    // 5. Add skills to candidate
    console.log('STEP 5: Adding skills...');
    for (const skillName of extractedSkills) {
      if (typeof skillName !== 'string') continue;
      const [skill] = await Skill.findOrCreate({ where: { name: skillName } });
      await candidate.addSkill(skill);
    }
    console.log('SKILLS ADDED');

    // 6. Persist Match Result
    console.log('STEP 6: Creating match result...');
    const matchResult = await MatchResult.create({
      candidate_id: candidate.id,
      resume_id: resume.id,
      score: score,
      classification: classification,
      matched_skills: JSON.stringify(matched),
      missing_skills: JSON.stringify(missing)
    });
    console.log('MATCH RESULT CREATED:', matchResult.id);

    return { candidate, resume, matchResult, aiResult };
  }
}

module.exports = new CandidateService();
