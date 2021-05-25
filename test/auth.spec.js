/* global it */
import supertest from 'supertest'
import chai from 'chai'
import container from '../app/Container';
import { describe } from "mocha";
import { auth, general } from "../app/presentation/core/error/MessageProperties";

const server = container.resolve('server');
const { expect } = chai;
const request = supertest.agent(server.express);

describe('#Auth Service', () => {
  let data;
  let action;

  it('login fail no body', (done) => {
    request.post('/api/auth')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
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
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
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
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
          done();
        }
      });
  });

  it('login fail no pwd', (done) => {
    request.post('/api/auth')
      .send({ username: 'test' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
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
          expect(res.statusCode).to.eql(auth.invalidData.httpCode);
          expect(res.body.resCode).to.eql(auth.invalidData.resCode);
          done();
        }
      });
  });

  it('login fail password 1', (done) => {
    request.post('/api/auth')
      .send({ username: 'wowit', pwd: '5f4dcc3b5aa765d61d8327deb882cf9' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.invalidData.httpCode);
          expect(res.body.resCode).to.eql(auth.invalidData.resCode);
          done();
        }
      });
  });

  it('login fail password 2', (done) => {
    request.post('/api/auth')
      .send({ username: 'wowit', pwd: '5f4dcc3b5aa765d61d8327deb882cf9' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.invalidData.httpCode);
          expect(res.body.resCode).to.eql(auth.invalidData.resCode);
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
          data = res.body;
          done();
        }
      });
  });

  it('verify-password fail header', (done) => {
    request.post('/api/auth/verify-password')
      .send({ password: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  });

  it('verify-password fail invalid header', (done) => {
    request.post('/api/auth/verify-password')
      .set('Authorization', 'Bearer 123')
      .send({ password: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.unAuthorized.httpCode);
          expect(res.body.resCode).to.eql(auth.unAuthorized.resCode);
          done();
        }
      });
  });

  it('verify-password fail no password', (done) => {
    request.post('/api/auth/verify-password')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
          done();
        }
      });
  })

  it('verify-password invalid password', (done) => {
    request.post('/api/auth/verify-password')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .send({ password: '5f4dcc3b5aa765d61d8327deb882cf9' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.invalidData.httpCode);
          expect(res.body.resCode).to.eql(auth.invalidData.resCode);
          done();
        }
      });
  });

  it('verify-password', (done) => {
    request.post('/api/auth/verify-password')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .send({ password: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          action = res.body
          done();
        }
      });
  });

  it('set-password fail header', (done) => {
    request.post('/api/auth/set-password')
      .send({ password: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  });

  it('set-password fail invalid header', (done) => {
    request.post('/api/auth/set-password')
      .set('x-action-token', "1233")
      .send({ password: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.unAuthorized.httpCode);
          expect(res.body.resCode).to.eql(auth.unAuthorized.resCode);
          done();
        }
      });
  });

  it('set-password fail no password', (done) => {
    request.post('/api/auth/set-password')
      .set('x-action-token', action.actionToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
          done();
        }
      });
  });

  it('set-password', (done) => {
    request.post('/api/auth/set-password')
      .set('x-action-token', action.actionToken)
      .send({ password: '5f4dcc3b5aa765d61d8327deb882cf99' })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(201);
          done();
        }
      });
  });

  it('logout jwt fail header', (done) => {
    request.get('/api/auth/logout')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  });

  it('logout jwt fail invalid header', (done) => {
    request.get('/api/auth/logout')
      .set('Authorization', 'Bearer 1234')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.unAuthorized.httpCode);
          expect(res.body.resCode).to.eql(auth.unAuthorized.resCode);
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
