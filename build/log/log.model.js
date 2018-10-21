'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogModel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LogModel = exports.LogModel = function () {
  function LogModel() {
    _classCallCheck(this, LogModel);

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
    this.RES_TIME = '';
  }

  _createClass(LogModel, [{
    key: 'setRequest',
    value: function setRequest(req) {
      this.USERNAME = req.get('dc-user-name') ? req.get('dc-user-name') : '';
      this.REQ_URI = req.originalUrl;
      this.REQ_ID = req.reqId;
      this.TIMESTAMP = req.reqDate;
      this.IP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      this.REQ_METHOD = req.method;
      this.REQ_BODY = _lodash2.default.isEmpty(req.body) ? '' : JSON.stringify(req.body);
      this.REQ_HEADERS = JSON.stringify(req.headers);
      this.REQ_PARAMS = _lodash2.default.isEmpty(req.params) ? '' : JSON.stringify(req.params);
    }
  }, {
    key: 'setResponse',
    value: function setResponse(res) {
      this.RES_BODY = JSON.stringify(res);
      this.RES_STATUS = res.httpCode;
      this.RES_TIME = new Date() - this.TIMESTAMP;
    }
  }, {
    key: 'getAccessLog',
    value: function getAccessLog() {
      return (0, _moment2.default)(this.TIMESTAMP).format('YYYY-MM-DD HH:mm:ss.SSS') + '|' + this.USERNAME + '|' + this.THREAD + '|' + this.IP + '|' + this.REQ_ID + '|' + this.REQ_METHOD + '|' + this.REQ_URI + '|' + this.REQ_HEADERS + '|' + this.REQ_PARAMS + '|' + this.REQ_BODY;
    }
  }, {
    key: 'getInfoLog',
    value: function getInfoLog() {
      return (0, _moment2.default)(this.TIMESTAMP).format('YYYY-MM-DD HH:mm:ss.SSS') + '|' + this.USERNAME + '|' + this.THREAD + '|' + this.IP + '|' + this.REQ_ID + '|' + this.REQ_METHOD + '|' + this.REQ_URI + '|' + this.REQ_HEADERS + '|' + this.REQ_PARAMS + '|' + this.REQ_BODY + '|' + this.RES_STATUS + '|' + this.RES_BODY + '|' + this.RES_TIME;
    }
  }]);

  return LogModel;
}();
//# sourceMappingURL=log.model.js.map