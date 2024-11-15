const imageService = require("../services/images");

// async function uploadImages(req, res) {
//   try {
//     console.log("req.file:", req.files);
//     console.log("req.body:", req.body);

//     // const { filename } = req.file;
//     const { filename } = req.files;
//     const filepath = `/uploads/${filename}`;
//     const userId = req.user._id;

//     const image = await imageService.uploadImage(userId, filename, filepath);

//     res.status(201).json({
//       message: "Image uploaded successfully",
//       image,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const serverUrl = `${req.protocol}://${req.get("host")}`;

    const images = req.files.map((file) => ({
      owner: req.user._id,
      filename: file.filename,
      filepath: `${serverUrl}/uploads/${file.filename}`,
    }));

    const savedImages = await imageService.uploadImages(images);
    res.status(201).json(savedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function getImages(req, res) {
  try {
    const userId = req.user._id;
    const images = await imageService.getUserImages(userId);

    res.status(200).json({ images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  uploadImages,
  getImages,
};
