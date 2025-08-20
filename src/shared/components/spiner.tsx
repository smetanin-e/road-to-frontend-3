import { Loader2 } from 'lucide-react';
import React from 'react';
import { cn } from '@/shared/lib';

interface Props {
  className?: string;
}
type SpinnerProps = React.SVGProps<SVGSVGElement>;

export const Spinner: React.FC<Props> = ({ className, ...props }: SpinnerProps) => {
  return (
    <Loader2 className={cn('h-4 w-4 animate-spin text-muted-foreground', className)} {...props} />
  );
};
