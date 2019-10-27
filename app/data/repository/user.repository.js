export default class UserRepository {
  constructor ({ database }) {
    this.userDao = database.userDao()
  }

  addUser (user) {
    return this.userDao.addUser(user);
  }

  updateUser (id, user) {
    return this.userDao.updateUser(id, user)
  }

  getUserById (id) {
    return this.userDao.getUserById(id)
  }

  removeUser (id) {
    return this.userDao.removeUser()
  }

  getUsers () {
    return this.userDao.getUsers()
  }

  getUserByUsername (username) {
    return this.userDao.getUserByUsername(username)
  }

  verifyUser (username, password) {
    return this.userDao.verifyUser(username, password)
  }

  getUserByCriteria (criteria) {
    return this.userDao.getUserByCriteria(criteria)
  }

  getUserListByCriteria (criteria) {
    return this.userDao.getUserListByCriteria(criteria)
  }

  getUsersByPage (page, limit) {
    return this.userDao.getUsersByPage(page, limit)
  }

  countUser () {
    return this.userDao.countUser()
  }
}
