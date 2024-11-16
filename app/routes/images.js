const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const multerMiddleware = require("../middleware/multerMiddleware");
const imageController = require("../controllers/images");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Upload images and get list of them
 */

/**
 * @swagger
 * /api/image/upload:
 *   post:
 *     summary: Upload images
 *     tags: [Images]
 *     description: Upload images to the server for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Images uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   owner:
 *                     type: string
 *                     description: User ID of the image owner.
 *                   filename:
 *                     type: string
 *                     description: Name of the uploaded file.
 *                   filepath:
 *                     type: string
 *                     description: URL of the uploaded file.
 *       400:
 *         description: No files uploaded.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/image:
 *   get:
 *     summary: Get user images
 *     tags: [Images]
 *     description: Retrieve all images uploaded by the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user-uploaded images.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       owner:
 *                         type: string
 *                         description: User ID of the image owner.
 *                       filename:
 *                         type: string
 *                         description: Name of the uploaded file.
 *                       filepath:
 *                         type: string
 *                         description: URL of the uploaded file.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/upload",
  authMiddleware,
  multerMiddleware,
  imageController.uploadImages
);
router.get("/", authMiddleware, imageController.getImages);

module.exports = router;
