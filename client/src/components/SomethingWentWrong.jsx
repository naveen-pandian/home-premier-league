import React from "react";

const SomethingWentWrong = () => {
  return (
    <div className="max-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-white text-center px-6" style={{paddingTop: "150px"}}>

      {/* Icon */}
      <div className="bg-red-100 p-6 rounded-full shadow-md animate-bounce">
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#dc2626"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-red-600 mt-6">
        Oops! Something went wrong
      </h1>

      {/* Description */}
      <p className="text-gray-500 mt-3 max-w-md">
        We’re having trouble loading this page. Please try again or come back later.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">

        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          Refresh
        </button>
      </div>

      {/* Optional footer */}
      <p className="text-xs text-gray-400 mt-8">
        Error Code: 500
      </p>
    </div>
  );
};

export default SomethingWentWrong;