import { html, css } from 'lit-element';
import { BaseElement } from '../base-element';
import { commonStyles } from '../styles/common-styles';

export class StoryPlayer extends BaseElement {
  static get styles() {
    return [
      commonStyles,
      css`
        :host {
          --card-height: 500px;
          --card-width: 300px;
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
          top: 128px;
          left: 50%;
          transform: translateX(-50%);
          width: var(--card-width);
          height: var(--card-height);
          background-color: black;
          border-radius: var(--radius-4);
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
          border-radius: 50%;
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
      `,
    ];
  }

  static get properties() {
    return {
      stories: { type: Array },
      index: { type: Number },
      open: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.stories = [];
    this.index = 0;
    this.open = false;
  }

  openStory(index) {
    this.open = true;
    this.index = index;
  }

  closeStory() {
    this.open = false;
  }

  render() {
    return html`
      <div class="overlay">
        <div class="story-modal">
          ${this.stories?.length
            ? html`
                <div class="header border-box">
                  <div class="user-container">
                    <div class="story-user-pic-wrapper">
                      <img class="story-user-pic" src="${this.stories[this.index].userPhotoUrl}" />
                    </div>
                    <div>${this.stories[this.index].userName}</div>
                  </div>
                  <iron-icon icon="close" class="close-icon" @click=${() => this.closeStory()}></iron-icon>
                </div>
                <div class="story-container">
                  <img class="story-img" src="${this.stories[this.index].stories[0].url}" />
                </div>
              `
            : ''}
        </div>
      </div>
    `;
  }
}

window.customElements.define('story-player', StoryPlayer);