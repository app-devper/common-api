/* global it, describe */
import supertest from 'supertest'
import chai from 'chai'
import container from '../app/container';
import { describe } from "mocha";
import { auth, general } from "../app/domain/core/message.properties";

const server = container.resolve('server');
const { expect } = chai;
const request = supertest.agent(server.express);

describe('#OTP Service', () => {
  let data;
  let user;
  let refCode;
  let code;

  it('get channel username fail', (done) => {
    request.get('/api/otp/channel/daasd')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.dataNotFound.httpCode);
          expect(res.body.resCode).to.eql(general.dataNotFound.resCode);
          done();
        }
      });
  });

  it('get channel username', (done) => {
    request.get('/api/otp/channel/wowit')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          done();
        }
      });
  });

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

  it('get channel fail header', (done) => {
    request.get('/api/otp/channel')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.missingAuthorization.httpCode);
          expect(res.body.resCode).to.eql(auth.missingAuthorization.resCode);
          done();
        }
      });
  });

  it('get channel fail invalid header', (done) => {
    request.get('/api/otp/channel')
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

  it('get channel', (done) => {
    request.get('/api/otp/channel')
      .set('Authorization', 'Bearer ' + data.accessToken)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          user = res.body
          done();
        }
      });
  });

  it('verify-user fail userRefId', (done) => {
    request.post('/api/otp/verify-user')
      .send({
        channel: user.channels[0].channel
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
          done();
        }
      });
  });

  it('verify-user fail channel', (done) => {
    request.post('/api/otp/verify-user')
      .send({
        userRefId: user.userRefId
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
          done();
        }
      });
  });

  it('verify-user email', (done) => {
    request.post('/api/otp/verify-user')
      .send({
        userRefId: user.userRefId,
        channel: user.channels[0].channel
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          refCode = res.body
          done();
        }
      });
  });

  it('verify-user sms', (done) => {
    request.post('/api/otp/verify-user')
      .send({
        userRefId: user.userRefId,
        channel: user.channels[1].channel
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          refCode = res.body
          done();
        }
      });
  });

  it('get code fail empty', (done) => {
    request.get('/api/otp/code/1231')
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          expect(res.text).to.eql("");
          done();
        }
      });
  });

  it('get code', (done) => {
    request.get('/api/otp/code/' + refCode.refCode)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          code = res.text
          done();
        }
      });
  });

  it('verify-code fail code empty', (done) => {
    request.post('/api/otp/verify-code')
      .send({
        userRefId: user.userRefId,
        refCode: refCode.refCode,
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(general.invalidData.httpCode);
          expect(res.body.resCode).to.eql(general.invalidData.resCode);
          done();
        }
      });
  });

  it('verify-code fail code', (done) => {
    request.post('/api/otp/verify-code')
      .send({
        userRefId: user.userRefId,
        refCode: refCode.refCode,
        code: '123'
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.invalidCode.httpCode);
          expect(res.body.resCode).to.eql(auth.invalidCode.resCode);
          done();
        }
      });
  });

  it('verify-code', (done) => {
    request.post('/api/otp/verify-code')
      .send({
        userRefId: user.userRefId,
        refCode: refCode.refCode,
        code: code
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(200);
          done();
        }
      });
  });

  it('verify-code fail is active', (done) => {
    request.post('/api/otp/verify-code')
      .send({
        userRefId: user.userRefId,
        refCode: refCode.refCode,
        code: code
      })
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.statusCode).to.eql(auth.activeCode.httpCode);
          expect(res.body.resCode).to.eql(auth.activeCode.resCode);
          done();
        }
      });
  });

});
