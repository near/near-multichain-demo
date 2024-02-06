import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router, adjust the import accordingly

const NotFoundPage: React.FC = () => (
  <Flex align="center" justify="center" height="100vh">
    <Box
      textAlign="center"
      p={8}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading size="lg" mb={4} color="--Red-Light-8">
        404 - Page Not Found
      </Heading>
      <Text fontSize="lg" mb={6}>
        Oops! It seems like the page you are looking for does not exist.
      </Text>
      <Button as={Link} to="/" colorScheme="gray" size="lg">
        Go Home
      </Button>
    </Box>
  </Flex>
);

export default NotFoundPage;
