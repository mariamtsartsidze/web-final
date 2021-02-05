import { LitElement } from 'lit-element';
import { PostApi } from './api/post-api';
import { UserApi } from './api/user-api';

export class BaseElement extends LitElement {
  static get properties() {
    return {
      postApi: { type: Object },
      userApi: { type: Object },
    };
  }

  constructor() {
    super();
    this.postApi = new PostApi();
    this.userApi = new UserApi();
  }
}

window.customElements.define('base-element', BaseElement);
