import { useEffect, useRef } from 'react';

interface SentenceItemProps {
  text: string;
  index: number;
  isPlaying: boolean;
  onPlay: (index: number) => void;
}

export function SentenceItem({ text, index, isPlaying, onPlay }: SentenceItemProps) {
  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isPlaying) {
      liRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isPlaying]);

  return (
    <li ref={liRef} className={`sentence-item${isPlaying ? ' playing' : ''}`}>
      <div className="sentence-item-row">
        <button
          className="play-button"
          onClick={() => onPlay(index)}
          aria-label={isPlaying ? 'Playing' : 'Play'}
        >
          {isPlaying ? '■' : '▶'}
        </button>
        <span className="sentence-text">{text}</span>
      </div>
    </li>
  );
}
