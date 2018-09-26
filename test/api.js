var expect  = require("chai").expect;
var chai = require("chai")
var request = require("request");
var chaiHttp = require("chai-http");

chai.use(chaiHttp);


describe("Tests #1", function() {
    describe("Test de vida de la API", function() {
      var url = "http://localhost:8080/";
      it("Retorna status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
      });
    });
});

describe("Tests #2", function() {
    describe("Test de autorizacion", function() {
        var url = "http://localhost:8080/api";
        it("Retorna status 403 ", function(done) {
            chai.request(url)
                .post("/getMessages")
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'})
                .end(function(error, response, body) {
                    if (error) {
                        done(error);
                    } else {
                        expect(response.statusCode).to.equal(403);
                        done();
                }
            });
        });
    });
});