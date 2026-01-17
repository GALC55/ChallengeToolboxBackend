const { getFiles, getFileContent } = require("../services/secretApi.services");
const parseCSV = require("../utils/csvParser");

async function getFilesData(req, res) {
  try {
    const { filename } = req.query;
    const files = await getFiles();
    const response = [];

    for (const file of files) {
      try {
        const content = await getFileContent(file);
        const lines = parseCSV(content);

        if (lines.length > 0) {
          if (filename && file !== filename) {
            continue;
          }
          response.push({
            file,
            lines,
          });
        }
      } catch (err) {
        // Se ignora si ocurre un error al obtener o parsear el archivo
      }
    }

    if (response.length === 0 && filename) {
      return res
        .status(404)
        .json({ error: "File not found or contains no valid data" });
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

//solo se obtiene la lista de archivos tal cual los regresa el API
async function getFilesList(req, res) {
  try {
    const files = await getFiles();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getFilesData,
  getFilesList,
};
