export const defaultTheme = {
  colors: {
    warn: '#ec6f00',
    alert: '#d83737',
  },
};

type MyDefaultTheme = typeof defaultTheme

/**
 * Taking advantage of TypeScript's declaration merging to provide type hints on
 * the theme wherever it is consumed from context.
 *
 * Learn more: https://blog.bitsrc.io/tips-for-using-typescript-with-styled-components-e5398755997f
 */
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends MyDefaultTheme {
  }
}
