import '../styles/preflight.css'; // CSS reset from Tailwind CSS
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from '../assets/default-theme.json';
import { wrapper } from '../store/store';

const App = ({ Component, pageProps }: AppProps): ReactElement => (
  <ThemeProvider theme={theme}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </ThemeProvider>
);

export default wrapper.withRedux(App);
