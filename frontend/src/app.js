import { LitElement, html } from 'lit';
import './file-upload-button.js';
import './timeline-message.js';
import {toggleNightmare} from './jakob-nielsen-nightmare.js';

export class App extends LitElement {
  static get properties() {
      return {
          messages:{
              type:Array,
              hasChanged: (value, oldValue) => true
          }
      }
  }

  // messages = [];

  constructor() {
    super();
  }

  firstUpdated(changedProperties) {
    this.loadMessages();
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
    event.preventDefault();

    var submitButton = document.getElementById('submit');
    if(submitButton.classList.contains('disabled')) {
      return;
    }

    const formData = new FormData(event.target);
    if(formData.get("message-text").trim() == '') {
      alert('No text message is given')
      return;
    }
    if(formData.get("file").name.trim() == '') {
      alert('No image is chosen yet')
      return;
    }




    console.log('START of http://206.189.3.8:8080/obfuscate')
    await fetch('http://206.189.3.8:8080/obfuscate',{
    /*console.log('START of https://king-prawn-app-uh9u9.ondigitalocean.app/obfuscate')
    await fetch('https://king-prawn-app-uh9u9.ondigitalocean.app/obfuscate',{*/
      method: 'PUT',
      body: new FormData(event.target)
    })
        .then(async (response) => response)
        .then(response => response.blob())
        .then(blob => {
          const imageUrl = URL.createObjectURL(blob);
          const imgElement = document.createElement('img');
          imgElement.src = imageUrl;

            this.messages = [
                ...this.messages,
                {
                    messageText: formData.get("message-text"),
                    imageUrl: imageUrl
                }];

          this.requestUpdate();
        });

    // this.loadMessages();
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
                <button type="submit" id="submit">Submit</button>
              </div>

            </form>
          </main>
          
          <footer>© Team Red - Fullstackathon 2024</footer>

      </div>
    `;
  }
}

customElements.define('ui-app', App)
