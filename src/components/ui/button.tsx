// src/components/ui/button.tsx
import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors 
          ${size === 'sm' ? 'h-8 px-3 text-sm' : size === 'lg' ? 'h-12 px-6' : 'h-10 px-4'} 
          ${variant === 'ghost' ? 'hover:bg-gray-100 dark:hover:bg-gray-800' : 
            variant === 'outline' ? 'border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800' :
            'bg-blue-600 text-white hover:bg-blue-700'} 
          ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";