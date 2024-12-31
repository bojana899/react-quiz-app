import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Row, Col } from 'antd'; 
import { QuizProvider } from './context/QuizContext';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import LeaderboardScreen from './components/LeaderboardScreen';

const { Header, Content, Footer } = Layout;

const App = () => (
  <QuizProvider>
    <Router>
      <Layout style={{ minHeight: '100vh', padding: 0 }}> 
        {/* <Header style={{ background: '#001529', color: '#fff', textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>Quiz App</h1>
        </Header> */}
        <Content style={{ padding: '50px 20px', backgroundColor: '#f0f2f5', flex: 1 }}> 
          <Row justify="center" style={{ height: '100%' }}>
            <Col xs={24} sm={22} md={18} lg={16} xl={12}>
              <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route path="/quiz" element={<QuizScreen />} />
                <Route path="/results" element={<ResultsScreen />} />
                <Route path="/leaderboard" element={<LeaderboardScreen />} />
              </Routes>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center', padding: '10px 0' }}>
          Quiz App ©2024 Created by Bojana Kalkov
        </Footer>
      </Layout>
    </Router>
  </QuizProvider>
);

export default App;
