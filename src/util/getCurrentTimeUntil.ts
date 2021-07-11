import { intervalToDuration } from 'date-fns';

/**
 * Computes the time remaining until a given date from the time of invocation.
 *
 * @param end The date whose remaining time until will be returned
 * @returns Time remaining until the input date or `null` if the date has passed
 */
export default function getCurrentTimeUntil(end: Date): Duration | null {
  const start = new Date();
  return start < end
    ? intervalToDuration({ start, end })
    : null;
}
