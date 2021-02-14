import { LitElement } from 'lit-element';
import { PostApi } from './api/post-api';
import { UserApi } from './api/user-api';
import { StoriesApi } from './api/stories-api';

export class BaseElement extends LitElement {
  static get properties() {
    return {
      postApi: { type: Object },
      userApi: { type: Object },
      storiesApi: { type: Object },
      noAvatarUrl: { type: String },
    };
  }

  constructor() {
    super();
    this.postApi = new PostApi();
    this.userApi = new UserApi();
    this.storiesApi = new StoriesApi();
    this.noAvatarUrl = '../../assets/images/no-avatar.png';
  }

  get loggedUser() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}

window.customElements.define('base-element', BaseElement);
