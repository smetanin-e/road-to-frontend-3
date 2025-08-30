'use client';
import React, { useId } from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
interface Props {
  onChange: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  const id = useId();
  return (
    <AddressSuggestions
      token='ebee392e7afb76ddbbfee17817cf7380b23fc508'
      onChange={(data) => onChange?.(data?.value)}
      uid={id}
      inputProps={{
        className:
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-smfocus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      }}
    />
  );
};
