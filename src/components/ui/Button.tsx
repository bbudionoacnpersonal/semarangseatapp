import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/classnames';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-accenture-purple text-white hover:bg-accenture-purple/90 focus-visible:ring-accenture-purple',
        secondary: 'bg-accenture-black text-white hover:bg-accenture-black/90 focus-visible:ring-accenture-black',
        outline: 'bg-transparent border border-accenture-gray-300 hover:bg-accenture-gray-100 text-accenture-gray-900',
        ghost: 'bg-transparent hover:bg-accenture-gray-100 text-accenture-gray-900',
        link: 'bg-transparent underline-offset-4 hover:underline text-accenture-purple hover:text-accenture-purple/90',
        destructive: 'bg-accenture-error text-white hover:bg-accenture-error/90 focus-visible:ring-accenture-error',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 px-3 rounded-md text-xs',
        lg: 'h-12 px-6 rounded-md text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };