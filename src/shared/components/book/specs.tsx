import { BookSpec } from '@prisma/client';
import React from 'react';

interface Props {
  className?: string;
  specs: BookSpec[];
}

export const Specs: React.FC<Props> = ({ specs }) => {
  return (
    <div className='grid grid-cols-2 gap-4 text-sm'>
      {specs.map((spec) => (
        <div key={spec.id}>
          <span className='font-medium'>{spec.name}:</span>
          <p className='text-muted-foreground'>{spec.value}</p>
        </div>
      ))}
    </div>
  );
};
