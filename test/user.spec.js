/* global it, describe */
import supertest from 'supertest'
import chai from 'chai'
import container from '../app/Container';
import { describe } from "mocha";
import { auth, general } from "../app/core/MessageProperties";

const server = container.resolve('server');
const { expect } = chai;
const request = supertest.agent(server.express);

describe('#User Service', () => {
  let data;
  let user;

  it('login', (done) => {
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

  it('get profile fail header', (done) => {
    request.get('/api/user/info')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  });

  it('get profile fail invalid header', (done) => {
    request.get('/api/user/info')
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

  it('get profile', (done) => {
    request.get('/api/user/info')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          user = res.body;
          done();
        }
      });
  });

  it('update profile fail header', (done) => {
    request.put('/api/user/info')
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  })

  it('update profile fail invalid header', (done) => {
    request.put('/api/user/info')
      .set('Authorization', 'Bearer 12323')
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.unAuthorized.httpCode);
          expect(res.body.resCode).to.eql(auth.unAuthorized.resCode);
          done();
        }
      });
  })

  it('update profile', (done) => {
    request.put('/api/user/info')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          user = res.body;
          done();
        }
      });
  })

  it('get user fail header', (done) => {
    request.get('/api/user/' + user._id)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  });

  it('get user fail invalid header', (done) => {
    request.get('/api/user/' + user._id)
      .set('Authorization', 'Bearer 1231')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.unAuthorized.httpCode);
          expect(res.body.resCode).to.eql(auth.unAuthorized.resCode);
          done();
        }
      });
  });

  it('get user fail invalid id', (done) => {
    request.get('/api/user/1234')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
          done();
        }
      });
  });

  it('get user fail not found', (done) => {
    request.get('/api/user/5d58280a341d17002363192a')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.dataNotFound.httpCode);
          expect(res.body.resCode).to.eql(general.dataNotFound.resCode);
          done();
        }
      });
  });

  it('get user id', (done) => {
    request.get('/api/user/' + user._id)
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          done();
        }
      });
  });

  it('get users', (done) => {
    request.get('/api/user')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          done();
        }
      });
  });

  it('add user duplicate', (done) => {
    request.post('/api/user')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: '5f4dcc3b5aa765d61d8327deb882cf99',
        status: user.status,
        username: user.username,
        gender: user.gender,
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(401);
          expect(res.body.resCode).to.eql('CM-401-005');
          done();
        }
      });
  });

  it('remove user current fail', (done) => {
    request.del('/api/user/' + user._id)
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

  it('add user fail header', (done) => {
    request.post('/api/user')
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: '5f4dcc3b5aa765d61d8327deb882cf99',
        username: 'mocha',
        gender: user.gender,
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  })

  it('add user', (done) => {
    request.post('/api/user')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: '5f4dcc3b5aa765d61d8327deb882cf99',
        username: 'mocha',
        gender: 'MALE',
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          if (res.statusCode === 200) {
            expect(res.statusCode).to.eql(200);
            user = res.body;
          } else {
            expect(res.statusCode).to.eql(general.duplicateData.httpCode);
            expect(res.body.resCode).to.eql(general.duplicateData.resCode);
          }
          done();
        }
      });
  })

  it('update user fail header', (done) => {
    request.put('/api/user/' + user._id)
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  })

  it('update user fail invalid header', (done) => {
    request.put('/api/user/' + user._id)
      .set('Authorization', 'Bearer 12323')
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.unAuthorized.httpCode);
          expect(res.body.resCode).to.eql(auth.unAuthorized.resCode);
          done();
        }
      });
  })

  it('update user fail invalid id', (done) => {
    request.put('/api/user/123')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
          done();
        }
      });
  })

  it('update user', (done) => {
    request.put('/api/user/' + user._id)
      .set('Authorization', 'Bearer ' + data.accessToken)
      .send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          user = res.body;
          done();
        }
      });
  })

  it('remove user fail header', (done) => {
    request.del('/api/user/' + user._id)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  })

  it('remove user fail invalid id', (done) => {
    request.del('/api/user/1233')
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

  it('remove user', (done) => {
    request.del('/api/user/' + user._id)
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          user = res.body;
          done();
        }
      });
  })

  it('logout', (done) => {
    request.get('/api/auth/logout')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          done();
        }
      });
  })

});
