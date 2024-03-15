import {LitElement, css, html, nothing} from 'lit';

export class FileUploadButton extends LitElement {
  static properties = {
    name: {},
    text: {},
    fileName: undefined,
    imageSrc: {},
    predictions: {}
  };

  createRenderRoot() {
    return this;
  }

  async onClick() {
    this.querySelector('input[type="file"]').showPicker();
    this.querySelector('input[type="file"]').addEventListener('change', (event) => {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          
          reader.onload = (e) => {
            this.imageSrc = e.target.result;
            this.requestUpdate();

            const img = document.getElementById('preview');
            cocoSsd.load().then(model => {
            model.detect(img).then(predictions => {
                console.log('Predictions: ', predictions);
                this.predictions = predictions[0].class
                this.requestUpdate();
              });
            });
          }
          reader.readAsDataURL(event.target.files[0]);
      }
    });
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="file-upload">
          <input type="button" value="${this.text}" @click="${this.onClick}">
          <img id="preview" src="${this.imageSrc}" alt="your image" .hidden="${!this.imageSrc}" />
          <div>${this.predictions}</div>
          <input type="file" id="file-upload" name="${this.name}" value="Upload" hidden>
      </div>
    `;
  }
}

customElements.define('ui-file-upload-button', FileUploadButton)
