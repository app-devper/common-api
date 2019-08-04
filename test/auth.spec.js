/* global it, describe */
import supertest from 'supertest'
import chai from 'chai'
import server from '../app/server'

const { expect } = chai;
const request = supertest.agent(server);

describe('#Auth Service', () => {
  let data;

  it('login fail no body', (done) => {
    request.post('/api/auth')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(409);
          done();
        }
      });
  }).timeout(10000);

  it('login fail empty body', (done) => {
    request.post('/api/auth')
      .send({})
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(409);
          done();
        }
      });
  }).timeout(10000);

  it('login fail no username', (done) => {
    request.post('/api/auth')
      .send({ pwd: '5f4dcc3b5aa765d61d8327deb882cf99', channel: 'app' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(409);
          done();
        }
      });
  }).timeout(10000);

  it('login fail no pwd', (done) => {
    request.post('/api/auth')
      .send({ username: 'test', channel: 'app' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(409);
          done();
        }
      });
  }).timeout(10000);

  it('login fail no channel', (done) => {
    request.post('/api/auth')
      .send({ username: 'test', pwd: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(409);
          done();
        }
      });
  }).timeout(10000);

  it('login fail username', (done) => {
    request.post('/api/auth')
      .send({ username: 'test', pwd: '5f4dcc3b5aa765d61d8327deb882cf99', channel: 'app' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          done();
        }
      });
  }).timeout(10000);

  it('login fail password', (done) => {
    request.post('/api/auth')
      .send({ username: 'wowit', pwd: '5f4dcc3b5aa765d61d8327deb882cf9', channel: 'app' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          done();
        }
      });
  }).timeout(10000);

  it('login success', (done) => {
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
  }).timeout(10000);

  it('logout fail not access token', (done) => {
    request.get('/api/auth/logout')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          done();
        }
      });
  }).timeout(10000);

  it('logout fail invalid access token', (done) => {
    request.get('/api/auth/logout')
      .set('x-access-token', '1234')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          done();
        }
      });
  }).timeout(10000);

  it('logout success', (done) => {
    request.get('/api/auth/logout')
      .set('x-access-token', data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          done();
        }
      });
  }).timeout(10000);

  it('login jwt success ', (done) => {
    request.post('/api/auth')
      .send({ username: 'wowit', pwd: '5f4dcc3b5aa765d61d8327deb882cf99', channel: 'jwt' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          data = res.body.data;
          done();
        }
      });
  }).timeout(10000);

  it('logout jwt fail not access token', (done) => {
    request.get('/api/auth/logout')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          done();
        }
      });
  }).timeout(10000);

  it('logout jwt fail invalid access token', (done) => {
    request.get('/api/auth/logout')
      .set('Authorization', 'Bearer 1234')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          done();
        }
      });
  }).timeout(10000);

  it('logout jwt success', (done) => {
    request.get('/api/auth/logout')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          done();
        }
      });
  }).timeout(10000);
});
