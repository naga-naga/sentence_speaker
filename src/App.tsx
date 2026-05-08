import { useEffect, useMemo } from 'react';
import './App.css';
import { SentenceList } from './components/SentenceList';
import { SpeedControl } from './components/SpeedControl';
import { TextInput } from './components/TextInput';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useSpeech } from './hooks/useSpeech';
import { splitSentences } from './utils/splitSentences';

const SAMPLE_TEXT =
  "The quick brown fox jumps over the lazy dog. " +
  "How vexingly quick daft zebras jump! " +
  "Pack my box with five dozen liquor jugs. " +
  "Have you ever seen such a beautiful sunset? " +
  "I think today is going to be a wonderful day.";

export default function App() {
  const [text, setText] = useLocalStorage('ss-text', SAMPLE_TEXT);
  const [speed, setSpeed] = useLocalStorage('ss-speed', 1.0);

  const sentences = useMemo(() => splitSentences(text), [text]);
  const { speak, speakAll, stop, playingIndex } = useSpeech(speed);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLTextAreaElement) return;

      if (e.key === ' ') {
        e.preventDefault();
        playingIndex !== null ? stop() : speakAll(sentences);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = playingIndex !== null ? playingIndex + 1 : 0;
        if (next < sentences.length) speak(sentences[next], next);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (playingIndex ?? 1) - 1;
        if (prev >= 0) speak(sentences[prev], prev);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [playingIndex, sentences, speak, speakAll, stop]);

  return (
    <div className="container">
      <h1>Sentence Speaker</h1>

      <TextInput value={text} onChange={setText} />

      <div className="controls">
        <SpeedControl speed={speed} onSpeedChange={setSpeed} />
        {playingIndex !== null && (
          <span className="progress-label">{playingIndex + 1} / {sentences.length}</span>
        )}
        {playingIndex !== null ? (
          <button className="stop-button" onClick={stop}>
            ■ Stop
          </button>
        ) : (
          <button
            className="play-all-button"
            onClick={() => speakAll(sentences)}
            disabled={sentences.length === 0}
          >
            ▶▶ Play All
          </button>
        )}
      </div>

      <p className="shortcut-hint">Space: 全文再生 / 停止　←→: 前後の文</p>

      <SentenceList
        sentences={sentences}
        playingIndex={playingIndex}
        onPlay={(index) => speak(sentences[index], index)}
      />
    </div>
  );
}
