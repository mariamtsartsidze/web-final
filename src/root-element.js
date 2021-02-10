import { html, css } from 'lit-element';
import { BaseElement } from './base-element';
import { Router } from '@vaadin/router';
import { routes } from './routes';
import './common/app-header';

export class RootElement extends BaseElement {
  static get styles() {
    return css`
      .content {
        padding-top: calc(var(--header-height) + 1px);
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--background-white);
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  firstUpdated() {
    const outlet = this.shadowRoot.getElementById('outlet');
    const router = new Router(outlet, { baseUrl: '/' });

    router.setRoutes(routes);
  }

  render() {
    return html`
      <app-header></app-header>
      <div class="content">
        <div id="outlet"></div>
      </div>
    `;
  }
}

window.customElements.define('root-element', RootElement);
