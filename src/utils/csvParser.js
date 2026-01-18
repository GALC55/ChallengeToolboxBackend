function parseCSV(content) {
  const lines = content.split("\n");
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const [file, text, number, hex] = line.split(",");

    // Validar que todos los campos estén presentes
    if (!file || !text || !number || !hex) continue;

    // Validar que number sea numérico
    if (isNaN(Number(number))) continue;

    // Validar que hex sea un hexadecimal válido de 32 caracteres
    if (!/^[0-9a-fA-F]{32}$/.test(hex)) continue;

    result.push({
      text,
      number: Number(number),
      hex,
    });
  }

  return result;
}

module.exports = parseCSV;
