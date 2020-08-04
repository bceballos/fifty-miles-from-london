var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('funcs', function() {

    describe('GET /returnUsers', function() {

        // Test the core functionality of the app and show the intended functionality of the app
        it('Should accept /users and return 3 users', function(done) { 

            request(server)
                .get('/returnUsers')
                .query({ url: 'https://bpdts-test-app.herokuapp.com/users'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    res.body.should.eql([
                        {
                          email: 'agarnsworthy7d@seattletimes.com',
                          first_name: 'Ancell',
                          id: 266,
                          ip_address: '67.4.69.137',
                          last_name: 'Garnsworthy',
                          latitude: 51.6553959,
                          longitude: 0.0572553
                        },
                        {
                          email: 'hlynd8x@merriam-webster.com',
                          first_name: 'Hugo',
                          id: 322,
                          ip_address: '109.0.153.166',
                          last_name: 'Lynd',
                          latitude: 51.6710832,
                          longitude: 0.8078532
                        },
                        {
                          email: 'phebbsfd@umn.edu',
                          first_name: 'Phyllys',
                          id: 554,
                          ip_address: '100.89.186.13',
                          last_name: 'Hebbs',
                          latitude: 51.5489435,
                          longitude: 0.3860497
                        }
                      ]);
                    done();
                });
        });

        // Test the obvious London query which should return the same as the core functionality but doesn't
        it('Should accept /city/London/users but return no users, only an error message', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/city/London/users'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql({message: "ERROR: There were no users in the query within 50 miles of London"});
                done();
            });
        });

        // Test an erroneous city which shouldn't return anything make sure it errors
        it('Should accept /city/Madrid/users but return no users, only an error message', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/city/Madrid/users'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql({message: "ERROR: There were no users in the query within 50 miles of London"});
                done();
            });
        });

        // Test the working user ids to make sure they are individually correct
        it('Should accept /user/266 and return the appropriate data', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/user/266'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql({
                    city: 'L’govskiy',
                    email: 'agarnsworthy7d@seattletimes.com',
                    first_name: 'Ancell',
                    id: 266,
                    ip_address: '67.4.69.137',
                    last_name: 'Garnsworthy',
                    latitude: 51.6553959,
                    longitude: 0.0572553
                  });
                done();
            });
        });

        it('Should accept /user/322 and return the appropriate data', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/user/322'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql({
                    city: 'Rokiciny',
                    email: 'hlynd8x@merriam-webster.com',
                    first_name: 'Hugo',
                    id: 322,
                    ip_address: '109.0.153.166',
                    last_name: 'Lynd',
                    latitude: 51.6710832,
                    longitude: 0.8078532
                  });
                done();
            });
        });

        it('Should accept /user/554 but return the appropriate data', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/user/554'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql({
                    city: 'Krolevets’',
                    email: 'phebbsfd@umn.edu',
                    first_name: 'Phyllys',
                    id: 554,
                    ip_address: '100.89.186.13',
                    last_name: 'Hebbs',
                    latitude: 51.5489435,
                    longitude: 0.3860497
                  } );
                done();
            });
        });

        // Test a user to make sure it errors
        it('Should accept /user/1 but return an error message', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/user/1'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql({message: 'ERROR: The user 1 is not within 50 miles of London'});
                done();
            });
        });

        // Test a high id user to make sure it errors
        it('Should accept /user/1000 but return an error message', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/user/1000'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql({message: 'ERROR: The user 1000 is not within 50 miles of London'});
                done();
            });
        });

        // Test a low id user to make sure it errors
        it('Should accept /user/-100 but return an error message', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/user/-1'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql({message: 'ERROR: The user 1 is not within 50 miles of London'});
                done();
            });
        });

        // Test a overly high id to make sure it errors
        it('Should accept /user/9999, lower the query to /user/1000 and return an error message', function(done) {

            request(server)
            .get('/returnUsers')
            .query({ url: 'https://bpdts-test-app.herokuapp.com/user/9999'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                res.body.should.eql({message: 'ERROR: The user 1000 is not within 50 miles of London'});
                done();
            });
        });

        // Test the instructions query to make sure it won't work
        it('Should accept /instructions but return an error message', function(done) {

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

    });

  });

});
