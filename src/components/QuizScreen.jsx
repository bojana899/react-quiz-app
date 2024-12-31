import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_COUNTRY_DATA } from "../graphql/queries";
import { generateQuestions } from "../utils/questionGenerator";
import { Button, Card, Spin, Progress, Modal } from "antd"; 
import QuestionCard from "./QuestionCard";
import { useNavigate } from "react-router-dom";
import "./QuizScreen.css";
import { useRef } from "react";

const QuizScreen = () => {
  const { loading, error, data } = useQuery(FETCH_COUNTRY_DATA);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); 
  const [isLiked, setIsLiked] = useState(false); 
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (data) {
      const randomQuestions = generateQuestions(data.countries);
      setQuestions(randomQuestions);
    }
  }, [data]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          handleAnswer(null); 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); 
  }, [currentQuestion]);
  

  const saveResultToLocalStorage = (newScore) => {
    const username = prompt("Enter your name:");
    const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    const updatedResults = [
      ...storedResults,
      { username, score: newScore, date: new Date().toLocaleString() },
    ];
    localStorage.setItem("quizResults", JSON.stringify(updatedResults));
  };

  const handleAnswer = (selectedOption) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const current = questions[currentQuestion];
    let isCorrect = false;
  
    if (selectedOption && selectedOption === current.answer) {
      setScore((prev) => prev + 1);
      isCorrect = true;
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === currentQuestion
          ? { ...question, isAnswered: true, selectedOption, isCorrect }
          : question
      )
    );
  
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setTimer(30); 
        setSelectedOption(null); 
      } else {
        setIsModalVisible(true); 
      }
    }, 2000);
  };
  
 
  const handleModalOk = () => {
    saveResultToLocalStorage(score);
    navigate("/results", { state: { score: score, total: questions.length } }); 
  };

  const handleModalCancel = () => {
    navigate("/"); 
  };

  if (loading)
    return (
      <Spin size="large" style={{ textAlign: "center", marginTop: "50px" }} />
    );
  if (error) return <p>Error fetching questions.</p>;

  return (
    <div className="quiz-container">
      <Card className="quiz-card">
        <h3>
          Question {currentQuestion + 1} of {questions.length}
        </h3>

        {questions.length > 0 && (
          <div className="question-card-container">
            <QuestionCard
              key={currentQuestion} 
              question={questions[currentQuestion]} 
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              handleAnswer={handleAnswer} 
              isAnswered={questions[currentQuestion]?.isAnswered}
              selectedOption={questions[currentQuestion]?.selectedOption} 
              isLiked={isLiked} 
            />
          </div>
        )}

        <Progress
          percent={((currentQuestion + 1) / questions.length) * 100}
          status="active"
          className="progress-bar"
          strokeColor="#0a7b1b"
        />

        <div className="timer">Time Left: {timer} seconds</div>

        <div className="navigation-buttons">
          <Button
            onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
            disabled={currentQuestion === 0}
            className="navigation-button"
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentQuestion((prev) =>
                Math.min(prev + 1, questions.length - 1)
              )
            }
            disabled={currentQuestion === questions.length - 1}
            style={{ marginLeft: "10px" }}
            className="navigation-button"
          >
            Next
          </Button>
        </div>
      </Card>

      <Modal
        title="Quiz Completed!"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={
          <div className="modal-footer-container">
            <Button key="restart" onClick={handleModalCancel} className="custom-modal-btn">
              Restart
            </Button>
            <Button key="viewResults" onClick={handleModalOk} className="custom-modal-btn">
              Results
            </Button>
          </div>
        }
      >
        <p>
          Your score is {score} out of {questions.length}!
        </p>
      </Modal>
    </div>
  );
};

export default QuizScreen;
