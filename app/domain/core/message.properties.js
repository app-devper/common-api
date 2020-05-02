export const general = {
  error: {
    en: 'Internal Server Error.',
    th: 'ขออภัย ระบบไม่สามารถให้บริการได้ในขณะนี้',
    httpCode: 500,
    resCode: 'CM-500-000'
  },
  invalidData: {
    en: 'Invalid data.',
    th: 'ข้อมูลไม่ถูกต้อง',
    httpCode: 409,
    resCode: 'CM-409-001'
  },
  serviceNotFound: {
    en: 'Service Missing / Not found.',
    th: 'ไม่พบบริการที่คุณร้องขอ',
    httpCode: 404,
    resCode: 'CM-404-002'
  },
  dataNotFound: {
    en: 'Data not found.',
    th: 'ไม่พบข้อมูล',
    httpCode: 409,
    resCode: 'CM-409-003'
  },
  methodNotAllowed: {
    en: 'Method not allowed.',
    th: 'วิธีการไม่ได้รับอนุญาต',
    httpCode: 405,
    resCode: 'CM-405-004'
  },
  duplicateData: {
    en: 'Data is duplicate.',
    th: 'ข้อมูลของท่านมีการเข้าใช้งานแล้ว',
    httpCode: 401,
    resCode: 'CM-401-005'
  },
};

export const authentication = {
  unAuthorized: {
    en: 'Unauthorized.',
    th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้',
    httpCode: 401,
    resCode: 'CM-401-100'
  },
  forbidden: {
    en: 'Forbidden. Please contact admin.',
    th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้ กรุณาติดต่อ ผู้ดูแลระบบ',
    httpCode: 403,
    resCode: 'CM-403-101'
  },
  tokenExpired: {
    en: 'Your session has expired you need to login again.',
    th: 'Username ของท่านหมดอายุการใช้งาน กรุณาล็อคอินใหม่',
    httpCode: 401,
    resCode: 'CM-401-102'
  },
  tokenInvalid: {
    en: 'Your session has invalid you need to login again.',
    th: 'Username ของท่านไม่พบการใช้งาน กรุณาล็อคอินใหม่',
    httpCode: 401,
    resCode: 'CM-401-103'
  },
  duplicateLogin: {
    en: 'Your current session is duplicate.',
    th: 'Username ของท่านมีการเข้าใช้งานแล้ว กรุณาตรวจสอบ',
    httpCode: 401,
    resCode: 'CM-401-104'
  },
  tooManyInvalidPass: {
    en: 'Too max invalid attempts. Your account has been locked.',
    th: 'Password ของท่านไม่ถูกต้อง เกินจำนวนครั้งที่กำหนด',
    httpCode: 401,
    resCode: 'CM-401-105'
  },
  incorrectUserPass: {
    en: 'Incorrect username or password. Please try again.',
    th: 'Username / Password ของท่านไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง',
    httpCode: 401,
    resCode: 'CM-401-106'
  },
  missingAuthorization: {
    en: 'Missing Authorization Header',
    th: 'การอนุมัติที่ส่วนหัวขาดหายไป',
    httpCode: 401,
    resCode: 'CM-401-107'
  },
  tooManyInvalidCode: {
    en: 'Too max invalid code.',
    th: 'รหัสของท่านไม่ถูกต้อง เกินจำนวนครั้งที่กำหนด',
    httpCode: 401,
    resCode: 'CM-401-108'
  },
  incorrectCode: {
    en: 'Incorrect code. Please try again.',
    th: 'รหัสของท่านไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง',
    httpCode: 401,
    resCode: 'CM-401-109'
  },
  activeCode: {
    en: 'Ref code is active',
    th: 'Ref code is active',
    httpCode: 401,
    resCode: 'CM-401-110'
  },
  codeExpired: {
    en: 'Code expired',
    th: 'Code expired',
    httpCode: 401,
    resCode: 'CM-401-111'
  },
};
