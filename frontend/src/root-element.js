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
        background-color: cyan;
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
        background-color: var(--tester-purple);
      }

      .shortcuts {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: var(--tester-purple);
      }

      .shortcut:not(:first-child) {
        margin-left: var(--shortcut-left-margin);
      }

      .content {
        padding-top: calc(var(--header-height) + 1px);
        display: flex;
        /*height: calc(100vh - var(--header-height) - 1px);*/
        background-color: var(--background-white);
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
          <div class="search-field">search</div>
          <div class="shortcuts">
            <div class="shortcut">1</div>
            <div class="shortcut">2</div>
            <div class="shortcut">3</div>
            <div class="shortcut">4</div>
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
