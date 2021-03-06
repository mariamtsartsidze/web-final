import { html, css } from 'lit-element';
import { BaseElement } from '../base-element';
import { commonStyles } from '../styles/common-styles';

export class StoryPlayer extends BaseElement {
  static get styles() {
    return [
      commonStyles,
      css`
        :host {
          --card-height: 650px;
          --card-width: 350px;
        }

        :host([open]) {
          display: block;
        }

        :host(:not([open])) {
          display: none;
        }

        .overlay {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }

        .story-modal {
          position: absolute;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          top: 128px;
          left: 50%;
          transform: translateX(-50%);
        }

        .story-card {
          position: relative;
          width: var(--card-width);
          height: var(--card-height);
          background-color: black;
          border-radius: var(--radius-4);
          margin: 0 8px;
        }

        .arrow-container {
          width: 24px;
          height: 24px;
          background-color: var(--text-color-light);
          border-radius: var(--radius-round);
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .header {
          padding: 12px 12px 0 12px;
          width: 100%;
          position: absolute;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          color: var(--text-color-light);
        }

        .close-icon {
          cursor: pointer;
        }

        .user-container {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .story-user-pic-wrapper {
          overflow: hidden;
          height: 30px;
          width: 30px;
          border-radius: var(--radius-round);
          margin-right: 8px;
        }

        .story-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 100%;
        }

        .story-user-pic {
          display: block;
          max-height: 30px;
        }

        .story-img {
          max-width: var(--card-width);
          max-height: calc(var(--card-height) - 64px);
        }

        .left-arrow-container {
          position: absolute;
          top: 50%;
          left: -32px;
          transform: translateY(-50%);
        }

        .right-arrow-container {
          position: absolute;
          top: 50%;
          right: -32px;
          transform: translateY(-50%);
        }

        .story-num {
          margin-left: 18px;
        }

        .user-enum {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        @media (max-width: 600px) {
          :host {
            --card-width: calc(100vw - 2px);
            --card-height: calc(100vh - 64px);
          }

          .story-modal {
            top: 64px;
          }

          .story-card {
            margin: 0;
          }

          .arrow-container {
            display: none;
          }

          .left-arrow-container {
            display: block;
            position: absolute;
            left: 6px;
          }

          .right-arrow-container {
            display: block;
            position: absolute;
            right: 4px;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      stories: { type: Array },
      index: { type: Number },
      userStoryIndex: { type: Number },
      open: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.stories = [];
    this.index = 0;
    this.userStoryIndex = 0;
    this.open = false;
  }

  openStory(index) {
    this.open = true;
    this.index = index;
  }

  closeStory() {
    this.open = false;
  }

  userLastStoryIndex(index) {
    return this.stories[index].stories.length - 1;
  }

  userStoriesNum(index) {
    return this.stories[index].stories.length;
  }

  previousStory() {
    if (this.userStoryIndex > 0) {
      this.userStoryIndex--;
    } else if (this.index > 0) {
      this.index--;
      this.userStoryIndex = this.userLastStoryIndex(this.index);
    } else {
      this.closeStory();
    }
  }

  nextStory() {
    if (this.userStoryIndex < this.userLastStoryIndex(this.index)) {
      this.userStoryIndex++;
      if (this.userStoryIndex === this.userLastStoryIndex(this.index)) {
        this.dispatchEvent(
          new CustomEvent('story-seen', {
            detail: { userId: this.stories[this.index].userId, index: this.index },
            bubbles: true,
            composed: true,
          })
        );
      }
    } else if (this.index < this.stories.length - 1) {
      this.index++;
      this.userStoryIndex = 0;
    } else {
      this.closeStory();
    }
  }

  render() {
    return html`
      ${this.stories && this.stories.length
        ? html` <div class="overlay">
            <div class="story-modal">
              <div class="story-card">
                <div class="header border-box">
                  <div class="user-enum">
                    <div class="user-container">
                      <div class="story-user-pic-wrapper">
                        <img class="story-user-pic" src="${this.stories[this.index].userPhotoUrl}" />
                      </div>
                      <div>${this.stories[this.index].userName}</div>
                    </div>
                    <div class="story-num">${this.userStoryIndex + 1}/${this.userStoriesNum(this.index)}</div>
                  </div>
                  <iron-icon icon="close" class="close-icon" @click=${() => this.closeStory()}></iron-icon>
                </div>
                <div class="story-container">
                  <img class="story-img" src="${this.stories[this.index].stories[this.userStoryIndex].url}" />
                </div>
                <div class="left-arrow-container arrow-container" @click=${() => this.previousStory()}>
                  <iron-icon icon="chevron-left" class="resp-left-arrow"></iron-icon>
                </div>
                <div class="right-arrow-container arrow-container" @click=${() => this.nextStory()}>
                  <iron-icon icon="chevron-right" class="resp-right-arrow"></iron-icon>
                </div>
              </div>
            </div>
          </div>`
        : ''}
    `;
  }
}

window.customElements.define('story-player', StoryPlayer);
