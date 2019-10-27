export const general = {
  error: {
    en: 'Internal Server Error.',
    th: 'ขออภัย ระบบไม่สามารถให้บริการได้ในขณะนี้',
    httpCode: 500,
    resCode: 'CM500000'
  },
  invalidData: {
    en: 'Invalid data.',
    th: 'ข้อมูลไม่ถูกต้อง',
    httpCode: 409,
    resCode: 'CM409001'
  },
  serviceNotFound: {
    en: 'Service Missing / Not found.',
    th: 'ไม่พบบริการที่คุณร้องขอ',
    httpCode: 404,
    resCode: 'CM404002'
  },
  dataNotFound: {
    en: 'Data not found.',
    th: 'ไม่พบข้อมูล',
    httpCode: 409,
    resCode: 'CM409003'
  },
  methodNotAllowed: {
    en: 'Method not allowed.',
    th: 'วิธีการไม่ได้รับอนุญาต',
    httpCode: 405,
    resCode: 'CM405004'
  }
};

export const authentication = {
  unAuthorized: {
    en: 'Unauthorized.',
    th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้',
    httpCode: 401,
    resCode: 'CM401100'
  },
  forbidden: {
    en: 'Forbidden. Please contact admin.',
    th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้ กรุณาติดต่อ ผู้ดูแลระบบ',
    httpCode: 403,
    resCode: 'CM403101'
  },
  tokenExpired: {
    en: 'Your session has expired you need to login again.',
    th: 'Username ของท่านหมดอายุการใช้งาน กรุณาล็อคอินใหม่',
    httpCode: 401,
    resCode: 'CM401102'
  },
  tokenInvalid: {
    en: 'Your session has invalid you need to login again.',
    th: 'Username ของท่านไม่พบการใช้งาน กรุณาล็อคอินใหม่',
    httpCode: 401,
    resCode: 'CM401103'
  },
  duplicateLogin: {
    en: 'Your current session is duplicate.',
    th: 'Username ของท่านมีการเข้าใช้งานแล้ว กรุณาตรวจสอบ',
    httpCode: 401,
    resCode: 'CM401104'
  },
  tooManyInvalidPass: {
    en: 'Too many invalid attempts. Your account has been temporarily locked, Please try again later.',
    th: 'Username / Password ของท่านไม่ถูกต้อง เกินจำนวนครั้งที่กำหนด กรุณารอสักครู่ เพื่อทำรายการใหม่อีกครั้ง',
    httpCode: 401,
    resCode: 'CM401105'
  },
  incorrectUserPass: {
    en: 'Incorrect username or password. Please try again.',
    th: 'Username / Password ของท่านไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง',
    httpCode: 401,
    resCode: 'CM401106'
  },
  missingAuthorization: {
    en: 'Missing Authorization Header',
    th: 'การอนุมัติที่ส่วนหัวขาดหายไป',
    httpCode: 401,
    resCode: 'CM401107'
  }
};
