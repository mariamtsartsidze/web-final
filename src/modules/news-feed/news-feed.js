import { html, css } from 'lit-element';
import { BaseElement } from '../../base-element';
import './post-element';
import './stories-card';
import '../../common/story-player';

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
      stories: { type: Object },
    };
  }

  constructor() {
    super();
    this.newsFeed = [];
    this.stories = [];
  }

  async firstUpdated() {
    this.newsFeed = await this.postApi.newsFeed();
    this.stories = await this.storiesApi.allStories(1);
  }

  _playerOpened(e) {
    console.log('opened: ', e.detail);
    this.shadowRoot.getElementById('player').openStory(e.detail.index);
  }

  render() {
    return html`
      <stories-card class="stories-card" .stories=${this.stories} @story-opened=${this._playerOpened}></stories-card>
      ${this.newsFeed.map((post) => html`<post-element .imgUrl=${post.url} class="post"></post-element>`)}
      <story-player id="player" .stories=${this.stories} .index=${1}></story-player>
    `;
  }
}

window.customElements.define('news-feed', NewsFeed);
