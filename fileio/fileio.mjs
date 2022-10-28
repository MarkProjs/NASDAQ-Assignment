import fs from 'node:fs/promises';
import * as checkFile from './checkFile.mjs';

async function readFile(path) {
  if(await checkFile.checkAccess(path)) {
    if (await checkFile.checkIfFile(path)) {
      try {
        let data = fs.readFile(path, "utf-8");
        return data;
      }catch(err) {
        console.error(err);
      }
          
    }
    throw new Error("Something went wrong when trying to read the file");
  }
}

/**
 * function that parse the JSON into object
 * @param {string} path 
 * @returns object
 */
async function readJSON(path) {
  try {
    let data = await readFile(path);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return "";
  }
}

export {readFile, readJSON}