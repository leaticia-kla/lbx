import React from 'react';

type DividerProps = {
  text: string;
  className?: string;
};

const Divider = ({ text, className = '' }: DividerProps) => {
  return (
    <div className={`flex items-center my-6 ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="px-4 text-gray-500">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default Divider;