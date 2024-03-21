import { Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { WrongKeyPayloadType } from '@/components/ConfirmationModal/types';

type WarningConfirmationProps = {
  payload: WrongKeyPayloadType;
};
const WarningConfirmation: React.FC<WarningConfirmationProps> = ({
  payload: { message },
}) => {
  return (
    <Flex flexDir="column" align="center">
      <Image src="/images/warning.png" h="40px" w="40px" />
      <Heading as="h4" size="md" my="18px" fontSize="24px">
        Confirm?
      </Heading>
      <Text fontWeight={600} color="--Red-Light-8" textAlign="center">
        {message}
      </Text>
    </Flex>
  );
};

export default WarningConfirmation;
