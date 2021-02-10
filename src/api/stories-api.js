import { BaseApi } from './base-api';

export class StoriesApi extends BaseApi {
  constructor() {
    super();
  }

  async allStories(userId) {
    const stories = await this.get('/src/api/data/stories.json');
    return [...stories.filter((story) => story.userId === userId), ...stories.filter((story) => story.userId !== userId)];
  }

  async userStories(userId) {
    const stories = await this.get('/src/api/data/stories.json');
    return stories.filter((story) => story.userId === userId);
  }
}
