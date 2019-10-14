const express = require("express");

const messageController = require("../controllers/messageController");

const router = express.Router();

router.get("/", messageController.show);

router.post("/", messageController.store);

router.delete("/:id", messageController.delete);

router.get("/:id", messageController.index);

router.put("/:id", messageController.update);

module.exports = router;
