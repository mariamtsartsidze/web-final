import { BaseApi } from './base-api';

export class PostApi extends BaseApi {
  constructor() {
    super();
  }

  async timeline(userId) {
    const posts = await this.get('/src/api/data/posts.json');
    const filteredPosts = posts.filter((post) => post.author.userId === userId);
    if(filteredPosts.length) {
      return filteredPosts;
    }
    return posts.filter((post) => post.author.userId === 1);
  }

  async newsFeed() {
    return this.get('/src/api/data/posts.json');
  }
}
