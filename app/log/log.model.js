import moment from 'moment'
import _ from 'lodash'

export class LogModel {
  constructor () {
    this.TIMESTAMP = new Date();
    this.USERNAME = '';
    this.THREAD = process.pid;
    this.IP = '';
    this.REQ_ID = '';
    this.REQ_METHOD = '';
    this.REQ_URI = '';
    this.REQ_HEADERS = '';
    this.REQ_PARAMS = '';
    this.REQ_BODY = '';
    this.RES_STATUS = '';
    this.RES_BODY = '';
    this.RES_TIME = ''
  }

  setRequest (req) {
    this.USERNAME = req.get('dc-user-name') ? req.get('dc-user-name') : '';
    this.REQ_URI = req.originalUrl;
    this.REQ_ID = req.reqId;
    this.TIMESTAMP = req.reqDate;
    this.IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    this.REQ_METHOD = req.method;
    this.REQ_BODY = _.isEmpty(req.body) ? '' : JSON.stringify(req.body);
    this.REQ_HEADERS = JSON.stringify(req.headers);
    this.REQ_PARAMS = _.isEmpty(req.params) ? '' : JSON.stringify(req.params)
  }

  setResponse (res) {
    this.RES_BODY = JSON.stringify(res);
    this.RES_STATUS = res.httpCode;
    this.RES_TIME = new Date() - this.TIMESTAMP
  }

  getAccessLog () {
    return moment(this.TIMESTAMP).format('YYYY-MM-DD HH:mm:ss.SSS') + '|' +
      this.USERNAME + '|' +
      this.THREAD + '|' +
      this.IP + '|' +
      this.REQ_ID + '|' +
      this.REQ_METHOD + '|' +
      this.REQ_URI + '|' +
      this.REQ_HEADERS + '|' +
      this.REQ_PARAMS + '|' +
      this.REQ_BODY
  }

  getInfoLog () {
    return moment(this.TIMESTAMP).format('YYYY-MM-DD HH:mm:ss.SSS') + '|' +
      this.USERNAME + '|' +
      this.THREAD + '|' +
      this.IP + '|' +
      this.REQ_ID + '|' +
      this.REQ_METHOD + '|' +
      this.REQ_URI + '|' +
      this.REQ_HEADERS + '|' +
      this.REQ_PARAMS + '|' +
      this.REQ_BODY + '|' +
      this.RES_STATUS + '|' +
      this.RES_BODY + '|' +
      this.RES_TIME
  }
}
