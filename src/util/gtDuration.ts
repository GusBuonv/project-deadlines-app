/**
 * Provides a copy of a Duration in which no fields are optional.
 *
 * @param a A Duration object with optional fields
 * @returns An equivalent Duration object with all fields present
 */
const requireDuration = (a: Duration): Required<Duration> => ({
  years: a.years ?? 0,
  months: a.months ?? 0,
  weeks: a.weeks ?? 0,
  days: a.days ?? 0,
  hours: a.hours ?? 0,
  minutes: a.minutes ?? 0,
  seconds: a.seconds ?? 0,
});

/**
 * Tests for the greater of two durations.
 *
 * @param a Left hand operand
 * @param b Right hand operand
 * @returns Whether `a` is greater than `b`
 */
export default function gtDuration(a: Duration, b: Duration): boolean {
  const aa = requireDuration(a);
  const bb = requireDuration(b);
  const keys = [
    'years',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds',
  ] as const;

  let result = false;
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    // The largest unit that differs between the durations gives the result
    if (aa[key] !== bb[key]) {
      result = aa[key] > bb[key];
      break;
    }
  }

  return result;
}
