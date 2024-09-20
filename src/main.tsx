import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import theme from '@/styles/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: {
          position: 'bottom',
          duration: 3000,
          isClosable: true,
        },
      }}
    >
      <App />
    </ChakraProvider>
  </StrictMode>
);
