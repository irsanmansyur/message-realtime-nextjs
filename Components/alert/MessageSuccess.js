import React from 'react';
const MessageSuccess = ({ message, ...props }) => {
  return (
    <div className="message p-3 bg-green-400 rounded-lg shadow-sm text-white">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="px-3">
          <p className="text-bold text-2xl pb-1">{message}</p>
          {props.children}
        </div>
      </div>
    </div>

  );
};

export default MessageSuccess;