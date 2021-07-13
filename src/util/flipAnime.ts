import anime from 'animejs';
import { DecisionData } from 'flip-toolkit/lib/types';

type FlipAnimeCallback = (element: HTMLElement, i: number) => Omit<anime.AnimeParams, 'target' | 'onComplete'>;
export default function flipAnime(callback: FlipAnimeCallback) {
  return (
    element: HTMLElement,
    index: number | DecisionData | undefined,
    onExitComplete: (() => void) | DecisionData | undefined,
  ): void => {
    anime({
      ...callback(element, typeof index === 'number' ? index : NaN),
      targets: element,
      complete: typeof onExitComplete === 'function' ? onExitComplete : undefined,
    });
  };
}
