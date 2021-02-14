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
      this.usersData.push(userInfo);
      this.storeLogin(userInfo);
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
      this.storeLogin(foundUser);
    }
    return !!foundUser;
  }

  async logout() {
    localStorage.removeItem('userInfo');
    localStorage.setItem('loggedIn', false);
  }
}
