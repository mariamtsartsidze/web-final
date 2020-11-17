import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../src/styles/common-styles';

export class PostElement extends LitElement {
  static get styles() {
    return [
      commonStyles,
      css`
        :host {
          --card-width: 616px;
          --header-height: 60px;
          --header-padding: 16px;
          --add-comment-height: 56px;
        }

        .card {
          display: block;
          border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
          width: var(--card-width);
        }

        .header {
          height: var(--header-height);
          padding: var(--header-padding);
          border-bottom: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
        }

        img {
          max-width: var(--card-width);
        }

        .add-comment {
          height: var(--add-comment-height);
          border-top: 1px solid rgba(var(--ce3, 239, 239, 239), 1);
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
    };
  }

  constructor() {
    super();
  }

  updated() {
    console.log(this.imgUrl);
  }

  render() {
    return html`
      <div class="card">
        <div class="header border-box"></div>
        <div class="content">
          <img src="${this.imgUrl}" />
        </div>
        <div class="reactions">
          <div>blabla</div>
          <div>blabla</div>
        </div>
        <div class="add-comment"></div>
      </div>
    `;
  }
}

window.customElements.define('post-element', PostElement);
