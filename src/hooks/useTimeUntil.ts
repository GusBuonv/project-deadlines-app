import { useEffect, useState } from 'react';
import getCurrentTimeUntil from '../util/getCurrentTimeUntil';
import DurationStateController from '../util/DurationStateController';

/**
 * Provides a new state object representing the time remaining until a given
 * date
 *
 * The state is updated every second and, therefore, accurate to the second. As
 * an optimization, updates are collected and dispatched from a single interval
 * timer. However, excessive use of this hook may still result in performance
 * degradation.
 *
 * @param end ISO date time string of the date whose remaining time until will be returned
 * @returns A state object representing the time remaining until the input date
 */
export default function useTimeUntil(end: string): Duration | null {
  const [duration, setDuration] = useState(getCurrentTimeUntil(new Date(end)));

  useEffect(() => {
    DurationStateController.instance.subscribe(setDuration, new Date(end));

    return () => {
      DurationStateController.instance.unsubscribe(setDuration);
    };
  }, [end]);

  return duration;
}
