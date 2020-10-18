export default class UpdateUserUseCase {
  constructor({database, logger}) {
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    const user = await this.userDao.updateUser(param.id, param.user)
    delete user.password
    return user
  }
}
