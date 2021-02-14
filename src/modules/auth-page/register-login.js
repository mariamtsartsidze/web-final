import { html, css } from 'lit-element';
import { BaseElement } from '../../base-element';

export class RegisterLogin extends BaseElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      users: { type: Array },
    };
  }

  constructor() {
    super();
    this.users = [];
  }

  async firstUpdated() {
    
  }

  render() {
    return html`<div>register/login page</div>`;
  }
}

window.customElements.define('register-login', RegisterLogin);
