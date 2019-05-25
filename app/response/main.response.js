// main response

export class MainResponse {
  constructor (_resCode, _resMessage, _devMessage, _data, _status) {
    this.resCode = _resCode;
    this.resMessage = _resMessage;
    this.devMessage = _devMessage;
    this.data = _data;
    this.status = _status;
    this.serverTime = new Date()
  }
}
