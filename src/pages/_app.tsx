import '../styles/preflight.css'; // CSS reset from Tailwind CSS
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { useStore } from '../store/store';
import { defaultTheme } from '../util/theme';

const App = ({
  Component,
  pageProps,
}: AppProps): JSX.Element => {
  const store = useStore();

  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
