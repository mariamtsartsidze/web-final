import { LitElement, html, css } from 'lit-element';
import './post-element';

export class MyElement extends LitElement {
  static get styles() {
    return css`
      .header {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: var(--header-height);
        background-color: var(--header-white);
        border-bottom: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
      }

      .sticky {
        position: fixed;
        top: 0;
        width: 100%;
      }

      .nav-bar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 55%;
      }

      .home-button {
        display: flex;
        cursor: pointer;
      }

      .logo {
        width: var(--logo-width);
      }

      .search-field {
        width: var(--search-field-width);
        height: var(--search-field-height);
      }

      .shortcuts {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .shortcut:not(:first-child) {
        margin-left: var(--shortcut-left-margin);
      }

      .content {
        padding-top: calc(var(--header-height) + 1px);
        display: flex;
        background-color: var(--background-white);
      }

      .search-input {
        width: var(--search-field-width);
        height: var(--search-field-height);
        outline: none;
        box-sizing: border-box;
        border: none;
        border: solid 1px var(--color-gray-1);
        border-radius: 4px;
      }

      .search-input:not(:focus)::placeholder {
        text-align: center;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;
  }

  _redirectiToHome() {
    console.log('redirecting');
  }

  render() {
    return html`
      <div class="header sticky">
        <div class="nav-bar">
          <div class="home-button" @click=${this._redirectiToHome}>
            <img class="logo" src="../assets/images/logo.png" />
          </div>
          <div class="search-field">
            <input type="text" placeholder="search" class="search-input" />
          </div>
          <div class="shortcuts">
            <iron-icon icon="home" class="shortcut"></iron-icon>
            <iron-icon icon="communication:message" class="shortcut"></iron-icon>
            <iron-icon icon="thumb-up" class="shortcut"></iron-icon>
            <div class="shortcut">pic</div>
          </div>
        </div>
      </div>
      <div class="content">
        <post-element .imgUrl=${'../assets/images/IMG_20201017_150630.jpg'}></post-element>
      </div>
    `;
  }
}

window.customElements.define('root-element', MyElement);
