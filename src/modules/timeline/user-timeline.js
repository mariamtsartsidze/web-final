import { html, css } from 'lit-element';
import { BaseElement } from '../../base-element';

export class UserTimeline extends BaseElement {
  static get styles() {
    return css`
      :host {
        align-items: center;
        display: flex;
        flex-direction: column;
      }

      .user-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 24px;
        margin-top: 36px;
      }

      .user-pic-wrapper {
        overflow: hidden;
        height: 150px;
        width: 150px;
        border-radius: var(--radius-round);
        margin-right: 96px;
      }

      .user-pic {
        display: block;
        max-height: 150px;
      }

      .username {
        font-size: 28px;
        margin-bottom: 12px;
      }

      .user-activities {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 12px;
      }

      .user-activity {
        font-size: 18px;
      }

      .user-activity:not(:last-child) {
        margin-right: 24px;
      }

      .full-name {
        font-weight: 600;
        font-size: 18px;
      }

      .post-container {
        width: 290px;
        height: 290px;
        overflow: hidden;
      }

      .post-pic {
        display: block;
        max-height: 290px;
      }

      .timeline-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        column-gap: 36px;
        row-gap: 36px;
        margin-top: 64px;
      }
    `;
  }

  static get properties() {
    return {
      timeline: { type: Array },
      followers: { type: Array },
      following: { type: Array },
    };
  }

  constructor() {
    super();
    this.timeline = [];
    this.followers = [];
    this.following = [];
  }

  async firstUpdated() {
    this.timeline = await this.postApi.timeline(this.loggedUser.id);
    this.followers = await this.userApi.getFollowers(this.loggedUser.id);
    this.following = await this.userApi.getFollowing(this.loggedUser.id);
    console.log('timeline: ', this.timeline, this.followers, this.following);
  }

  render() {
    return html`
      <div class="grid-container">
        <div class="user-info">
          <div class="user-pic-wrapper">
            <img class="user-pic" src="${this.loggedUser.photoUrl ? this.loggedUser.photoUrl : this.noAvatarUrl}" />
          </div>
          <div class="user-details">
            <div class="username">${this.loggedUser.username}</div>
            <div class="user-activities">
              <div class="user-activity">${this.timeline.length} posts</div>
              <div class="user-activity">${this.followers.length} followers</div>
              <div class="user-activity">${this.following.length} following</div>
            </div>
            <div class="full-name">${this.loggedUser.firstName} ${this.loggedUser.lastName}</div>
          </div>
        </div>
        <div></div>
        <div class="timeline-grid">
          ${this.timeline.map((post) => html`<div class="post-container"><img class="post-pic" src="${post.url}" /></div>`)}
        </div>
      </div>
    `;
  }
}

window.customElements.define('user-timeline', UserTimeline);
