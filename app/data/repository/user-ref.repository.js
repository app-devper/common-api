export default class UserRefRepository {
  constructor({ database }) {
    this.userRefDao = database.userRefDao()
    this.userDao = database.userDao()
  }

  getUserById(id) {
    return this.userDao.getUserById(id)
  }

  getUserByUsername(username) {
    return this.userDao.getUserByUsername(username)
  }

  addUserRef(user) {
    return this.userRefDao.addUserRef(user);
  }

  updateUserRef(id, data) {
    return this.userRefDao.updateUserRef(id, data)
  }

  getUserRefById(id) {
    return this.userRefDao.getUserRefById(id)
  }

  getCode(refCode) {
    return this.userRefDao.getCode(refCode)
  }

  removeByUserId(id) {
    return this.userRefDao.removeByUserId(id)
  }
}
