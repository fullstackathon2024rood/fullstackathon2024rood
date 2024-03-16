import {LitElement, html} from 'lit';


export let loading = false;

export let enabledPersonCheck = false;

export class FileUploadButton extends LitElement {
  static properties = {
    name: {},
    text: {},
    fileName: undefined,
    imageSrc: {},
    predictions: {},
      foundClass: '',
    advice: {}
  };

  createRenderRoot() {
    return this;
  }

    connectedCallback() {
        super.connectedCallback()
        fetch('https://faas-ams3-2a2df116.doserverless.co/api/v1/web/fn-31abe079-0e1e-4595-bf92-7723fc6767bb/default/helloWorld',{
            method: 'GET'
        }).then(response=>response.json())
            .then(response => {
                this.advice = response.advice;
            });
    }

    firstUpdated(changedProperties) {
        this.querySelector('input[type="file"]').addEventListener('change', (event) => {
            if (event.target.files && event.target.files[0]) {
                var responseText = document.getElementById('responseText');
                responseText.classList.add('hidden');

                var reader = new FileReader();

                reader.onload = (e) => {
                    this.imageSrc = e.target.result;

                    loading = true;
                    this.requestUpdate();

                    if(enabledPersonCheck){
                        const img = document.getElementById('preview');
                        var spinnerContainer = document.getElementById('spinner');
                        spinnerContainer.classList.add('show-spinner');
                        var fileUploadButton = document.getElementById('file-upload-button');
                        fileUploadButton.classList.add('disabled');
                        var submitContainer = document.getElementById('submit');
                        submitContainer.classList.add('disabled');

                        console.log(this.advice[0])

                        setTimeout(() => {
                            cocoSsd.load().then(model => {
                                model.detect(img).then(predictions => {
                                    console.log('Predictions: ', predictions);
                                    // this.predictions = predictions[0].class
                                    // this.requestUpdate();

                                    var imageContains = document.getElementById('image-contains');
                                    this.foundClass = null;
                                    if(!!predictions && !!predictions[0]) {
                                        const isContainedInAdvice = this.advice.includes(predictions[0].class)
                                        this.foundClass = predictions[0].class;
                                        if (isContainedInAdvice) {
                                            this.predictions = "Consider if you think that this image could be used maliciously"
                                            imageContains.classList.remove('hidden');
                                        } else {
                                            this.predictions = "This image seems safe to upload"
                                            imageContains.classList.remove('hidden');
                                        }
                                        this.requestUpdate();
                                    } else {
                                        this.predictions = "This image seems safe to upload"
                                        imageContains.classList.add('hidden');
                                    }
                                    loading = false;
                                    spinnerContainer.classList.remove('show-spinner');
                                    fileUploadButton.classList.remove('disabled');
                                    submitContainer.classList.remove('disabled');
                                    responseText.classList.remove('hidden');
                                });
                            });
                        }, 500);
                    }
                }
                reader.readAsDataURL(event.target.files[0]);
            }
        });
    }

  async onClick() {
    if(loading) {
      return;
    }
    this.querySelector('input[type="file"]').showPicker();

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
            <h3 class="response hidden" id="responseText">
                
                <div id="image-contains">
                    This image contains a <span class="response-text">${this.foundClass}</span>.
                    <br><br>
                </div>
                
                <div class="response-text">${this.predictions}</div> </h3>
          </div>
          <input type="file" id="file-upload" name="${this.name}" value="Upload" hidden>
      </div>
    `;
  }
}

customElements.define('ui-file-upload-button', FileUploadButton)
