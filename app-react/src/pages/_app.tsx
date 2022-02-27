import React, { ReactElement } from 'react';
import type { AppProps } from "next/app";
import { ThemeProvider } from 'theme-ui'
import { theme } from '../theme'
import { QueryClient, QueryClientProvider } from 'react-query';

// Initialize Query Client for Data Management (Caching, Persistence)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

export function App({ Component, pageProps }: AppProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;