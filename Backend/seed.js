const { User, Candidate, Skill, CandidateQuestion, MatchResult, Resume } = require('./src/models');
const { hashPassword } = require('./src/utils/auth');
const { connectDB, sequelize } = require('./src/config/db');
require('dotenv').config();

const seedData = async () => {
  await connectDB();
  await sequelize.sync({ force: true });

  console.log('🌱 Seeding data...');

  console.log('🌱 Seeding mock candidate data...');

  // Create Mock Candidates
  const candidates = [
    {
      name: 'Michael Chen',
      title: 'Senior Software Engineer',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 012-3456',
      location: 'San Francisco, CA',
      experience: '8 years',
      education: "M.S. in Computer Science, Stanford University",
      score: 94,
      summary: 'Experienced backend engineer specializing in cloud-native applications and distributed systems. Expert in Java and Kubernetes.',
      status: 'shortlisted'
    },
    {
      name: 'Sarah Williams',
      title: 'Frontend Developer',
      email: 'sarah.w@example.com',
      phone: '+1 (555) 987-6543',
      location: 'Austin, TX',
      experience: '5 years',
      education: "B.A. in Digital Arts & Design",
      score: 88,
      summary: 'Creative frontend developer with a strong eye for design and expertise in React and modern CSS frameworks.',
      status: 'review'
    }
  ];

  for (const cData of candidates) {
    const candidate = await Candidate.create(cData);
    
    // Add Skills
    const skills = ['JavaScript', 'React', 'Node.js', 'AWS', 'Docker', 'SQL'];
    for (const sName of skills) {
      const [skill] = await Skill.findOrCreate({ where: { name: sName } });
      await candidate.addSkill(skill);
    }

    // Add Resume
    const resume = await Resume.create({
      candidate_id: candidate.id,
      file_name: `${cData.name.toLowerCase().replace(' ', '_')}_resume.pdf`,
      file_path: 'uploads/mock_resume.pdf'
    });

    // Add Match Result
    await MatchResult.create({
      candidate_id: candidate.id,
      resume_id: resume.id,
      score: cData.score,
      classification: cData.score >= 80 ? 'Excellent Match' : 'Good Match',
      matched_skills: JSON.stringify(['JavaScript', 'React', 'Node.js', 'SQL']),
      missing_skills: JSON.stringify(['AWS'])
    });

    // Add Questions
    await CandidateQuestion.create({
      candidate_id: candidate.id,
      question: 'Explain your experience with microservices architecture.'
    });
  }

  console.log('✅ Seeding complete!');
  process.exit();
};

seedData();
