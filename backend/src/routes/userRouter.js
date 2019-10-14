const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.show);

router.post("/", userController.store);

router.delete("/:nickname", userController.delete);

router.get("/:id", userController.index);

router.put("/:id", userController.update);

module.exports = router;
