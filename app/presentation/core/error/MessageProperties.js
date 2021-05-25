export const general = {
  internalError: {
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
  duplicateData: {
    en: 'Data is duplicate.',
    th: 'ข้อมูลของท่านมีการเข้าใช้งานแล้ว',
    httpCode: 401,
    resCode: 'CM-401-005'
  },
  missingAuthorization: {
    en: 'Missing Authorization Header',
    th: 'การอนุมัติที่ส่วนหัวขาดหายไป',
    httpCode: 401,
    resCode: 'CM-401-006'
  },
  forbidden: {
    en: 'Forbidden. Please contact admin.',
    th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบ กรุณาติดต่อ ผู้ดูแลระบบ',
    httpCode: 403,
    resCode: 'CM-403-007'
  },
  tokenInvalid: {
    en: 'Your session has invalid you need to login again.',
    th: 'ข้อมูลของท่านไม่ถูกต้อง กรุณาล็อคอินใหม่',
    httpCode: 401,
    resCode: 'CM-401-008'
  },
  actionTokenInvalid: {
    en: 'Your action token has invalid',
    th: 'ข้อมูลของท่านไม่ถูกต้อง',
    httpCode: 401,
    resCode: 'CM-401-014'
  },
};
