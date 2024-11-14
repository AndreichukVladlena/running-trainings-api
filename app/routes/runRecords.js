const express = require("express");
const runController = require("../controllers/runRecords");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, runController.create);
router.get("/", authMiddleware, runController.readUsersRuns);
router.get("/:id", authMiddleware, runController.readUsersRuns);
router.put("/:id", authMiddleware, runController.update);
router.delete("/:id", authMiddleware, runController.remove);

module.exports = router;
