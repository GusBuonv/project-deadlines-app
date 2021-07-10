import '../styles/preflight.css'; // CSS reset from Tailwind CSS
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from '../assets/default-theme.json';

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
