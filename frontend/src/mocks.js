import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

const defaultMessages = [
  {messageText: 'message one', imageUrl: '/src/assets/sample.png'},
  {messageText: 'message two', imageUrl: '/src/assets/example.png'},
];

const uploadedFiles = {};

let messages = structuredClone(defaultMessages);

export const worker = setupWorker(
  http.get('/messages', () => HttpResponse.json(messages)),

  http.post('/messages', async ({ request }) => {
    const formData = await request.formData();

    const file = formData.get('file');
    uploadedFiles[file.name] = file;
    
    messages.push({ messageText: formData.get('message-text'), imageUrl: `http://206.189.3.8:8080/obfuscate` });

    worker.use(http.get('/messages', () => HttpResponse.json(messages)));

    return HttpResponse.json(undefined, { status: 200 });
  }),

  http.get('/uploaded-images/:imageName', async ({ params}) => {
    const file = uploadedFiles[params.imageName];

    return HttpResponse.arrayBuffer(await file.arrayBuffer(), {
      headers: {
        'Content-Type': file.type,
      }
    });
  }),
);

worker.start();
