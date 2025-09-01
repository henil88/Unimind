const mammoth = require("mammoth");
const xlsx = require("xlsx");

async function readDocs(filepath) {
  try {
    const res = await mammoth.convertToHtml({ path: filepath });
    const html = res.value;
    console.log(html);
    const base64 = Buffer.from(html, "utf-8").toString("base64");

    return {
      html,
      base64,
      msg: res.messages,
    };
  } catch (error) {
    console.error("we got some error to readDocs", error);
    return {
      html: null,
      base64: null,
      msg: [],
    };
  }
}

async function readExcel(filepath) {
  try {
    const workbook = xlsx.readFile(filepath);
    const sheetNames = workbook.SheetNames;

    let text = "";
    sheetNames.forEach((sheet) => {
      const sheetData = xlsx.utils.sheet_to_csv(workbook.Sheets[sheet]);
      text += `\n--- Sheet: ${sheet} ---\n${sheetData}`;
    });

    const base64 = Buffer.from(text, "utf-8").toString("base64");
    return { text, base64 };
  } catch (err) {
    console.error("Error reading Excel:", err);
    return { text: null, base64: null };
  }
}
module.exports = { readDocs, readExcel };
