import { html, css } from 'lit-element';
import { BaseElement } from '../../base-element';
import { Router } from '@vaadin/router';

export class RegisterLogin extends BaseElement {
  static get styles() {
    return css`
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      .login-card {
        border-radius: 12px;
        background-color: white;
        box-shadow: 2px 2px 6px 2px rgb(211, 211, 211);
        padding: 48px;
      }

      .actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .register-button {
        background: none !important;
        border: none;
        padding: 0 !important;
        text-decoration: underline;
        cursor: pointer;
        outline: none;
      }
    `;
  }

  static get properties() {
    return {
      users: { type: Array },
      registering: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.users = [];
    this.registering = false;
  }

  async firstUpdated() {}

  navigateToRegister() {
    this.registering = true;
  }

  navigateToLogin() {
    this.registering = false;
  }

  throwLoginEvent() {
    this.dispatchEvent(
      new CustomEvent('logged-in', {
        detail: { value: true },
        bubbles: true,
        composed: true,
      })
    );
  }

  async login() {
    const username = this.shadowRoot.getElementById('username').value;
    const password = this.shadowRoot.getElementById('password').value;
    if (username && password) {
      const loggedIn = await this.userApi.login(username, password);
      if (loggedIn) {
        Router.go('newsfeed');
      } else {
        console.error('incorrect credentials');
      }
    } else {
      console.error('fill all fields');
    }
  }

  async register() {
    const username = this.shadowRoot.getElementById('reg-username').value;
    const password = this.shadowRoot.getElementById('reg-password').value;
    const firstName = this.shadowRoot.getElementById('first-name').value;
    const lastName = this.shadowRoot.getElementById('last-name').value;
    if (username && password && firstName && lastName) {
      let registered = await this.userApi.register({ username, password, firstName, lastName });
      if (registered) {
        Router.go('newsfeed');
      } else {
        console.error('user already exists');
      }
    } else {
      console.error('fill all fields');
    }
  }

  get _loginForm() {
    return html`
      <label for="uname">Username:</label>
      <input type="text" id="username" name="uname" /><br /><br />
      <label for="pass">Password:</label>
      <input type="text" id="password" name="pass" /><br /><br />
      <div class="actions">
        <button id="loginButton" @click=${this.login}>Sign in</button>
        <button class="register-button" @click=${this.navigateToRegister}>Register now</button>
      </div>
    `;
  }

  get _registerForm() {
    return html`
      <label for="fname">First Name:</label>
      <input type="text" id="first-name" name="fname" /><br /><br />
      <label for="lname">Last Name:</label>
      <input type="text" id="last-name" name="lname" /><br /><br />
      <label for="uname">Username:</label>
      <input type="text" id="reg-username" name="uname" /><br /><br />
      <label for="pass">Password:</label>
      <input type="text" id="reg-password" name="pass" /><br /><br />
      <div class="actions">
        <button id="loginButton" @click=${this.register}>Sign up</button>
        <button class="register-button" @click=${this.navigateToLogin}>Back to login</button>
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="login-card">
          ${this.registering ? this._registerForm : this._loginForm}
        </div>
      </div>
    `;
  }
}

window.customElements.define('register-login', RegisterLogin);
