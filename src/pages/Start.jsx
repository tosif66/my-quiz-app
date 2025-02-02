import React, { useState, useEffect } from 'react';
import { BsDot } from 'react-icons/bs';
import { FaClock } from 'react-icons/fa';

const Start = ({ quiz, onStart }) => {
  const [remainingTime, setRemainingTime] = useState("00:00:00");

  useEffect(() => {
    if (!quiz?.end_time) {
      console.log("No end_time found in quiz data");
      return;
    }

    let timerInterval;

    const updateTimer = () => {
      const endTime = new Date(quiz.end_time).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setRemainingTime("00:00:00");
        clearInterval(timerInterval);
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setRemainingTime(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [quiz?.end_time]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[rgba(0,0,0,0.05)]">
      
      <div className="w-full bg-white py-6 px-4 md:py-8 md:px-6 text-center shadow-md mb-4 md:mb-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Welcome to Testline
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Testline is redefining how students prepare for competitive exams like REET, NEET, and State PSCs.
            With daily test targets, smart revision, and gamified routines, we make learning interactive,
            interesting, and impactful. Join Testline to build habits, retain concepts, and {' '}
            <span className="font-semibold text-gray-900">ace your confidence!</span>
          </p>
        </div>
      </div>

      
      <div className="w-full max-w-[95%] md:max-w-md mx-auto mb-3">
        <div className="flex items-center text-black font-semibold text-base md:text-lg">
          <BsDot className="text-3xl md:text-4xl animate-ping text-red-600" />
          <span className="ml-[-8px] md:ml-0">Live Test</span>
        </div>
      </div>

      
      <div className="w-full max-w-[95%] md:max-w-lg rounded-xl overflow-hidden shadow-lg">
        
        <div className="bg-[#2b275d] p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
            <p className="text-xs md:text-sm text-gray-300 font-medium">
              Duration: {quiz.duration} min
            </p>
            <div className="flex items-center text-green-400 font-medium text-sm md:text-base">
              <FaClock className="mr-2 text-sm" />
              {remainingTime || "Loading..."}
            </div>
          </div>
          <div className="mt-3 md:mt-4">
            <h1 className="text-sm md:text-base font-semibold text-white">
              {quiz.title}
            </h1>
            <p className="text-xs md:text-sm text-gray-200 mt-1">
              {quiz.topic}
            </p>
          </div>
        </div>

        
        <div className="bg-[rgba(0,0,0,0.05)] p-4 md:p-6 text-center">
          <button
            onClick={onStart}
            className="w-sm px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-[#158e8c] 
                    text-white rounded-3xl hover:bg-[#127a7a] transition-all duration-300
                    transform hover:scale-105 active:scale-95"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;