import { useState } from 'react';

interface UseSpeechReturn {
  speak: (text: string, index: number) => void;
  speakAll: (sentences: string[]) => void;
  playingIndex: number | null;
}

export function useSpeech(speed: number): UseSpeechReturn {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  function speak(text: string, index: number) {
    window.speechSynthesis.cancel();
    setPlayingIndex(index);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = speed;
    utterance.onend = () => setPlayingIndex(null);
    utterance.onerror = () => setPlayingIndex(null);
    window.speechSynthesis.speak(utterance);
  }

  function speakAll(sentences: string[]) {
    window.speechSynthesis.cancel();

    function speakAt(index: number) {
      if (index >= sentences.length) {
        setPlayingIndex(null);
        return;
      }
      setPlayingIndex(index);
      const utterance = new SpeechSynthesisUtterance(sentences[index]);
      utterance.lang = 'en-US';
      utterance.rate = speed;
      utterance.onend = () => speakAt(index + 1);
      utterance.onerror = () => setPlayingIndex(null);
      window.speechSynthesis.speak(utterance);
    }

    speakAt(0);
  }

  return { speak, speakAll, playingIndex };
}
