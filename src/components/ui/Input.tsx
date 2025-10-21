import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type InputProps = {
  id: string;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, placeholder, error, required = false, className = '', type = 'text', onChange, value, disabled }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-gray-800 text-base mb-1">
            {label} {required && <span className="text-leboncoin-button">*</span>}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'w-full px-4 py-3 border rounded-lg text-gray-800 transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-leboncoin focus:border-transparent',
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
            error ? 'border-red-500' : 'border-gray-300',
            className
          )}
        />
        {error && (
          <div className="flex items-center mt-1 text-red-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg\" className="h-4 w-4 mr-1\" viewBox="0 0 20 20\" fill="currentColor">
              <path fillRule="evenodd\" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z\" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;