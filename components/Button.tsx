import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-rose-500 text-white hover:bg-rose-600 shadow-lg hover:shadow-rose-500/30",
    secondary: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};