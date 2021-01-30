import { Base } from './base';

export class User extends Base {
  constructor() {
    super();
  }

  register(userInfo) {
    this.usersData.push(userInfo);
    this.storeLogin(userInfo);
  }

  storeLogin(userInfo) {
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  login(username, password) {
    const foundUser = this.usersData.find((user) => user.username === username && user.password === password);
    if (foundUser) {
      this.storeLogin(foundUser);
    }
    return !!foundUser;
  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.setItem('loggedIn', false);
  }
}
