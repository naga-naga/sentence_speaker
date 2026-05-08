import { useRef, useState } from 'react';

interface UseSpeechReturn {
  speak: (text: string, index: number) => void;
  speakAll: (sentences: string[]) => void;
  stop: () => void;
  playingIndex: number | null;
}

export function useSpeech(speed: number): UseSpeechReturn {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const cancelledRef = useRef(false);

  function stop() {
    cancelledRef.current = true;
    window.speechSynthesis.cancel();
    setPlayingIndex(null);
  }

  function speak(text: string, index: number) {
    cancelledRef.current = true;  // 実行中の speakAll チェーンを中断
    window.speechSynthesis.cancel();
    cancelledRef.current = false; // この単文再生は中断しない
    setPlayingIndex(index);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = speed;
    utterance.onend = () => setPlayingIndex(null);
    utterance.onerror = () => setPlayingIndex(null);
    window.speechSynthesis.speak(utterance);
  }

  function speakAll(sentences: string[]) {
    cancelledRef.current = false;
    window.speechSynthesis.cancel();

    function speakAt(index: number) {
      if (cancelledRef.current) { setPlayingIndex(null); return; }
      if (index >= sentences.length) { setPlayingIndex(null); return; }
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

  return { speak, speakAll, stop, playingIndex };
}
