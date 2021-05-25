export const auth = {
  internalError: {
    en: 'Internal Server Error.',
    th: 'ขออภัย ระบบไม่สามารถให้บริการได้ในขณะนี้',
    httpCode: 500,
    resCode: 'AU-500-000'
  },
  unAuthorized: {
    en: 'Unauthorized.',
    th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบ',
    httpCode: 401,
    resCode: 'AU-401-001'
  },
  maxInvalidPassword: {
    en: 'Too max invalid attempts. Your account has been locked.',
    th: 'Password ของท่านไม่ถูกต้อง เกินจำนวนครั้งที่กำหนด',
    httpCode: 401,
    resCode: 'AU-401-003'
  },
  invalidData: {
    en: 'Invalid data. Please try again.',
    th: 'ข้อมูลของท่านไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง',
    httpCode: 401,
    resCode: 'AU-401-004'
  },
  maxInvalidCode: {
    en: 'Too max invalid code.',
    th: 'รหัสของท่านไม่ถูกต้อง เกินจำนวนครั้งที่กำหนด',
    httpCode: 401,
    resCode: 'AU-401-005'
  },
  invalidCode: {
    en: 'Invalid code. Please try again.',
    th: 'รหัสของท่านไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง',
    httpCode: 401,
    resCode: 'AU-401-006'
  },
  activeCode: {
    en: 'Ref code is active',
    th: 'Ref code is active',
    httpCode: 401,
    resCode: 'AU-401-007'
  },
  codeExpired: {
    en: 'Code expired',
    th: 'Code expired',
    httpCode: 401,
    resCode: 'AU-401-008'
  },
  maxInvalidPin: {
    en: 'Too max invalid attempts. Your account has been locked.',
    th: 'PIN ของท่านไม่ถูกต้อง เกินจำนวนครั้งที่กำหนด',
    httpCode: 401,
    resCode: 'AU-401-009'
  },
  emptyPin: {
    en: 'PIN not set',
    th: 'PIN ของท่านยังไม่ได้ตั้งค่า',
    httpCode: 401,
    resCode: 'AU-401-010'
  },
  emptyPassword: {
    en: 'Password not set.',
    th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบ',
    httpCode: 401,
    resCode: 'AU-401-011'
  },
  maxRequestRefCode: {
    en: 'Too max request ref code',
    th: 'Too max request ref code',
    httpCode: 401,
    resCode: 'AU-401-014'
  },
  duplicateData: {
    en: 'Data is duplicate.',
    th: 'ข้อมูลของท่านมีการเข้าใช้งานแล้ว',
    httpCode: 401,
    resCode: 'AU-401-015'
  },
  dataNotFound: {
    en: 'User not found.',
    th: 'ไม่พบข้อมูล',
    httpCode: 409,
    resCode: 'AU-409-016'
  },
};
