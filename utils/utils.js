//this file is for utility

const fs = require("fs");

/**
 * Process the files and converts to data64 object strings
 * @param {*} filesList list of files
 * @returns list of data64 strings for each image
 */
const processFiles = (filesList) => {
  if (filesList) {
    let images = [];
    for (let cfi of filesList) {
      const img64 = fs.readFileSync(cfi.path, { encoding: "base64" });
      images.push(img64);
    }
    return images;
  }
  return [];
}


const datearr = (i) => {
  let d = [];
  if(i){
    console.log(i);
  }
  return d;
}

module.exports = {
  processFiles,
  datearr
}