import fs from 'node:fs/promises';

/**
 * function to check if we have permission for that file
 * @param {string} path 
 * @returns boolean
 */

export async function checkAccess(path) {
  //it will throw an error if there are no access
  try {
    await fs.access(path)
    return true
  }catch(err){
    //to catch the permission issue
    return false;
  }
}

/**
 * function to check if the path that is passed is a file
 * @param {string} path 
 * @returns boolean
 */
export async function checkIfFile(path) {
  try {
    let stats = await fs.stat(path);
    //this will return a boolean if the path is a file
    return stats.isFile();

  }catch(err) {
    console.log(path +" is not a file: " +err )
  }
}
