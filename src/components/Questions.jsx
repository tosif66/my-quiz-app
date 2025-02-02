import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timer from './Timer';
import Result from './Result';

const Questions = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState(0);

  const correctAnswerMark = parseFloat("4.0");
  const negativeMark = parseFloat("1.0");

  const handleAnswerSelect = (option) => {
    if (selectedAnswers[currentQuestion]) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = option;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    setDirection(1);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const answered = selectedAnswers[currentQuestion] !== undefined;
  const submittedAnswer = selectedAnswers[currentQuestion];
  const correctOption = questions[currentQuestion].options.find(opt => opt.is_correct);
  const isSubmittedWrong = answered && submittedAnswer && !submittedAnswer.is_correct;

  const numCorrect = selectedAnswers.filter(answer => answer?.is_correct).length;
  const numAnswered = selectedAnswers.filter(answer => answer !== undefined).length;
  const numWrong = numAnswered - numCorrect;
  const score = (numCorrect * correctAnswerMark) - (numWrong * negativeMark);

  
  const fadeSlideVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -50 : 50,
      transition: { duration: 0.3 },
    }),
  };

  if (showResult) {
    return (
      <div className="bg-[rgb(72,72,255)] min-h-screen flex items-center justify-center p-4">
        <Result 
          score={score} 
          numCorrect={numCorrect} 
          numWrong={numWrong}
          correctAnswerMark={correctAnswerMark}
          negativeMark={negativeMark}
        />
      </div>
    );
  }

  return (
    <div className="bg-[rgb(72,72,255)] min-h-screen flex flex-col items-center justify-center p-4">
      
      <div className="mb-4 w-full max-w-lg text-center">
        <Timer initialTime={15 * 60} />
      </div>

      
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-lg min-h-[500px] md:min-h-[600px] flex flex-col justify-between relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={fadeSlideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="text-base md:text-lg font-bold text-gray-800 mb-4 md:mb-6">
              {questions[currentQuestion].description}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = submittedAnswer?.id === option.id;
                let buttonClasses =
                  'w-full p-2 md:p-3 text-sm md:text-base cursor-pointer text-left border rounded-lg md:rounded-full transition duration-300';
                if (answered && isSelected) {
                  buttonClasses += option.is_correct
                    ? ' bg-green-200 text-green-800'
                    : ' bg-[#fa1111] text-white';
                } else {
                  buttonClasses += ' bg-white text-gray-800 hover:bg-blue-50';
                }
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={answered}
                    className={buttonClasses}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {`${index + 1}. ${option.description}`}
                  </motion.button>
                );
              })}
            </div>

            {isSubmittedWrong && correctOption && (
              <motion.div
                className="mt-6 p-3 md:p-4 bg-green-100 text-green-800 rounded-lg text-sm md:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Correct Answer: {correctOption.description}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 md:mt-6 flex items-center justify-between gap-2">
          {currentQuestion > 0 ? (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 md:px-6 md:py-2 text-sm md:text-base bg-[#8e44ad] text-white rounded-lg hover:bg-[#7d3c98] transition duration-300"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

          <span className="text-sm md:text-base text-gray-800 font-semibold">
            {currentQuestion + 1} / {questions.length}
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-2 md:px-6 md:py-2 text-sm md:text-base bg-[#438afe] text-white rounded-lg hover:bg-[#3a79d8] transition duration-300"
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
