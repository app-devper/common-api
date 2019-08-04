// main response

export class Response {
  constructor (_resCode, _resMessage, _devMessage, _status, _data) {
    this.resCode = _resCode;
    this.resMessage = _resMessage;
    this.devMessage = _devMessage;
    this.data = _data;
    this.status = _status;
    this.serverTime = new Date()
  }
}
