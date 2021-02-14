import { html, css } from 'lit-element';
import { BaseElement } from './base-element';
import { Router } from '@vaadin/router';
import { routes } from './routes';
import './common/app-header';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/communication-icons';
import '@polymer/iron-icons/social-icons';

export class RootElement extends BaseElement {
  static get styles() {
    return css`
      .content-padding {
        padding-top: calc(var(--header-height) + 1px);
      }

      .content {
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--background-white);
        height: 100%;
      }

      .outlet {
        width: 100%;
      }
    `;
  }

  static get properties() {
    return {
      loggedIn: {type: Boolean}
    };
  }

  constructor() {
    super();
  }

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');
    const router = new Router(outlet, { baseUrl: '/' });

    router.setRoutes(routes);

    window.addEventListener('vaadin-router-location-changed', e => {
      this.loggedIn = !!localStorage.getItem('loggedIn');
      if(this.loggedIn && window.location.pathname === '/') {
        Router.go('newsfeed');
      }
    });
  }

  render() {
    return html`
      ${this.loggedIn ? html` <app-header></app-header> ` : ''}
      <div class="content ${this.loggedIn ? 'content-padding' : ''}">
        <div id="outlet" class="outlet"></div>
      </div>
    `;
  }
}

window.customElements.define('root-element', RootElement);
