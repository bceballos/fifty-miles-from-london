var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('funcs', function() {

    describe('GET /returnUsers', function() {

        it('Should accept /users and return 3 users', function(done) {

            request(server)
                .get('/returnUsers')
                .query({ url: 'https://bpdts-test-app.herokuapp.com/users'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);

                    //res.body.should.eql('Hello, Scott!');

                    done();
                });
            });

        it('Should accept /city/London/users but return nothing', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/city/London/users'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);

                //res.body.should.eql('Hello, Scott!');

                done();
            });
        });

        it('Should accept /user/1 but return nothing', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/user/1'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);

                //res.body.should.eql('Hello, Scott!');

                done();
            });
        });

        it('Should accept /user/999 but return an error', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/user/9999'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function(err, res) {
                should.exist(err);
                done();
            });
        });

        it('Should accept /instructions but return an error', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/city/London/users'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.exist(err);

                //res.body.should.eql('Hello, Scott!');

                done();
            });
        });

    });

  });

});
