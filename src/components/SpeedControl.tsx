interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export function SpeedControl({ speed, onSpeedChange }: SpeedControlProps) {
  return (
    <div className="speed-control">
      <label htmlFor="speed-range">Speed: {speed.toFixed(1)}x</label>
      <input
        id="speed-range"
        type="range"
        min={0.5}
        max={1.5}
        step={0.1}
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
      />
    </div>
  );
}
