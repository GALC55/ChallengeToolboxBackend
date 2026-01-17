const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");

chai.use(chaiHttp);
const { expect } = chai;

describe("GET /files/data", () => {
  it("should return formatted files data", (done) => {
    chai
      .request(app)
      .get("/files/data")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");

        if (res.body.length > 0) {
          expect(res.body[0]).to.have.property("file");
          expect(res.body[0]).to.have.property("lines");
        }

        done();
      });
  });
});
