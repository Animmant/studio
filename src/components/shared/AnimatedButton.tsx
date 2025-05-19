import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          'transition-all duration-300 ease-in-out transform hover:scale-105',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
          variant === 'default' || !variant ? 'hover:bg-primary/90 focus:ring-primary' : '',
          variant === 'accent' ? 'bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent' : '',
          className
        )}
        variant={variant === 'accent' ? undefined : variant} // Pass shadcn variants, unless it's our custom 'accent'
        {...props}
      >
        {children}
      </Button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
