import { LitElement, css, html, nothing } from 'lit';
import './file-upload-button.js';
import {loading} from "./file-upload-button";
import './timeline-message.js';
import {toggleNightmare} from './jakob-nielsen-nightmare.js';

export class App extends LitElement {
  messages = [];

  constructor() {
    super();

    setTimeout(() => {
      this.loadMessages();
    }, 2000);
  }

  loadMessages () {
    fetch('/messages', {method: 'GET'})
      .then(response => response.json())
      .then(responseJson => {
        this.messages = responseJson;
        this.requestUpdate();
      });
  }

  createRenderRoot() {
    return this;
  }

  async onSubmit(event) {
    const formData = new FormData(event.target);

    event.preventDefault();

    await fetch('/messages',{
      method: 'POST',
      body: new FormData(event.target)
    });

    this.loadMessages();
  }

  // Render the UI as a function of component state
  render() {
    return html`
        <div class="centerContainer">
          <header class="logoContainer"><img src="./src/assets/facebook.svg" id="logoImage" @click="${toggleNightmare}"></header>

          <main>
            <h1>Timeline</h1>

            ${this.messages?.map(message =>
                html`<ui-timeline-message .messageText=${message.messageText} imageUrl="${message.imageUrl}"></ui-timeline-message>`)}

            <div class="form-line"></div>
            <form @submit="${this.onSubmit}" action="#/">
              <h2>New Message</h2>
              <div class="formField">
                <label for="messageText" class="labelForTextarea">Message</label>
                <textarea id="messageText" name="message-text"></textarea>
              </div>
              <div class="formField">
                <ui-file-upload-button name="file" text="Upload"></ui-file-upload-button>
              </div>
              <div class="formField submit">
                <button type="submit" id="submit" .disabled="${loading}">submit</button>
              </div>

            </form>
          </main>
          
          <footer>© Team Red - Fullstackathon 2024</footer>

      </div>
    `;
  }
}

customElements.define('ui-app', App)
