export default class RemoveUserUsecase {
  constructor({ userRepository, logger }) {
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute(param) {
    const user = await this.repository.removeUser(param.id)
    delete user.password
    return user
  }
}
