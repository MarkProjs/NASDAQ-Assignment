import key from './keys.mjs';
import * as fetch from 'node-fetch';

export function fetchAPI(symbol) {
  let content;
  fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key.key}`)
    .then((res)=>{
      if (res.ok) {
        content = res.json();
      }else {
        throw new Error ("Status code: " + response.status);
      }
    });
  return content;
}