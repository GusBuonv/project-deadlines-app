// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom';
import getCurrentTimeUntil from './getCurrentTimeUntil';
import { SetDuration } from './types';

/**
 * A singleton that enables duration updates to be collected and dispatched from
 * a single interval timer
 */
export default class DurationStateController {
  //
  // Static Interface
  //

  /**
   * The singleton instance
   */
  static get instance(): DurationStateController {
    if (!this.instanceP) {
      this.instanceP = new DurationStateController();
    }
    return this.instanceP;
  }

  private static instanceP?: DurationStateController;

  //
  // Instance Interface
  //

  /**
   * Subscribes a duration state updates every second
   *
   * @param setDuration The update function of the duration state to be managed
   * @param end The time whose remaining time until is the desired duration
   */
  subscribe(setDuration: SetDuration, end: Date): void {
    if (!this.isDispatching) {
      this.startDispatching();
    }
    this.activeUpdates.set(setDuration, end);
  }

  /**
   * Unsubscribes a duration state from updates
   *
   * @param setDuration The state update function to be unsubscribed
   */
  unsubscribe(setDuration: SetDuration): void {
    this.activeUpdates.delete(setDuration);
    if (this.activeUpdates.size === 0) {
      this.stopDispatching();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-useless-constructor
  private constructor() { }

  private activeUpdates: Map<SetDuration, Date> = new Map();

  private intervalId?: number;

  private get isDispatching(): boolean {
    return !!this.intervalId;
  }

  private dispatchUpdates = () => {
    unstable_batchedUpdates(() => {
      this.activeUpdates.forEach((end, setDuration) => {
        setDuration(() => {
          const duration = getCurrentTimeUntil(end);
          if (!duration) {
            this.unsubscribe(setDuration);
          }
          return duration;
        });
      });
    });
  };

  private startDispatching() {
    this.intervalId = window.setInterval(this.dispatchUpdates, 1000);
  }

  private stopDispatching() {
    window.clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}
