import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';
import { theme } from './theme';
import { MobileProvider } from '@context/MobileContext';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MobileProvider>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen bg-white">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F97316] border-t-transparent"></div>
            </div>
          }>
            <RouterProvider router={router} />
          </Suspense>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                iconTheme: {
                  primary: '#22C55E',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </MobileProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;