const Image = require("../models/Image");

async function uploadImages(images) {
  return await Image.insertMany(images);
}

async function getUserImages(userId) {
  return await Image.find({ owner: userId });
}

module.exports = {
  uploadImages,
  getUserImages,
};
