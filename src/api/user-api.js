import { BaseApi } from './base-api';

export class UserApi extends BaseApi {
  usersData = [];

  constructor() {
    super();
  }

  async register(userInfo) {
    if (this.usersData.length === 0) {
      this.usersData = await this.get('/src/api/data/users.json');
    }
    const userExists = this.usersData.find((user) => user.username === userInfo.username);
    if (!userExists) {
      userInfo.id = this.usersData.length + 1;
      this.usersData.push(userInfo);
      const { id, username, firstName, lastName } = userInfo;
      this.storeLogin({ id, username, firstName, lastName });
      return true;
    }
    return false;
  }

  storeLogin(userInfo) {
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  async login(username, password) {
    if (this.usersData.length === 0) {
      this.usersData = await this.get('/src/api/data/users.json');
    }
    const foundUser = this.usersData.find((user) => user.username === username && user.password === password);
    if (foundUser) {
      const { id, username, firstName, lastName, photoUrl } = foundUser;
      this.storeLogin({ id, username, firstName, lastName, photoUrl });
    }
    return !!foundUser;
  }

  async logOut() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('loggedIn');
  }

  async getFollowers(userId) {
    if (this.usersData.length === 0) {
      this.usersData = await this.get('/src/api/data/users.json');
    }
    const foundUser = this.usersData.find((user) => user.id === userId);
    if(foundUser) {
      return foundUser.followers;
    }
    return [];
  }

  async getFollowing(userId) {
    if (this.usersData.length === 0) {
      this.usersData = await this.get('/src/api/data/users.json');
    }
    const foundUser = this.usersData.find((user) => user.id === userId);
    if(foundUser) {
      return foundUser.followers;
    }
    return [];
  }
}
