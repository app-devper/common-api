export default class ReferenceRepository {
  constructor({ database }) {
    this.referenceDao = database.referenceDao()
    this.userDao = database.userDao()
  }

  getUserById(id) {
    return this.userDao.getUserById(id)
  }

  getUserByUsername(username) {
    return this.userDao.getUserByUsername(username)
  }

  addUserRef(user) {
    return this.referenceDao.addUserRef(user);
  }

  updateUserRef(id, data) {
    return this.referenceDao.updateUserRef(id, data)
  }

  getUserRefById(id) {
    return this.referenceDao.getUserRefById(id)
  }

  getCode(refCode) {
    return this.referenceDao.getCode(refCode)
  }

  removeByUserId(id) {
    return this.referenceDao.removeByUserId(id)
  }
}
