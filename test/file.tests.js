// Cargar variables de entorno al inicio
require("dotenv").config();

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");

chai.use(chaiHttp);
const { expect } = chai;

describe("Verificación de Salud", () => {
  describe("GET /health", () => {
    it("debe retornar el estado de salud", (done) => {
      chai
        .request(app)
        .get("/health")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("status");
          expect(res.body.status).to.equal("ok");
          done();
        });
    });
  });
});

describe("Rutas de Archivos", () => {
  describe("GET /files/data", () => {
    it("debe retornar datos de archivos formateados", (done) => {
      chai
        .request(app)
        .get("/files/data")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");

          if (res.body.length > 0) {
            expect(res.body[0]).to.have.property("file");
            expect(res.body[0]).to.have.property("lines");
            expect(res.body[0].lines).to.be.an("array");

            // Validar estructura de cada línea
            if (res.body[0].lines.length > 0) {
              const line = res.body[0].lines[0];
              expect(line).to.have.property("text");
              expect(line).to.have.property("number");
              expect(line).to.have.property("hex");
              expect(line.number).to.be.a("number");
            }
          }

          done();
        });
    });

    it("debe filtrar por parámetro de nombre de archivo", (done) => {
      chai
        .request(app)
        .get("/files/data?filename=test.csv")
        .end((err, res) => {
          // Puede retornar 200 con datos o 404 si no existe
          if (res.status === 200) {
            expect(res.body).to.be.an("array");
            // Si hay resultados, todos deben coincidir con el filename
            res.body.forEach((item) => {
              expect(item.file).to.equal("test.csv");
            });
          } else {
            expect(res).to.have.status(404);
            expect(res.body).to.have.property("error");
          }
          done();
        });
    });

    it("debe manejar gracefully un nombre de archivo inválido", (done) => {
      chai
        .request(app)
        .get("/files/data?filename=nonexistent_file_xyz.csv")
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.include("not found");
          done();
        });
    });
  });

  describe("GET /files/list", () => {
    it("debe retornar una lista de archivos", (done) => {
      chai
        .request(app)
        .get("/files/list")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        });
    });

    it("debe retornar un array con elementos string", (done) => {
      chai
        .request(app)
        .get("/files/list")
        .end((err, res) => {
          expect(res).to.have.status(200);
          if (res.body.length > 0) {
            res.body.forEach((file) => {
              expect(file).to.be.a("string");
            });
          }
          done();
        });
    });
  });
});
