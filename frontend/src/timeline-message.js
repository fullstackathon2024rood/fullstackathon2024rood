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
          <span class="message">${this.messageText}</span>
          <img src="${this.imageUrl}" width="100px"></img>
      </div>
    `;
  }
}

customElements.define('ui-timeline-message', TimelineMessage)