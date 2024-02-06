import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from './NavBar';

const Layout = () => (
  <Flex
    h={{ base: '100vh', md: '844px' }}
    w={{ base: '100vw', md: '390px' }}
    flexDir="column"
    mx="auto"
    p="0px 20px"
    gap="40px"
    align="center"
    bg="--Sand-Light-2"
  >
    <Flex h="full" w="full" flexDir="column">
      <NavBar />
      <Box boxSizing="border-box" w="full" bg="white" mt={8}>
        <Outlet />
      </Box>
    </Flex>
  </Flex>
);

export default Layout;
