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
  // 世代カウンター: cancel() 後に非同期で発火する stale な onerror/onend が
  // 新しい playingIndex を上書きしないようにするため
  const genRef = useRef(0);

  function stop() {
    cancelledRef.current = true;
    genRef.current++;
    window.speechSynthesis.cancel();
    setPlayingIndex(null);
  }

  function speak(text: string, index: number) {
    cancelledRef.current = true;
    genRef.current++;
    window.speechSynthesis.cancel();
    cancelledRef.current = false;

    const thisGen = genRef.current;
    setPlayingIndex(index);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = speed;
    utterance.onend = () => { if (genRef.current === thisGen) setPlayingIndex(null); };
    utterance.onerror = () => { if (genRef.current === thisGen) setPlayingIndex(null); };
    window.speechSynthesis.speak(utterance);
  }

  function speakAll(sentences: string[]) {
    cancelledRef.current = false;
    genRef.current++;
    window.speechSynthesis.cancel();

    const thisGen = genRef.current;

    function speakAt(index: number) {
      if (cancelledRef.current || genRef.current !== thisGen) { setPlayingIndex(null); return; }
      if (index >= sentences.length) { setPlayingIndex(null); return; }
      setPlayingIndex(index);
      const utterance = new SpeechSynthesisUtterance(sentences[index]);
      utterance.lang = 'en-US';
      utterance.rate = speed;
      utterance.onend = () => { if (genRef.current === thisGen) speakAt(index + 1); };
      utterance.onerror = () => { if (genRef.current === thisGen) setPlayingIndex(null); };
      window.speechSynthesis.speak(utterance);
    }

    speakAt(0);
  }

  return { speak, speakAll, stop, playingIndex };
}
