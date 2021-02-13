import { html, css } from 'lit-element';
import { BaseElement } from '../../base-element';
import './post-element';
import '../../common/story-player';

export class StoriesCard extends BaseElement {
  static get styles() {
    return css`
      :host {
        --card-height: 118px;
        --card-width: var(--post-width);
        --store-image-size: 56px;
        display: block;
      }

      .card {
        overflow: scroll;
        width: var(--card-width);
        height: var(--card-height);
        border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
        border-radius: var(--radius-4);
        background-color: var(--header-white);
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .story-wrapper {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
      }

      .story-wrapper:last-child {
        padding-right: 20px;
      }

      .not-seen-story {
        border: 2px solid var(--not-seen-border);
      }

      .seen-story {
        border: 2px solid var(--seen-border);
      }

      .story-pic-wrapper-border {
        width: calc(var(--store-image-size) + 4px);
        height: calc(var(--store-image-size) + 4px);
        border-radius: 50%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      .story-pic-wrapper {
        overflow: hidden;
        height: var(--store-image-size);
        width: var(--store-image-size);
        border-radius: 50%;
      }

      .story-pic {
        display: block;
        max-height: var(--store-image-size);
      }
    `;
  }

  static get properties() {
    return {
      stories: { type: Array },
    };
  }

  constructor() {
    super();
    this.stories = [];
  }

  _onStoryOpen(userStories, index) {
    console.log(userStories);
    userStories.seen = true;
    this.stories = this.stories.map((story) => {
      if (story.userId === userStories.userId) {
        story.seen = true;
      }
      return story;
    });
    
    this.dispatchEvent(
      new CustomEvent('story-opened', {
        detail: { stories: this.stories, userId: userStories.userId, index: index },
        bubbles: true,
        composed: true,
      })
    );
  }

  _onStoryClose() {}

  render() {
    return html`
      <div class="card">
        ${this.stories.map(
          (userStories, i) => html`
            <div class="story-wrapper" @click=${() => this._onStoryOpen(userStories, i)}>
              <div class="story-pic-wrapper-border ${userStories.seen ? 'seen-story' : 'not-seen-story'}">
                <div class="story-pic-wrapper">
                  <img class="story-pic" src="${userStories.userPhotoUrl}" />
                </div>
              </div>
              <div>${userStories.userName}</div>
            </div>
          `
        )}
      </div>
    `;
  }
}

window.customElements.define('stories-card', StoriesCard);
