// test uses mocha and chai frameworks
let expect = require('chai').expect;
// http request package
let request = require('request');
require('dotenv').config();
const GL_ACCESS_TOKEN = process.env.GL_ACCESS_TOKEN;

describe('Status and search', function() {
    describe ('github search page', function() {
        it('status', function(done){
            let name = {name: "ryan"}
            request('http://localhost:8080/github/search',
                {method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(name)
                },
                function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
            });
        });
        // checks that the reponse body returns the correct amount
        it('content', function(done) {
            let name = {name: "ryan"}
            request('http://localhost:8080/github/search',
                {method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(name)
                },
                    function(error, response, body) {
                expect(JSON.parse(body).items[0]).to.have.property('login',"BracketCove");
                done();
            });
        });
});
describe ('gitlab search page', function() {
    it('status', function(done){
        let name = {name: "ryan"}
        request('http://localhost:8080/gitlab/search',
            {method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": GL_ACCESS_TOKEN
            },
            body: JSON.stringify(name)
            },
            function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
        });
    });
    // checks that the reponse body returns the correct amount
    it('content', function(done) {
        let name = {name: "ryan"}
        request('http://localhost:8080/gitlab/search',
            {method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": GL_ACCESS_TOKEN
                },
            body: JSON.stringify(name)
            },
                function(error, response, body) {
            expect(JSON.parse(body)[0]).to.have.property('username',"ryan.c.king");
            done();
        });
    });
});
});