import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(
  http.get('/messages', () => HttpResponse.json([
    {messageText: 'message one', imageUrl: '/src/assets/sample.png'},
    {messageText: 'message two', imageUrl: '/src/assets/example.png'},
  ]))
);

worker.start({ waitUntilReady: true });
