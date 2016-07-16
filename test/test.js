//var request = require("request");
var request = require('supertest');
var express = require('express');
var app = require('../app');
var should = require('should');
//var app = express();

//token is chnging time to time .so this varible should change when testing.generate new token using /api/authnticate
var user_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJhZG1pbiI6ZmFsc2UsInBhc3N3b3JkIjoic2FjMTIzNCIsIm5hbWUiOiJzYWNzYW5kIiwiX2lkIjoiNTc3MzYxYTEzODNkNmY4MzE1OTI4ZjhiIn0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDY3MzA1MTI1LCJleHAiOjE0NjczMTk1MjV9.iVsSDiobddz1qnIEtDejQgFejX1AiT0pI81FLbNXe3w"


describe('GET /api/users', function() {
    it('respond with json', function(done) {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});


describe('GET /api/recipe without token', function() {
    it('respond with json', function(done) {
        request(app)
            .get('/api/recipe')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
            .end(function(err, res) {
                if (err) throw(err);
                res.status.should.equal(403);
                done();
            });
    });
});

describe('GET /api/recipe with token', function() {
    it('respond with json', function(done) {
        request(app)
            .get('/api/recipe')
            .set('Accept', 'application/json')
            .send({
                token: user_token
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw(err);
                res.status.should.equal(200);
                done();
            });
    });
});

describe('GET /api/comments without token', function() {
    it('respond with json', function(done) {
        request(app)
            .get('/api/comments')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
            .end(function(err, res) {
                if (err) throw(err);
                res.status.should.equal(403);
                done();
            });
    });
});



describe('GET /api/ingredients without token', function() {
    it('respond with json', function(done) {
        request(app)
            .get('/api/ingredients')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403)
            .end(function(err, res) {
                  if (err) throw(err);
                res.status.should.equal(403);
                done();
            });
    });
});

describe('Post /api/users/  adding new user without password', function() {
    it('respond with json', function(done) {
        request(app)
            .post('/api/users')
            .send({
                name: "jhon"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) throw(err);
                res.status.should.equal(400);
                done();
            });
    });
});

describe('Post /api/users/  adding new user with all ', function() {
    it('respond with json', function(done) {
        request(app)
            .post('/api/users')
            .send({
                name: "jhon",
                password: "SAC1234"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) throw(err);
                res.status.should.equal(200);
                done();
            });
    });
});

describe('Post /api/authenticate/  authentication get a token test with wrong password', function() {
    it('respond with json', function(done) {
        request(app)
            .post('/api/authenticate')
            .send({
                name: "jhonssssn",
                password: "jhonsss"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw(err);
                res.status.should.equal(200);
                res.body.success.should.equal(false);
                done();
            });
    });
});

describe('Post /api/authenticate/  authentication get a token test with wrong password', function() {
    it('respond with json', function(done) {
        request(app)
            .post('/api/authenticate')
            .send({
                name: "jhonssssn",
                password: "jhonsss"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                  if (err) throw(err);
                res.status.should.equal(200);
                res.body.success.should.equal(false);
                done();
            });
    });
});

describe('GET /api/recipe all as csv format', function() {
    it('respond with csv ', function(done) {
        request(app)
            .get('/api/recipe/')
            .send({
               tag:"csv",
               token:user_token

            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /csv/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw(err);
                res.status.should.equal(200);
                done();
            });
    });
});

describe('GET /api/recipe all ', function() {
    it('respond with ', function(done) {
        request(app)
            .get('/api/recipe/')
            .send({

               token:user_token

            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw(err);
                res.status.should.equal(200);
                done();
            });
    });
});
