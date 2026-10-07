export function formatTime(time) {
  if (typeof time !== 'string') return time ?? '';

  const match = /^(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(time.trim());
  if (!match) return time;

  const hour = Number(match[1]);
  if (hour > 23) return time;

  return `${hour % 12 || 12}:${match[2]} ${hour < 12 ? 'AM' : 'PM'}`;
}