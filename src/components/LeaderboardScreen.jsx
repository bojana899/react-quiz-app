import React, { useEffect, useState } from "react";
import { List, Card, Typography, Divider, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./LeaderboardScreen.css";

const { Title } = Typography;

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    const sortedLeaderboard = storedResults.sort((a, b) => b.score - a.score);
    setLeaderboard(sortedLeaderboard);
  }, []);

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="leaderboard-container">
      <Card className="leaderboard-card">
        <Button className="leaderboard-button" onClick={handleRestart}>
          Restart
        </Button>
        <Divider />
        <div className="leaderboard-content">
          <List
            itemLayout="horizontal"
            dataSource={leaderboard}
            renderItem={(item, index) => (
              <List.Item className="leaderboard-item">
                <List.Item.Meta
                  title={`${index + 1}. ${item.username}`}
                  description={`Score: ${item.score} | Date: ${item.date}`}
                />
              </List.Item>
            )}
            className="leaderboard-content"
          />
        </div>
      </Card>
    </div>
  );
};

export default LeaderboardScreen;
