var should = require('should');
var request = require('supertest');
var server = require('../../../app');

process.env.A127_ENV = 'test';

describe('controllers', function() {

  describe('ping', function() {

    describe('GET /ping', function() {

      it('should pass invariably', function() {
         ('test').should.eql('test');
      })
      
      it('should return a standard string', function(done) {
        request(server)
          .get('/v1/ping')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            console.log(res.body);
            res.body.should.eql('Hello, stranger!');
            done();
          });
      });

      it('should accept a name parameter', function(done) {
        request(server)
          .get('/ping')
          .query({ name: 'Scott'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.eql('Hello, Scott!');
            done();
          });
      });

    });

  });

});
