import { Router } from "express";
import {
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAllAuthors,
} from "./author.controller";

const router = Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
