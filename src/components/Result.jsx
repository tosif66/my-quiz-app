import React from 'react';


const Result = ({ score, numCorrect, numWrong, correctAnswerMark, negativeMark }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Result</h2>
      <div className="space-y-4">
        <p className="text-lg text-gray-700">
          Correct Answers: <span className="font-bold">{numCorrect}</span> × {correctAnswerMark} = <span className="font-bold">{(numCorrect * correctAnswerMark).toFixed(2)}</span>
        </p>
        <p className="text-lg text-gray-700">
          Wrong Answers: <span className="font-bold">{numWrong}</span> × {negativeMark} = <span className="font-bold">{(numWrong * negativeMark).toFixed(2)}</span> (deducted)
        </p>
        <p className="text-xl text-gray-800 mt-4">
          Final Score: <span className="font-bold">{score.toFixed(2)}</span>
        </p>
      </div>
      
      <div className="mt-8">
        <p className="text-lg text-gray-700 mb-4">
          Complete Test देने के लिए App Download करें।
        </p>
        <button
          className="px-6 py-3 bg-[#158e8c] text-white cursor-pointer rounded-lg hover:bg-[#158e8cda] transition duration-300"
          onClick={() => {
            
            window.open("https://play.google.com/store/apps/developer?id=Testline", "_blank");
          }}
        >
          Download Now
        </button>
      </div>
    </div>
  );
};

export default Result;
