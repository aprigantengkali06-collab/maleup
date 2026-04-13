export function CountdownTimer({ seconds }: { seconds: number }) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return <span className="font-mono text-4xl font-semibold text-white">{`${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`}</span>;
}
