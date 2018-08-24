// main response

export class MainResponse {
  constructor (_resCode, _resMessage, _devMessage, _data, _httpCode) {
    this.resCode = _resCode;
    this.resMessage = _resMessage;
    this.devMessage = _devMessage;
    this.data = _data;
    this.httpCode = _httpCode;
    this.serverTime = new Date()
  }
}
