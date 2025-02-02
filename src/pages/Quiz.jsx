import React, { useState, useEffect } from 'react';
import { fetchQuizData } from '../utils/api';
import Start from './Start';
import Questions from '../components/Questions';
import Navbar from '../components/Navbar';


const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  // Fetch quiz data from the API
  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizData();
        
        if (data && data.questions) {
          setQuizData(data);
        } else {
          setError("Invalid quiz data format");
        }
      } catch (error) {
        console.error('Error loading quiz data:', error);
        setError("Failed to load quiz data");
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

 
  

  // Handle start quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!quizData) {
    return <p>No quiz data available.</p>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {!quizStarted ? (
        <Start quiz={quizData} onStart={handleStartQuiz} />
      ) : (
        <Questions questions={quizData.questions}  />
      )}
    </div>
  );
};

export default Quiz;