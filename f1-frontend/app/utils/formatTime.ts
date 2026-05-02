export function formatLapTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(2).padStart(5, "0");

  return `${mins}:${secs}`;
}