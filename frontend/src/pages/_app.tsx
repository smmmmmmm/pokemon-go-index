import type { AppProps } from "next/app";

import { ChakraProvider, Container, VStack } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import Div100vh from "react-div-100vh";

import { MenuBar } from "@/components/projects/MenuBar";
import { queryClient } from "@/Query";
import { theme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Div100vh>
          <VStack h="100%" overflow="hidden" spacing={0}>
            <MenuBar />
            <Container p="10px" flex={1} overflow="hidden">
              <Component {...pageProps} />
            </Container>
          </VStack>
        </Div100vh>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
