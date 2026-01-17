function parseCSV(content) {
  const lines = content.split("\n");
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [file, text, number, hex] = line.split(",");

    if (!file || !text || !number || !hex) continue;
    if (isNaN(Number(number))) continue;

    result.push({
      text,
      number: Number(number),
      hex,
    });
  }

  return result;
}

module.exports = parseCSV;
