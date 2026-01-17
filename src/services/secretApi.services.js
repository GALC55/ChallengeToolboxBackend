const https = require("https");

const BASE_URL = "https://echo-serv.tbxnet.com/v1/secret";
const BEARER = process.env.BEARER || "";
const AUTH_HEADER = {
  Authorization: `Bearer ${BEARER}`,
};

function request(path) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: AUTH_HEADER,
    };

    https
      .get(`${BASE_URL}${path}`, options, (res) => {
        let data = "";

        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            return reject(new Error("Request failed"));
          }
          resolve(data);
        });
      })
      .on("error", reject);
  });
}

async function getFiles() {
  const response = await request("/files");
  return JSON.parse(response).files;
}

async function getFileContent(file) {
  return request(`/file/${file}`);
}

module.exports = {
  getFiles,
  getFileContent,
};
