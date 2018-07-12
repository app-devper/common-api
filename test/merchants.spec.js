let request = require('superagent');
let expect = require('expect.js');

import config from '../app/config/config';

let apiEndpoint = config.app.apiEndpoint;

describe('Routing /merchant', function () {
  describe('#Merchant Service', function () {
    let data;
    let merchant;
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

    it('get merchant', function (done) {
      this.timeout(5000);
      request.get(apiEndpoint + '/merchant')
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

    it('add merchant', function (done) {
      this.timeout(5000);
      request.post(apiEndpoint + '/merchant')
        .set('dc-access-token', data.accessToken)
        .set('dc-user-id', data.user._id)
        .send({
          merchantName: "Yayoi",
          merchantType: "Food",
          merchantAddress: "",
          contactNumber: "",
          password: "5f4dcc3b5aa765d61d8327deb882cf99",
          status: "OPEN"
        })
        .end(function (err, res) {
          if (err) done(err);
          else {
            expect(res).to.exist;
            expect(res.status).to.eql(200);
            merchant = res.body.data;
            console.log('Add Data', merchant);
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

  });
});
