import key from './keys.mjs';

export async function fetchAPI(symbol) {
  let url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key.key}`;
  let response = await fetch(url);
  let content;
  if (response.ok) {
    content = await response.json();
  }else {
    throw new Error ("Status code: " + response.status);
  }
 return content;
}