import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui';
import { Author } from '@prisma/client';
import { authorInitials } from '@/shared/lib';

interface Props {
  className?: string;
  author: Author;
}

export const AuthorInfo: React.FC<Props> = ({ author }) => {
  const initials = authorInitials(author.name);

  return (
    <div className='flex items-start gap-4'>
      <Avatar className='h-16 w-16'>
        <AvatarImage src='/placeholder.svg?height=64&width=64' />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className='font-semibold text-lg'>{author.name}</h3>
        <p className='text-sm text-muted-foreground mb-2'>({author.yearsOfLife})</p>
        <p className='text-muted-foreground leading-relaxed'>{author.description}</p>
      </div>
    </div>
  );
};
