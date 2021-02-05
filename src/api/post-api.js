import { Base } from './base';

export class PostApi extends Base {
  constructor() {
    super();
  }

  getPosts() {
    var xhr = new XMLHttpRequest();
    var url = '/src/api/data/posts1.json';
    xhr.onload = function () {
      let responseObj = JSON.parse(this.responseText);
      return responseObj;
    };
    xhr.open('GET', url, true);
    xhr.send();
  }

  posts() {
    this.get('/src/api/data/posts1.json', (response) => {
      console.log('opana: ', response);
    });
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
