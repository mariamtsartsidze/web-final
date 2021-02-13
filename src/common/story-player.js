import { html, css } from 'lit-element';
import { BaseElement } from '../base-element';

export class StoryPlayer extends BaseElement {
  static get styles() {
    return css`
      :host {
        --card-height: 500px;
        --card-width: 300px;

        position: absolute;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
      }

      :host([open]) {
        display: block;
      }

      :host(:not([open])) {
        display: none;
      }

      .story-modal {
        z-index: 1;
        width: var(--card-width);
        height: var(--card-height);
        background-color: purple;
      }
    `;
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
      <div class="story-modal">
        ${this.stories?.length ? html` <div>${this.stories[this.index].userName}</div> ` : ''}
      </div>
    `;
  }
}

window.customElements.define('story-player', StoryPlayer);
