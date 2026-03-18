const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const candidateService = require('../services/candidateService');

const exportCSV = async (req, res) => {
  try {
    const candidates = await candidateService.getAllCandidates();
    const fields = ['name', 'title', 'email', 'phone', 'location', 'experience', 'education', 'score', 'status'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(candidates);

    res.header('Content-Type', 'text/csv');
    res.attachment('candidates_report.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Export CSV Error:', error);
    res.status(500).json({ success: false, message: 'Failed to export CSV' });
  }
};

const exportPDF = async (req, res) => {
  try {
    const candidates = await candidateService.getAllCandidates();
    const doc = new PDFDocument();

    res.header('Content-Type', 'application/pdf');
    res.attachment('candidates_report.pdf');
    doc.pipe(res);

    doc.fontSize(20).text('ResumeAI Candidate Report', { align: 'center' });
    doc.moveDown();

    candidates.forEach((c, index) => {
      doc.fontSize(14).text(`${index + 1}. ${c.name}`, { underline: true });
      doc.fontSize(10).text(`Title: ${c.title || 'N/A'}`);
      doc.text(`Experience: ${c.experience || 'N/A'}`);
      doc.text(`Skills: ${c.Skills.map(s => s.name).join(', ')}`);
      doc.text(`Match Score: ${c.score}%`);
      doc.text(`Status: ${c.status}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error('Export PDF Error:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Failed to export PDF' });
    }
  }
};

module.exports = {
  exportCSV,
  exportPDF
};
