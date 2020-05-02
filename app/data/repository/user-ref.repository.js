export default class UserRefRepository {
  constructor({ database }) {
    this.userRefDao = database.userRefDao()
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

  removeByUserId(id) {
    return this.userRefDao.removeByUserId(id)
  }
}
