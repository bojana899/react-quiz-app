import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import DefaultButton from './DefaultButton';
import './WelcomeScreen.css'; 

const { Title } = Typography;

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <Row className="wrapper">
      <Col className="card-wrapper">
        <Card className="card" bordered={false} hoverable>
          <div className="fade-in">
            <Title className="title" level={2}>
              Welcome to the Quiz
            </Title>
          </div>
          <div className="fade-in-delay">
            <p className="subtitle">
              Test your knowledge with our fun and educational quiz!
            </p>
          </div>
          <div className="fade-in-delay-2">
            <DefaultButton onClick={() => navigate('/quiz')} className="button">
              Start Quiz
            </DefaultButton>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default WelcomeScreen;
