/// <reference lib="webworker" />

import * as hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data}`;
  const response = hljs.highlightAuto(data, ['javascript']).value;
  postMessage(response);
});
