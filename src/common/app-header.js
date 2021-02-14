import { Router } from '@vaadin/router';
import { html, css } from 'lit-element';
import { BaseElement } from '../base-element';

export class AppHeader extends BaseElement {
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
        align-items: center;
      }

      .shortcut {
        cursor: pointer;
      }

      .shortcut:not(:first-child) {
        margin-left: var(--shortcut-left-margin);
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

      .user-pic-wrapper {
        overflow: hidden;
        height: 30px;
        width: 30px;
        border-radius: var(--radius-round);
        margin-right: 8px;
      }

      .user-pic {
        display: block;
        max-height: 30px;
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  _onHomeRedirect() {
    Router.go('newsfeed');
  }

  _onTimelineRedirect() {
    Router.go('timeline');
  }

  render() {
    return html`
      <div class="header sticky">
        <div class="nav-bar">
          <div class="home-button" @click=${this._onHomeRedirect}>
            <img class="logo" src="../assets/images/logo.png" />
          </div>
          <div class="search-field">
            <input type="text" placeholder="search" class="search-input" />
          </div>
          <div class="shortcuts">
            <iron-icon icon="home" class="shortcut" @click=${this._onHomeRedirect}></iron-icon>
            <iron-icon icon="communication:message" class="shortcut"></iron-icon>
            <iron-icon icon="thumb-up" class="shortcut"></iron-icon>
            <div class="shortcut" @click=${this._onTimelineRedirect}>
              <div class="user-pic-wrapper">
                <img class="user-pic" src="${this.loggedUser.photoUrl ? this.loggedUser.photoUrl : this.noAvatarUrl}" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('app-header', AppHeader);
