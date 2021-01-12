import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';

ReactDOM.render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
