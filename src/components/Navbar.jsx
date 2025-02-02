import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full bg-white px-4 py-3 md:py-4 flex items-center justify-between">
      <img 
        src="testlinelogo.png" 
        alt="Testline Logo" 
        className="h-8 md:h-10 object-contain" 
      />
      
      <a 
        href="https://play.google.com/store/apps/developer?id=Testline" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <button className="flex items-center bg-white border border-[#158e8c] text-black px-3 md:px-5 py-1 md:py-2 rounded hover:bg-[#158e8c] hover:text-white transition duration-300">
          <img 
            src="google-play.svg" 
            alt="Google Play" 
            className="h-4 md:h-5 w-4 md:w-5 mr-2" 
          />
          <span className="text-sm md:text-base">Download Now</span> 
        </button>
      </a>
    </div>
  );
};

export default Navbar;