import { HeadingTag } from './types';

const headingTagMap: { [K in HeadingTag]: HeadingTag } = {
  h1: 'h2',
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
  h5: 'h6',
  h6: 'div',
  div: 'div',
  span: 'span',
} as const;

export default headingTagMap;
