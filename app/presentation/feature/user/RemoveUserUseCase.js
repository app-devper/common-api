export default class RemoveUserUseCase {
  constructor({database, logger}) {
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    const user = await this.userDao.removeUser(param.id)
    delete user.password
    return user
  }
}
