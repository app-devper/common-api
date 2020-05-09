export default class UserRepository {
  constructor({ database }) {
    this.userDao = database.userDao()
  }

  addUser(user) {
    return this.userDao.addUser(user);
  }

  updateUser(id, user) {
    return this.userDao.updateUser(id, user)
  }

  getUserById(id) {
    return this.userDao.getUserById(id)
  }

  removeUser(id) {
    return this.userDao.removeUser(id)
  }

  getUserByUsername(username) {
    return this.userDao.getUserByUsername(username)
  }

  getUsersByPage(page, limit) {
    return this.userDao.getUsersByPage(page, limit)
  }

  countUser() {
    return this.userDao.countUser()
  }
}
