import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  content: String,
  repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const AnswerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  replies: [ReplySchema],
}, { timestamps: true });

export default mongoose.model("Answer", AnswerSchema);

