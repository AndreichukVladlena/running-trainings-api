const express = require("express");
const runController = require("../controllers/runRecords");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: RunRecords
 *   description: Track running trainings
 */

/**
 * @swagger
 * /api/run:
 *   post:
 *     summary: Create a new run record
 *     tags: [RunRecords]
 *     description: Add a new run record for the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               distance:
 *                 type: number
 *                 description: Distance covered in kilometers.
 *                 example: 5.2
 *               time:
 *                 type: string
 *                 description: Duration of the run in HH:mm:ss format.
 *                 example: 00:30:15
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the run.
 *                 example: 2024-11-15
 *     responses:
 *       201:
 *         description: Run record created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 distance:
 *                   type: number
 *                 time:
 *                   type: string
 *                 date:
 *                   type: string
 *       400:
 *         description: Bad request or validation error.
 */

/**
 * @swagger
 * /api/run:
 *   get:
 *     summary: Get all run records for the user
 *     tags: [RunRecords]
 *     description: Retrieve all run records associated with the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of run records for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   distance:
 *                     type: number
 *                   time:
 *                     type: string
 *                   date:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/run/weekly-report:
 *   get:
 *     summary: Get weekly run report
 *     tags: [RunRecords]
 *     description: Retrieve a report summarizing the user's runs for the past week.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Weekly run report.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDistance:
 *                   type: number
 *                   description: Total distance covered in the week.
 *                 totalTime:
 *                   type: string
 *                   description: Total time spent running in the week.
 *                 averagePace:
 *                   type: string
 *                   description: Average pace per kilometer in HH:mm:ss format.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/run/{id}:
 *   get:
 *     summary: Get a run record by ID
 *     tags: [RunRecords]
 *     description: Retrieve details of a specific run record by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the run record.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the requested run record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 distance:
 *                   type: number
 *                 time:
 *                   type: string
 *                 date:
 *                   type: string
 *       404:
 *         description: Run record not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/run/{id}:
 *   put:
 *     summary: Update a run record by ID
 *     tags: [RunRecords]
 *     description: Modify an existing run record by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the run record to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               distance:
 *                 type: number
 *                 description: Updated distance in kilometers.
 *               time:
 *                 type: string
 *                 description: Updated time in HH:mm:ss format.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Updated date of the run.
 *     responses:
 *       200:
 *         description: Run record updated successfully.
 *       404:
 *         description: Run record not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/run/{id}:
 *   delete:
 *     summary: Delete a run record by ID
 *     tags: [RunRecords]
 *     description: Remove a specific run record from the database.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the run record to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Run record deleted successfully.
 *       404:
 *         description: Run record not found.
 *       500:
 *         description: Internal server error.
 */

router.post("/", authMiddleware, runController.create);
router.get("/", authMiddleware, runController.readUsersRuns);
router.get("/weekly-report", authMiddleware, runController.getWeeklyReport);
router.get("/:id", authMiddleware, runController.readRunsById);
router.put("/:id", authMiddleware, runController.update);
router.delete("/:id", authMiddleware, runController.remove);

module.exports = router;
