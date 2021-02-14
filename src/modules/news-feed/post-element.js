import { html, css } from 'lit-element';
import { commonStyles } from '../../styles/common-styles';
import { BaseElement } from '../../base-element';

export class PostElement extends BaseElement {
  static get styles() {
    return [
      commonStyles,
      css`
        :host {
          --card-width: var(--post-width);
          --header-height: 60px;
          --header-padding: 16px;
          --add-comment-height: 56px;
          display: block;
        }

        .card {
          display: block;
          border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
          width: var(--card-width);
        }

        .header {
          height: 60px;
          padding: 16px;
          border-bottom: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
        }

        img {
          max-width: var(--card-width);
        }

        .add-comment {
          height: var(--add-comment-height);
          border-top: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
        }

        .reactions {
          display: flex;
          flex-direction: row;
        }

        .reaction:not(:first-child) {
          margin-left: 16px;
        }

        .image-author {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .user-pic-wrapper {
          overflow: hidden;
          height: 30px;
          width: 30px;
          border-radius: var(--radius-round);
          margin-right: 12px;
        }

        .user-pic {
          display: block;
          width: 30px;
          height: 30px;
        }

        @media (max-width: 600px) {
          :host {
            --card-width: calc(100% - 2px);
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      imgUrl: {
        type: String,
        attribute: 'imgUrl',
      },
      author: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="card">
        <div class="header border-box">
          <div class="image-author">
            <div class="user-pic-wrapper">
              <img class="user-pic" src=${this.author.imgUrl} />
            </div>
            <div>${this.author.username}</div>
          </div>
        </div>
        <div class="content">
          <img src="${this.imgUrl}" />
        </div>
        <div class="reactions">
          <iron-icon icon="thumb-up" class="reaction"></iron-icon>
          <iron-icon icon="communication:comment" class="reaction"></iron-icon>
          <iron-icon icon="communication:message" class="reaction"></iron-icon>
        </div>
        <div class="add-comment"></div>
      </div>
    `;
  }
}

window.customElements.define('post-element', PostElement);
