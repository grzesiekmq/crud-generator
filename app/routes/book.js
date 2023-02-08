
import express from "express";

import {
	create,
	findAll,
	findOne,
	update,
	remove,
	deleteAll,
} from "../controllers/book.js";
import { app } from "../../server.js";
export const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", remove);
router.delete("/", deleteAll);
