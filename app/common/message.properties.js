export const resMessage = {
  general: {
    success: {
      en: 'Transaction success.',
      th: 'ทำรายการสำเร็จ',
      httpCode: 200
    },
    error: {
      en: 'Internal Server Error.',
      th: 'ขออภัย ระบบไม่สามารถให้บริการได้ในขณะนี้',
      httpCode: 500
    },
    invalidData: {
      en: 'Invalid data.',
      th: 'ข้อมูลไม่ถูกต้อง',
      httpCode: 409
    },
    missingAuthorization: {
      en: 'Missing Authorization Header',
      th: 'การอนุมัติที่ส่วนหัวขาดหายไป',
      httpCode: 401
    },
    serviceNotFound: {
      en: 'Service Missing / Not found. Please contact admin.',
      th: 'ไม่พบบริการที่คุณร้องขอ กรุณาติดต่อ ผู้ดูแลระบบ',
      httpCode: 404
    },
    dataNotFound: {
      en: 'Data not found.',
      th: 'ไม่พบข้อมูล',
      httpCode: 409
    },
    methodNotAllowed: {
      en: 'Method not allowed.',
      th: 'วิธีการไม่ได้รับอนุญาต',
      httpCode: 405
    }
  },
  authentication: {
    unAuthorized: {
      en: 'Unauthorized.',
      th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้',
      httpCode: 401
    },
    forbidden: {
      en: 'Forbidden. Please contact admin.',
      th: 'คุณไม่มีสิทธิ์เข้าใช้งานระบบนี้ กรุณาติดต่อ ผู้ดูแลระบบ',
      httpCode: 403
    },
    tokenExpired: {
      en: 'Your session has expired you need to login again.',
      th: 'Username ของท่านหมดอายุการใช้งาน กรุณาล็อคอินใหม่',
      httpCode: 401
    },
    tokenInvalid: {
      en: 'Your session has invalid you need to login again.',
      th: 'Username ของท่านไม่พบการใช้งาน กรุณาล็อคอินใหม่',
      httpCode: 401
    },
    duplicateLogin: {
      en: 'Your current session is duplicate.',
      th: 'Username ของท่านมีการเข้าใช้งานแล้ว กรุณาตรวจสอบ',
      httpCode: 401
    },
    tooManyInvalidPass: {
      en: 'Too many invalid attempts. Your account has been temporarily locked, Please try again later.',
      th: 'Username / Password ของท่านไม่ถูกต้อง เกินจำนวนครั้งที่กำหนด กรุณารอสักครู่ เพื่อทำรายการใหม่อีกครั้ง',
      httpCode: 401
    },
    incorrectUserPass: {
      en: 'Incorrect username or password. Please try again.',
      th: 'Username / Password ของท่านไม่ถูกต้อง กรุณาทำรายการใหม่อีกครั้ง',
      httpCode: 401
    }
  },
  user: {
    duplicate: {
      en: 'Username is duplicate.',
      th: 'Username มีอยู่แล้ว กรุณาตรวจสอบ',
      httpCode: 409
    }
  },
  db: {
    connectionFail: {
      en: 'Failed to establish a connection to the database. Please try again later.',
      th: 'Failed to establish a connection to the database. Please try again later.',
      httpCode: 599
    }
  }
};
