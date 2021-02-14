import { BaseApi } from './base-api';

export class PostApi extends BaseApi {
  constructor() {
    super();
  }

  async timeline(userId) {
    const posts = await this.get('/src/api/data/posts.json');
    return posts.filter((post) => post.author.userId === userId);
  }

  async newsFeed() {
    return this.get('/src/api/data/posts.json');
  }
}
