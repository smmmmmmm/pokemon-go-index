import type { AppProps } from "next/app";

import { Box, ChakraProvider, Container, VStack } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";

import { MenuBar } from "@/components/projects/MenuBar";
import { queryClient } from "@/Query";
import { theme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box pos="fixed" w="100%" h="100%">
          <VStack overflow="hidden" h="100%" spacing={0}>
            <MenuBar />
            <Container flex={1} overflow="hidden" p="10px">
              <Component {...pageProps} />
            </Container>
          </VStack>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
