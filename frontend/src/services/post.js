import { Base } from './base';

export class Post extends Base {
  constructor() {
    super();
  }

  posts() {
    return this.postsData;
  }

  userWall(userId) {
    return this.postsData.filter((post) => post.userId === userId);
  }

  userFeed() {
    return this.postsData.filter((post) => {
      let randomNumber = Math.random();
      return randomNumber >= 0.5;
    });
  }
}
