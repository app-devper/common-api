export default class GetUsersUseCase {
  constructor({database, logger}) {
    this.userDao = database.userDao();
    this.logger = logger;
  }

  async execute(param) {
    const total = await this.userDao.countUser();
    let results = [];
    if (param.page > 0) {
      results = await this.userDao.getUsersByPage(param.page, param.limit);
    }
    const totalPages = Math.ceil(total / param.limit);
    return {results, total, page: param.page, totalPages}
  }
}
