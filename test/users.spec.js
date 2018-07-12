let request = require('superagent');
let expect = require('expect.js');

import config from '../app/config/config';

let apiEndpoint = config.app.apiEndpoint;

describe('Routing /user', function () {
  describe('#User Service', function () {
    let data;
    let user;
    it('login', function (done) {
      this.timeout(5000);
      request.post(apiEndpoint + '/authen')
        .send({username: 'wowit', pwd: '5f4dcc3b5aa765d61d8327deb882cf99', channel: "app"})
        .end(function (err, res) {
          if (err) done(err);
          else {
            expect(res).to.exist;
            expect(res.status).to.eql(200);
            data = res.body.data;
            console.log('Login Data', data);
            done();
          }
        });
    });

    it('get user id', function (done) {
      this.timeout(5000);
      request.get(apiEndpoint + '/user/' + data.user._id)
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .end(function (err, res) {
          if (err) done(err);
          else {
            expect(res).to.exist;
            expect(res.status).to.eql(200);
            done();
          }
        });
    });

    it('get users', function (done) {
      this.timeout(5000);
      request.get(apiEndpoint + '/user')
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .end(function (err, res) {
          if (err) done(err);
          else {
            expect(res).to.exist;
            expect(res.status).to.eql(200);
            done();
          }
        });
    });

    it('add user duplicate', function (done) {
      this.timeout(5000);
      request.post(apiEndpoint + '/user')
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .send({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          password: "5f4dcc3b5aa765d61d8327deb882cf99",
          status: data.user.status,
          username: data.user.username,
          role: data.user.role
        })
        .end(function (err, res) {
          expect(err).to.exist;
          expect(err.status).to.eql(401);
          expect(res.body.resCode).to.eql('CM4010101');
          done();
        });
    });

    it('add user', function (done) {
      this.timeout(5000);
      request.post(apiEndpoint + '/user')
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .send({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          password: "5f4dcc3b5aa765d61d8327deb882cf99",
          status: data.user.status,
          username: "mocha",
          role: data.user.role
        })
        .end(function (err, res) {
          if (err) done(err);
          else {
            expect(res).to.exist;
            expect(res.status).to.eql(200);
            user = res.body.data;
            console.log('Add Data', user);
            done();
          }
        });
    });

    it('update user', function (done) {
      this.timeout(5000);
      request.put(apiEndpoint + '/user/' + user._id)
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .send({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          status: data.user.status,
          username: "mocha",
          role: data.user.role
        })
        .end(function (err, res) {
          if (err) done(err);
          else {
            expect(res).to.exist;
            expect(res.status).to.eql(200);
            user = res.body.data;
            console.log('Update Data', user);
            done();
          }
        });
    });

    it('remove user', function (done) {
      this.timeout(5000);
      request.del(apiEndpoint + '/user/' + user._id)
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .end(function (err, res) {
          if (err) done(err);
          else {
            expect(res).to.exist;
            expect(res.status).to.eql(200);
            user = res.body.data;
            done();
          }
        });
    });

    it('logout', function (done) {
      this.timeout(5000);
      request.get(apiEndpoint + '/authen/logout')
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .end(function (err, res) {
          if (err) done(err);
          else {
            expect(res).to.exist;
            expect(res.status).to.eql(200);
            expect(res.body.resCode).to.eql('CM2000000');
            done();
          }
        });
    });

    it('get user invalid', function (done) {
      this.timeout(5000);
      request.get(apiEndpoint + '/user/' + data.user._id)
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .end(function (err, res) {
          expect(err).to.exist;
          expect(err.status).to.eql(401);
          expect(res.body.resCode).to.eql('CM4010007');
          done();
        });
    });

  });
});
