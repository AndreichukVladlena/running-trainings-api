const express = require("express");
const runController = require("../controllers/runRecords");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, runController.create);
router.get("/", authMiddleware, runController.readUsersRuns);
router.get("/weekly-report", authMiddleware, runController.getWeeklyReport);
router.get("/:id", authMiddleware, runController.readRunsById);
router.put("/:id", authMiddleware, runController.update);
router.delete("/:id", authMiddleware, runController.remove);

module.exports = router;
