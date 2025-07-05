import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  askQuestion,
  answerQuestion,
  getAllQuestions,
  getMyQuestions,
  deleteQuestion,
  deleteAnswer,
  toggleLikeAnswer,
  editAnswer,
  editQuestion,
  replyToAnswer
} from "../controllers/discussion.js";

const router = express.Router();

router.post("/ask", verifyToken, askQuestion);
router.post("/:id/answer", verifyToken, answerQuestion);
router.get("/", getAllQuestions);
router.get("/my", verifyToken, getMyQuestions);
router.delete("/question/:id", verifyToken, deleteQuestion);
router.delete("/answer/:id", verifyToken, deleteAnswer);
router.patch("/answer/:id/like", verifyToken, toggleLikeAnswer);
router.patch("/question/:id", verifyToken, editQuestion);
router.patch("/answer/:id", verifyToken, editAnswer);
router.post("/answer/:id/reply", verifyToken, replyToAnswer);

export default router;
