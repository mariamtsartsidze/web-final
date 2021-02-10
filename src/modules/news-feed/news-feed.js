import { html, css } from 'lit-element';
import { BaseElement } from '../../base-element';
import './post-element';
import './stories-card';

export class NewsFeed extends BaseElement {
  static get styles() {
    return css`
      .stories-card {
        margin-top: 24px;
        margin-bottom: 24px;
      }

      .post {
        margin-bottom: 24px;
      }
    `;
  }

  static get properties() {
    return {
      newsFeed: { type: Array },
    };
  }

  constructor() {
    super();
    this.newsFeed = [];
  }

  async firstUpdated() {
    this.newsFeed = await this.postApi.newsFeed();
  }

  render() {
    return html`
      <stories-card class="stories-card"></stories-card>
      ${this.newsFeed.map((post) => html`<post-element .imgUrl=${post.url} class="post"></post-element>`)}
    `;
  }
}

window.customElements.define('news-feed', NewsFeed);
