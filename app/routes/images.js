const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");
const imageController = require("../controllers/images");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  multerMiddleware,
  imageController.uploadImages
);
router.get("/", authMiddleware, imageController.getImages);

module.exports = router;
