import {LitElement, css, html} from 'lit';

export class TimelineMessage extends LitElement {
  static properties = {
    messageText: {},
    imageUrl: {},
  };

  createRenderRoot() {
    return this;
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="timeline-message">
          <div class="timeline-message__message-text">${this.messageText}</div>
          <div class="timeline-message__image"><img src="${this.imageUrl}" width="100px"></img></div>
      </div>
    `;
  }
}

customElements.define('ui-timeline-message', TimelineMessage)
