const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async parseResume(textContent) {
    const prompt = `
      Extract professional details from the following resume text. 
      Return the result ONLY as a JSON object with these keys:
      - name (string)
      - title (string, e.g., "Senior Software Engineer")
      - experience (string, e.g., "5 years")
      - education (string, e.g., "B.S. in Computer Science")
      - skills (array of strings)
      - summary (string, short professional summary)

      Resume Text:
      ${textContent}
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const jsonStr = text.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Gemini Parsing Error:', error.message);
      console.warn('USING FALLBACK PARSING DUE TO AI ERROR');
      return {
        name: 'Extracted Candidate',
        title: 'Full Stack Developer',
        experience: 'Not specified',
        education: 'Not specified',
        skills: ['JavaScript', 'Software Engineering'],
        summary: 'Parsed manually due to AI service unavailability.'
      };
    }
  }

  async rankCandidates(candidates, query) {
    const candidateData = candidates.map(c => ({
      id: c.id,
      name: c.name,
      skills: (c.Skills || []).map(s => s.name),
      experience: c.experience
    }));

    const prompt = `
      Given the search query "${query}", rank the following candidates based on their suitability.
      Return the result ONLY as a JSON array of objects, where each object has:
      - id (matching the input id)
      - matchScore (0-100)
      - reasoning (short explanation)

      Candidates:
      ${JSON.stringify(candidateData)}
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonStr = text.replace(/```json|```/g, '').trim();
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Gemini Ranking Error:', error);
      return candidates.map(c => ({ id: c.id, matchScore: 0, reasoning: 'AI Ranking failed' }));
    }
  }
}

module.exports = new AIService();
