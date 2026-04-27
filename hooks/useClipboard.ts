import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = async (text: string, id: string = 'default') => {
    await Clipboard.setStringAsync(text);
    setIsCopied(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setIsCopied(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return { isCopied, copyToClipboard };
};
