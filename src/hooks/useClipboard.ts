import { useState } from 'react';

export const useClipboard = (delay: number = 1000) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string | null) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, delay);
  };

  return { copied, handleCopy };
};
