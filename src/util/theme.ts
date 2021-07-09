import { DefaultTheme } from 'styled-components';

/**
 * Taking advantage of TypeScript's declaration merging to provide type hints on
 * the theme wherever it is consumed from context.
 *
 * Learn more: https://blog.bitsrc.io/tips-for-using-typescript-with-styled-components-e5398755997f
 */

declare module 'styled-components' {
  // eslint-disable-next-line no-shadow, @typescript-eslint/no-empty-interface
  export interface DefaultTheme {
  }
}

export const defaultTheme: DefaultTheme = {
};
