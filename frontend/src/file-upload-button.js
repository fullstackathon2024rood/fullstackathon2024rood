import {LitElement, css, html, nothing} from 'lit';


export let loading = false;

export class FileUploadButton extends LitElement {
  static properties = {
    name: {},
    text: {},
    // loading: false,
    fileName: undefined,
    imageSrc: {},
    predictions: {},
    advice: {}
  };

  connectedCallback() {
    super.connectedCallback()
    fetch('https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-31abe079-0e1e-4595-bf92-7723fc6767bb/default/helloWorld',{
      method: 'GET'
    }).then(response=>response.json())
    .then(response => {
      this.advice = response.advice;
    });
  }

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

            var spinnerContainer = document.getElementById('spinner');
            spinnerContainer.classList.add('show-spinner');
            var fileUploadButton = document.getElementById('file-upload-button');
            fileUploadButton.classList.add('disabled');
            var submitContainer = document.getElementById('submit');
            submitContainer.classList.add('disabled');

            console.log(this.advice[0])

            setTimeout((
                cocoSsd.load().then(model => {
                  model.detect(img).then(predictions => {
                    console.log('Predictions: ', predictions);
                    if(!!predictions && !!predictions[0]) {
                      const isContainedInAdvice = this.advice.includes(predictions[0].class)
                      if (isContainedInAdvice) {
                        this.predictions = "This image contains an image of a person. Consider if you think that this image could be used maliciously"
                      } else {
                        this.predictions = "This image seems safe to upload"
                      }
                      this.requestUpdate();
                    } else {
                      this.predictions = "This image seems safe to upload"
                    }
                    loading = false;
                    spinnerContainer.classList.remove('show-spinner');
                    fileUploadButton.classList.remove('disabled');
                    submitContainer.classList.remove('disabled');
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
          <input type="button" id="file-upload-button" .disabled="${loading}" value="${this.text}" @click="${this.onClick}">
        
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
