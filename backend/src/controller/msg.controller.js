const path = require("path");
const aiResponse = require("../service/ai.service");

async function handleUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const filePath = req.file.path;
    const files = req.file;
    const ext = path.extname(req.file.originalname).toLowerCase(); // includes the dot

    let prompt;

    // Decide prompt based on file type
    if (ext === ".xls" || ext === ".xlsx") {
      prompt = req.body.prompt || "Summarize this Excel file";
    } else if (ext === ".pdf") {
      prompt = req.body.prompt || "Summarize this PDF document";
    } else if (ext === ".doc" || ext === ".docx") {
      prompt = req.body.prompt || "Summarize this Word document";
    } else {
      prompt = req.body.prompt || "Summarize this document";
    }

    const aiRes = await aiResponse.docsReading({
      file: filePath,
      files,
      prompt,
    });

    res.status(200).json({
      message: "file data",
      aiRes,
    });
  } catch (err) {
    console.error("handleUpload error:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { handleUpload };
