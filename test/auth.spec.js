/* global it, describe */
import supertest from 'supertest'
import chai from 'chai'
import container from '../app/container';
const server = container.resolve('server');
const { expect } = chai;
const request = supertest.agent(server.express);

describe('#Auth Service', () => {
  let data;

  it('login fail no body', (done) => {
    request.post('/api/auth').end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(409);
          done();
        }
      });
  });

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
  });

  it('login fail no username', (done) => {
    request.post('/api/auth')
      .send({ pwd: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(409);
          done();
        }
      });
  });

  it('login fail no pwd', (done) => {
    request.post('/api/auth')
      .send({ username: 'test'})
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(409);
          done();
        }
      });
  });

  it('login fail username', (done) => {
    request.post('/api/auth')
      .send({ username: 'test', pwd: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          done();
        }
      });
  });

  it('login fail password', (done) => {
    request.post('/api/auth')
      .send({ username: 'wowit', pwd: '5f4dcc3b5aa765d61d8327deb882cf9' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          done();
        }
      });
  });

  it('login success', (done) => {
    request.post('/api/auth')
      .send({ username: 'wowit', pwd: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          data = res.body.data;
          done();
        }
      });
  });

  it('logout jwt fail not access token', (done) => {
    request.get('/api/auth/logout')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          done();
        }
      });
  });

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
  });

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
  });
});
