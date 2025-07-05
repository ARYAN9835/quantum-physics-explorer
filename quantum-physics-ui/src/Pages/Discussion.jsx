import React, { useEffect, useState } from "react";
import "../styles/discussion.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Discussion = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: "", description: "" });
  const [newAnswers, setNewAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showMyQuestions, setShowMyQuestions] = useState(false);
  const [replyInputs, setReplyInputs] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({ title: "", description: "" });
  const [editingAnswerId, setEditingAnswerId] = useState(null);
  const [editedAnswerContent, setEditedAnswerContent] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    } else {
      fetchQuestions();
    }
  }, [showMyQuestions]);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  const fetchQuestions = async () => {
    try {
      const res = await axiosInstance.get(
        showMyQuestions ? "/discussion/my" : "/discussion"
      );
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions", err);
    }
  };

  const handleAskQuestion = () => setShowModal(true);

  const handleSubmitQuestion = async () => {
    if (!newQuestion.title || !newQuestion.description) return;
    try {
      await axiosInstance.post("/discussion/ask", newQuestion);
      fetchQuestions();
      setShowModal(false);
      setNewQuestion({ title: "", description: "" });
    } catch (err) {
      console.error("Error posting question", err);
    }
  };

  const handleEditQuestion = async (id) => {
    try {
      await axiosInstance.patch(`/discussion/question/${id}`, editedQuestion);
      setEditingQuestionId(null);
      fetchQuestions();
    } catch (err) {
      console.error("Error editing question", err);
    }
  };

  const handleEditAnswer = async (id) => {
    try {
      await axiosInstance.patch(`/discussion/answer/${id}`, { content: editedAnswerContent });
      setEditingAnswerId(null);
      fetchQuestions();
    } catch (err) {
      console.error("Error editing answer", err);
    }
  };

  const handleAddAnswer = async (questionId) => {
    const text = newAnswers[questionId];
    if (!text) return;
    try {
      await axiosInstance.post(`/discussion/${questionId}/answer`, {
        content: text,
      });
      setNewAnswers({ ...newAnswers, [questionId]: "" });
      fetchQuestions();
    } catch (err) {
      console.error("Error submitting answer", err);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await axiosInstance.delete(`/discussion/question/${id}`);
      fetchQuestions();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting question");
    }
  };

  const handleDeleteAnswer = async (id) => {
    try {
      await axiosInstance.delete(`/discussion/answer/${id}`);
      fetchQuestions();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting answer");
    }
  };

  const handleLike = async (answerId) => {
    try {
      await axiosInstance.patch(`/discussion/answer/${answerId}/like`);
      fetchQuestions();
    } catch (err) {
      console.error("Error liking answer", err);
    }
  };

  const handleReply = async (answerId) => {
    const content = replyTexts[answerId];
    if (!content) return;
    try {
      await axiosInstance.post(`/discussion/answer/${answerId}/reply`, { content });
      setReplyTexts({ ...replyTexts, [answerId]: "" });
      setReplyInputs({ ...replyInputs, [answerId]: false });
      fetchQuestions();
    } catch (err) {
      console.error("Error replying", err);
    }
  };

  return (
    <div className="discussion-page">
      <header className="discussion-header">
        <h2>Quantum Forum</h2>
        <button onClick={handleAskQuestion}>Ask a Question</button>
        <button onClick={() => setShowMyQuestions(false)}>All Questions</button>
        <button onClick={() => setShowMyQuestions(true)}>My Questions</button>
      </header>

      <div className="discussion-list">
        {questions.map((q) => (
          <div key={q._id} className="question-card">
            {editingQuestionId === q._id ? (
              <>
                <input
                  type="text"
                  value={editedQuestion.title}
                  onChange={(e) => setEditedQuestion({ ...editedQuestion, title: e.target.value })}
                />
                <textarea
                  value={editedQuestion.description}
                  onChange={(e) => setEditedQuestion({ ...editedQuestion, description: e.target.value })}
                ></textarea>
                <button onClick={() => handleEditQuestion(q._id)}>Save</button>
                <button onClick={() => setEditingQuestionId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{q.title}</h3>
                <p>{q.description}</p>
                <small>Asked by: {q.askedBy?.username}</small>
                {q.askedBy?._id === user._id && (
                  <>
                    <button onClick={() => handleDeleteQuestion(q._id)} className="delete-btn">
                      Delete Question
                    </button>
                    <button onClick={() => {
                      setEditingQuestionId(q._id);
                      setEditedQuestion({ title: q.title, description: q.description });
                    }}>Edit</button>
                  </>
                )}
              </>
            )}

            <div className="answer-section">
              <h4>Answers:</h4>
              {q.answers.length === 0 ? (
                <p className="no-answers">No answers yet. Be the first!</p>
              ) : (
                q.answers.map((ans) => (
                  <div key={ans._id} className="answer">
                    {editingAnswerId === ans._id ? (
                      <>
                        <textarea
                          value={editedAnswerContent}
                          onChange={(e) => setEditedAnswerContent(e.target.value)}
                        ></textarea>
                        <button onClick={() => handleEditAnswer(ans._id)}>Save</button>
                        <button onClick={() => setEditingAnswerId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <p>{ans.content}</p>
                        <small>
                          — {ans.answeredBy?.username} · answered {formatDistanceToNow(new Date(ans.createdAt), { addSuffix: true })}
                        </small>
                        <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                          <button onClick={() => handleLike(ans._id)} className="like-btn">
                            👍 {ans.likes?.length || 0}
                          </button>
                          {ans.answeredBy?._id === user._id && (
                            <>
                              <button onClick={() => handleDeleteAnswer(ans._id)} className="delete-btn">
                                Delete
                              </button>
                              <button onClick={() => {
                                setEditingAnswerId(ans._id);
                                setEditedAnswerContent(ans.content);
                              }}>Edit</button>
                            </>
                          )}
                          <button onClick={() => setReplyInputs({ ...replyInputs, [ans._id]: !replyInputs[ans._id] })}>
                            Reply
                          </button>
                        </div>
                      </>
                    )}

                    {ans.replies?.map((rep) => (
                      <div key={rep._id} className="reply">
                        <p style={{ marginLeft: "20px" }}> {rep.content}</p>
                        <small style={{ marginLeft: "20px" }}> {rep.repliedBy?.username}</small>
                      </div>
                    ))}

                    {replyInputs[ans._id] && (
                      <div>
                        <textarea
                          placeholder="Write your reply..."
                          value={replyTexts[ans._id] || ""}
                          onChange={(e) =>
                            setReplyTexts({ ...replyTexts, [ans._id]: e.target.value })
                          }
                        ></textarea>
                        <button onClick={() => handleReply(ans._id)}>Submit Reply</button>
                      </div>
                    )}
                  </div>
                ))
              )}

              <textarea
                placeholder="Write your answer..."
                value={newAnswers[q._id] || ""}
                onChange={(e) =>
                  setNewAnswers({ ...newAnswers, [q._id]: e.target.value })
                }
              ></textarea>
              <button onClick={() => handleAddAnswer(q._id)}>Submit Answer</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Ask a Question</h3>
            <input
              type="text"
              placeholder="Title..."
              value={newQuestion.title}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, title: e.target.value })
              }
            />
            <textarea
              placeholder="Describe your question..."
              value={newQuestion.description}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, description: e.target.value })
              }
            ></textarea>
            <button onClick={handleSubmitQuestion}>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;
