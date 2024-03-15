import {LitElement, css, html} from 'lit';
import './file-upload-button.js';

export class App extends LitElement {
  createRenderRoot() {
    return this;
  }

  onSubmit(event) {
    const formData = new FormData(event.target);
    const files = formData.get('files');
    const url = URL.createObjectURL(files);

    console.log(url);

    // fetch('/api/medium/article',{
    //   method: 'POST',
    //   body: new FormData(event.target)
    // });

    event.preventDefault();
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <img src="./src/assets/facebook.svg" id="logoImage">

      <h1>Timeline</h1>

      <form @submit="${this.onSubmit}" action="#/">
          <label for="messageText">Message</label>
          <textarea id="messageText" name="message-text"></textarea>

          <ui-file-upload-button name="files" text="Upload"></ui-file-upload-button>

          <button type="submit">submit</button>
      </form>
    `;
  }
}

customElements.define('ui-app', App)
