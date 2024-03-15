import {LitElement, css, html} from 'lit';

export class App extends LitElement {
  // static properties = {
  //   name: {},
  // };

  constructor() {
    super();
  }

  createRenderRoot() {
    return this;
  }

  onSubmit() {
    console.log('!!!');
  }

  // Render the UI as a function of component state
  render() {
    return html`
      Logo

      <h1>Timeline</h1>

      <form @submit="${this.onSubmit}">
          <label for="messageText">Message</label>
          <textarea id="messageText"></textarea>

          <div>
              <label for="file-upload">Upload</label>
              <input type="file" id="file-upload">
          </div>

          <button type="submit">submit</button>
      </form>
    `;
  }
}

customElements.define('ui-app', App)