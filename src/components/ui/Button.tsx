import React from 'react';
import { cn } from '../../utils/cn';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        variant === 'primary' && 'bg-leboncoin-button text-white hover:bg-leboncoin-button-hover focus:ring-leboncoin',
        variant === 'outline' && 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-gray-500',
        disabled && 'opacity-50 cursor-not-allowed',
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;