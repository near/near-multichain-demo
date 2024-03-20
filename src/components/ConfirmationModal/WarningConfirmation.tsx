import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';

const WarningConfirmation = () => {
  return (
    <Flex flexDir="column" align="center">
      <Image src="/images/warning.png" h="40px" w="40px" />
      <Heading as="h4" size="md" my="18px" fontSize="24px">
        Confirm?
      </Heading>
      <Text fontWeight={600} color="--Red-Light-8" textAlign="center">
        We don’t recognize this contract, proceed with caution.{' '}
      </Text>
    </Flex>
  );
};

export default WarningConfirmation;
