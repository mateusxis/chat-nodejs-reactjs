import { Router } from "express";
import { show, index, store, update, remove } from "../controllers/messageController.js";

const router = Router();

router.get("/", show);
router.post("/", store);
router.get("/:id", index);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
