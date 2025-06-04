import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/classnames';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-accenture-gray-100 text-accenture-gray-800',
        primary: 'bg-accenture-purple bg-opacity-10 text-accenture-purple',
        secondary: 'bg-accenture-gray-800 bg-opacity-10 text-accenture-gray-800',
        success: 'bg-accenture-success bg-opacity-10 text-accenture-success',
        warning: 'bg-accenture-warning bg-opacity-10 text-accenture-warning',
        error: 'bg-accenture-error bg-opacity-10 text-accenture-error',
        outline: 'bg-transparent border border-current',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };