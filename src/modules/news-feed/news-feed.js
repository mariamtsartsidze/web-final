import { html, css } from 'lit-element';
import './post-element';
import { BaseElement } from '../../base-element';

export class NewsFeed extends BaseElement {
  static get styles() {
    return css`
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
    return html` ${this.newsFeed.map((post) => html` <div class="post"><post-element .imgUrl=${post.url}></post-element></div> `)} `;
  }
}

window.customElements.define('news-feed', NewsFeed);
