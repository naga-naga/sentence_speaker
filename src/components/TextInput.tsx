interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
  return (
    <textarea
      className="text-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={8}
      placeholder="Enter English text here..."
    />
  );
}
