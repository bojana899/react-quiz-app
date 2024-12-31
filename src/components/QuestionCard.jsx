import React, { useEffect, useState } from "react";
import "./QuestionCard.css";

const QuestionCard = ({
  question,
  handleAnswer,
  isAnswered,
  selectedOption,
  isLiked,
}) => {
  return (
    <div>
      <div className="question">{question.question}</div>
      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`option-button ${
              isAnswered
                ? selectedOption === option
                  ? isLiked
                    ? "correct"
                    : "incorrect"
                  : ""
                : ""
            }`}
            disabled={isAnswered}
          >
            {option}

            {isAnswered && selectedOption === option && (
              <span className="icon">{isLiked ? "👍" : "👎"}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
