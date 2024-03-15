import {LitElement, css, html} from 'lit';

export class FileUploadButton extends LitElement {
  static properties = {
    name: {},
    text: {},
    fileName: undefined
  };

  createRenderRoot() {
    return this;
  }

  async onClick() {
    this.querySelector('input[type="file"]').showPicker();
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="file-upload">
          <input type="button" value="${this.text}" @click="${this.onClick}">
          <input type="file" id="file-upload" name="${this.name}" value="Upload" hidden>
      </div>
    `;
  }
}

customElements.define('ui-file-upload-button', FileUploadButton)
