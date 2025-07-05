import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

// POST /api/discussion/ask
export const askQuestion = async (req, res, next) => {
  try {
    const newQ = new Question({
      title: req.body.title,
      description: req.body.description,
      askedBy: req.userId,
    });
    const saved = await newQ.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// POST /api/discussion/:id/answer
export const answerQuestion = async (req, res, next) => {
  try {
    const answer = new Answer({
      content: req.body.content,
      answeredBy: req.userId,
      question: req.params.id,
    });
    const saved = await answer.save();

    await Question.findByIdAndUpdate(req.params.id, {
      $push: { answers: saved._id },
    });

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// GET /api/discussion/
export const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find()
      .populate("askedBy", "username")
      .populate({
        path: "answers",
        populate: [
          { path: "answeredBy", select: "username" },
          { path: "replies.repliedBy", select: "username" }
        ]
      });
    res.status(200).json(questions);
  } catch (err) {
    next(err);
  }
};

// GET /api/discussion/my
export const getMyQuestions = async (req, res, next) => {
  try {
    const myQ = await Question.find({ askedBy: req.userId })
      .populate("askedBy", "username")
      .populate({
        path: "answers",
        populate: [
          { path: "answeredBy", select: "username" },
          { path: "replies.repliedBy", select: "username" }
        ]
      });
    res.status(200).json(myQ);
  } catch (err) {
    next(err);
  }
};


export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    console.log("Question ID:", question._id);
    console.log("Question askedBy:", question.askedBy);
    console.log("req.userId from token:", req.userId);

    if (!question.askedBy || !req.userId) {
      return res.status(500).json({ message: "Invalid user or question ownership" });
    }

    if (question.askedBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own question" });
    }

    const deletedAnswers = await Answer.deleteMany({ question: question._id });
    await Question.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      message: "Question and its answers deleted successfully",
      deletedAnswersCount: deletedAnswers.deletedCount
    });
  } catch (err) {
    next(err);
  }
};


// DELETE /api/discussion/answer/:id
export const deleteAnswer = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    if (!answer.answeredBy) return res.status(500).json({ message: "answeredBy is undefined in answer" });
    if (!req.userId) return res.status(401).json({ message: "Missing userId from token" });

    if (answer.answeredBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own answer" });
    }

    await Question.findByIdAndUpdate(answer.question, {
      $pull: { answers: answer._id }
    });

    await Answer.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/discussion/answer/:id/like
export const toggleLikeAnswer = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    const userId = req.userId; 
    const liked = answer.likes.includes(userId);

    if (liked) {
      answer.likes.pull(userId);
    } else {
      answer.likes.push(userId);
    }

    await answer.save();
    res.status(200).json({ message: liked ? "Unliked" : "Liked", likes: answer.likes.length });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/discussion/question/:id
export const editQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    if (question.askedBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only edit your own question" });
    }

    question.title = req.body.title || question.title;
    question.description = req.body.description || question.description;
    await question.save();

    res.status(200).json({ message: "Question updated successfully", question });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/discussion/answer/:id
export const editAnswer = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    if (answer.answeredBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only edit your own answer" });
    }

    answer.content = req.body.content || answer.content;
    await answer.save();

    res.status(200).json({ message: "Answer updated successfully", answer });
  } catch (err) {
    next(err);
  }
};

// reply to answer 
export const replyToAnswer = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    const reply = {
      content: req.body.content,
      repliedBy: req.userId,
    };

    answer.replies.push(reply);
    await answer.save();
    res.status(200).json({ message: "Reply added successfully", reply });
  } catch (err) {
    next(err);
  }
};

