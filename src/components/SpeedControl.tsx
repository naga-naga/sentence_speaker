const PRESETS = [0.5, 0.75, 1.0, 1.25, 1.5];

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export function SpeedControl({ speed, onSpeedChange }: SpeedControlProps) {
  return (
    <div className="speed-control">
      <label htmlFor="speed-range">Speed: {speed.toFixed(2)}x</label>
      <input
        id="speed-range"
        type="range"
        min={0.5}
        max={1.5}
        step={0.05}
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
      />
      <div className="speed-presets">
        {PRESETS.map((v) => (
          <button
            key={v}
            className={`speed-preset${speed === v ? ' active' : ''}`}
            onClick={() => onSpeedChange(v)}
          >
            {v}x
          </button>
        ))}
      </div>
    </div>
  );
}
