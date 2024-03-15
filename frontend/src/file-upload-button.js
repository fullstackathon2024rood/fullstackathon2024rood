import {LitElement, css, html, nothing} from 'lit';


export let loading = false;

export class FileUploadButton extends LitElement {
  static properties = {
    name: {},
    text: {},
    // loading: false,
    fileName: undefined,
    imageSrc: {},
    predictions: {}
  };

  createRenderRoot() {
    return this;
  }

  async onClick() {
    if(loading) {
      return;
    }
    this.querySelector('input[type="file"]').showPicker();
    this.querySelector('input[type="file"]').addEventListener('change', (event) => {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          
          reader.onload = (e) => {
            this.imageSrc = e.target.result;

            loading = true;
            this.requestUpdate();

            const img = document.getElementById('preview');

            var spinnerContainer = document.getElementById('spinner') // Using a class instead, see note below.
            spinnerContainer.classList.toggle('show-spinner');

            setTimeout((
                cocoSsd.load().then(model => {
                  model.detect(img).then(predictions => {
                    console.log('Predictions: ', predictions);
                    this.predictions = predictions[0].class
                    this.requestUpdate();
                    loading = false;
                    spinnerContainer.classList.toggle('show-spinner');
                  });
                })
            ), 500);

          }
          reader.readAsDataURL(event.target.files[0]);
      }
    });
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="file-upload">
          <input type="button" .disabled="${loading}" value="${this.text}" @click="${this.onClick}">
        
          <div class="file-upload__image-to-upload">
            <div class="spinner" id="spinner"><img src="/src/assets/loading-load.gif"></div>
            <img id="preview" src="${this.imageSrc}" alt="your image" .hidden="${!this.imageSrc}" />
          </div>
          <div class="file-upload__prediction">
            <h3 class="response">${this.predictions}</h3>
          </div>
          <input type="file" id="file-upload" name="${this.name}" value="Upload" hidden>
      </div>
    `;
  }
}

customElements.define('ui-file-upload-button', FileUploadButton)
