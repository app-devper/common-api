export default class GetUsersUseCase {
  constructor ({ userRepository, logger }) {
    this.repository = userRepository;
    this.logger = logger;
  }

  async execute (param) {
    const total = await this.repository.countUser();
    let results = [];
    if (param.page > 0) {
      results = await this.repository.getUsersByPage(param.page, param.limit);
    }
    const totalPages = Math.ceil(total / param.limit);
    return { results, total, page: param.page, totalPages }
  }
}
