import { SentenceItem } from './SentenceItem';

interface SentenceListProps {
  sentences: string[];
  playingIndex: number | null;
  onPlay: (index: number) => void;
}

export function SentenceList({ sentences, playingIndex, onPlay }: SentenceListProps) {
  if (sentences.length === 0) {
    return <p className="empty-message">No sentences yet. Enter some text above.</p>;
  }

  return (
    <ol className="sentence-list">
      {sentences.map((text, index) => (
        <SentenceItem
          key={index}
          text={text}
          index={index}
          isPlaying={playingIndex === index}
          onPlay={onPlay}
        />
      ))}
    </ol>
  );
}
