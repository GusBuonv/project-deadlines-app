/**
 * Pair mappings from keyof Duration to short user friendly strings, ordered
 * from largest time unit to smallest
 */
const keyToTerseMappings: [keyof Duration, string][] = [
  ['years', 'Y'],
  ['months', 'M'],
  ['days', 'D'],
  ['hours', 'h'],
  ['minutes', 'm'],
  ['seconds', 's'],
];

/**
 * Format a duration object into array of short human readable strings.
 *
 * Starts with the largest non-zero unit of time and prints all units thereafter
 * in decreasing order of unit length.
 *
 * WARNING: This function ignores the `weeks` field of the Duration.
 *
 * @param duration The duration to format
 * @returns Array of tersely formatted human readable strings
 */
export default function formatDurationTerse(duration: Duration): string[] {
  const parts: string[] = [];
  let shouldRender = false;

  keyToTerseMappings.forEach(([key, abbr]) => {
    shouldRender = shouldRender || (duration[key] !== 0);
    if (shouldRender) {
      parts.push(`${duration[key]}${abbr}`);
    }
  });

  if (parts.length === 0) {
    parts.push('0s');
  }

  return parts;
}
