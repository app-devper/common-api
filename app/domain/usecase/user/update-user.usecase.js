export default class UpdateUserUsecase {
  constructor({ userRepository, logger }) {
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute(param) {
    const user = await this.repository.updateUser(param.id, param.user)
    delete user.password
    return user
  }
}
