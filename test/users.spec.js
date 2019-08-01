/* global it, describe */
import supertest from 'supertest'
import chai from 'chai'
import server from '../app/server'

const { expect } = chai;
const request = supertest.agent(server);

describe('Routing /users', () => {
  describe('#User Service', () => {
    let data;
    let user;
    it('login', (done) => {
      request.post('/api/auth')
        .send({ username: 'wowit', pwd: '5f4dcc3b5aa765d61d8327deb882cf99', channel: 'app' })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.statusCode).to.eql(200);
            data = res.body.data;
            done();
          }
        });
    });

    it('get user id', (done) => {
      request.get('/api/users/' + data.user._id)
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.statusCode).to.eql(200);
            done();
          }
        });
    });

    it('get users', (done) => {
      request.get('/api/users')
        .set('x-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.statusCode).to.eql(200);
            done();
          }
        });
    });

    it('add user duplicate', (done) => {
      request.post('/api/users')
        .set('x-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .send({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          password: '5f4dcc3b5aa765d61d8327deb882cf99',
          status: data.user.user,
          username: data.user.username,
          role: data.user.role
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.statusCode).to.eql(409);
            done();
          }
        });
    });

    it('add user', (done) => {
      request.post('/api/users')
        .set('x-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .send({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          password: '5f4dcc3b5aa765d61d8327deb882cf99',
          status: data.user.user,
          username: 'mocha',
          role: data.user.role
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.statusCode).to.eql(200);
            user = res.body.data;
            done();
          }
        });
    });

    it('update user', (done) => {
      request.put('/api/users/' + user._id)
        .set('x-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .send({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          status: data.user.user,
          username: 'mocha',
          role: data.user.role
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.statusCode).to.eql(200);
            user = res.body.data;
            done();
          }
        });
    });

    it('remove user', (done) => {
      request.del('/api/users/' + user._id)
        .set('x-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.statusCode).to.eql(200);
            user = res.body.data;
            done();
          }
        });
    });

    it('logout', (done) => {
      request.get('/api/auth/logout')
        .set('x-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.statusCode).to.eql(200);
            done();
          }
        });
    });

    it('get user invalid', (done) => {
      request.get('/api/users/' + data.user._id)
        .set('x-access-token', data.accessToken)
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.statusCode).to.eql(401);
            done();
          }
        });
    });
  });
});
