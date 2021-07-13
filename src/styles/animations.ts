import flipAnime from '../util/flipAnime';

export const fadeIn = flipAnime(() => ({
  opacity: 1,
  delay: 200,
  easing: 'easeOutSine',
}));

export const fadeOutInstantly = flipAnime(() => ({
  opacity: 0,
  duration: 0,
}));
