import { key } from './keys.mjs';
import fetch from 'node-fetch';

async function fetchAPI(symbol) {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key['key']}`;
  let content;
  let resp = await fetch(url);
  if(resp.ok){
    content = resp.json();
  } else {
    console.log(`Status code: ${resp.status}`);
  }
  return content;
}

export {fetchAPI};