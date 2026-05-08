import { useMemo, useState } from 'react';
import './App.css';
import { SentenceList } from './components/SentenceList';
import { SpeedControl } from './components/SpeedControl';
import { TextInput } from './components/TextInput';
import { useSpeech } from './hooks/useSpeech';
import { splitSentences } from './utils/splitSentences';

const SAMPLE_TEXT =
  "The quick brown fox jumps over the lazy dog. " +
  "How vexingly quick daft zebras jump! " +
  "Pack my box with five dozen liquor jugs. " +
  "Have you ever seen such a beautiful sunset? " +
  "I think today is going to be a wonderful day.";

export default function App() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [speed, setSpeed] = useState(1.0);

  const sentences = useMemo(() => splitSentences(text), [text]);
  const { speak, speakAll, playingIndex } = useSpeech(speed);

  return (
    <div className="container">
      <h1>Sentence Speaker</h1>

      <TextInput value={text} onChange={setText} />

      <div className="controls">
        <SpeedControl speed={speed} onSpeedChange={setSpeed} />
        <button
          className="play-all-button"
          onClick={() => speakAll(sentences)}
          disabled={sentences.length === 0}
        >
          ▶▶ Play All
        </button>
      </div>

      <SentenceList
        sentences={sentences}
        playingIndex={playingIndex}
        onPlay={(index) => speak(sentences[index], index)}
      />
    </div>
  );
}
