/**
 * Process the files and converts to data64 object strings
 * @param {*} filesList list of files
 * @returns list of data64 strings for each image
 */
//this file is for utility

const fs = require("fs");

const cloudinary = require("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});
// const processFiles = (filesList) => {
//   if (filesList) {
//     let images = [];
//     for (let cfi of filesList) {
//       const img64 = fs.readFileSync(cfi.path, { encoding: "base64" });
//       images.push(img64);
//     }
//     return images;
//   }
//   return [];
// }

const processFiles = async (filesList) => {
  let images = [];
  if(filesList)
  {
    try{
      for(let cfi of filesList) {
        const result = await cloudinary.uploader.upload(cfi.path);
          images.push(result.secure_url);
      }
    }catch (error){
      console.log(error.message);
    }
    return images;
  }
  else
    return [];
}

module.exports = {
  processFiles
}