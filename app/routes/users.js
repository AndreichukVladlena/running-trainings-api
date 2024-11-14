const express = require("express");
const userController = require("../controllers/users.js");

const router = express.Router();

router.post("/register", userController.create);
// router.get("/:id", userController.read);
router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

router.post("/login", userController.login);
router.get("/profile", userController.profile);
router.post("/logout", userController.logout);

module.exports = router;
