import { html, css } from 'lit-element';
import { BaseElement } from '../../base-element';

export class UserTimeline extends BaseElement {
  static get styles() {
    return css`
      .post {
        margin-bottom: 24px;
      }
    `;
  }

  static get properties() {
    return {
      timeline: { type: Array },
    };
  }

  constructor() {
    super();
    this.timeline = [];
  }

  async firstUpdated() {
    this.timeline = await this.postApi.timeline(1);
    console.log('timeline: ', this.timeline);
  }

  render() {
    return html`<div>timeline</div>`;
  }
}

window.customElements.define('user-timeline', UserTimeline);
