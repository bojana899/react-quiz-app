import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Typography } from 'antd';
import './ResultsScreen.css';
import DefaultButton from './DefaultButton';

const { Title, Text } = Typography;

const ResultsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  const correctAnswers = score;
  const incorrectAnswers = total - score;

  const handleRestart = () => {
    navigate('/'); 
  };

  const handleViewLeaderboard = () => {
    navigate('/leaderboard'); 
  };

  return (
    <div className="results-container">
      <Card className="results-card">
        <Title level={2} className="results-title">Your Results</Title>
        <Text className="results-summary">You scored {score} out of {total}!</Text>

        <div className="results-details">
          <Text className="results-text">Correct Answers: {correctAnswers}</Text>
          <Text className="results-text">Incorrect Answers: {incorrectAnswers}</Text>
        </div>

        <div class="button-container">
          <DefaultButton onClick={handleRestart}>
            Restart
          </DefaultButton><span></span>
          <DefaultButton  onClick={handleViewLeaderboard}>
            Leaderboard
          </DefaultButton>
        </div>
      </Card>
    </div>
  );
};

export default ResultsScreen;
