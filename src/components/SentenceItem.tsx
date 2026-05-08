interface SentenceItemProps {
  text: string;
  index: number;
  isPlaying: boolean;
  onPlay: (index: number) => void;
}

export function SentenceItem({ text, index, isPlaying, onPlay }: SentenceItemProps) {
  return (
    <li className={`sentence-item${isPlaying ? ' playing' : ''}`}>
      <button
        className="play-button"
        onClick={() => onPlay(index)}
        aria-label={isPlaying ? 'Playing' : 'Play'}
      >
        {isPlaying ? '■' : '▶'}
      </button>
      <span className="sentence-text">{text}</span>
    </li>
  );
}
