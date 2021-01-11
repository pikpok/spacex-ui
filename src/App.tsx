import { ChakraProvider, Text } from '@chakra-ui/react';

export const App = () => {
  return (
    <ChakraProvider>
      <Text textAlign="center" fontSize="xl" fontWeight="bold">Works!</Text>
    </ChakraProvider>
  )
}

export default App;
