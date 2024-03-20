import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { components, OptionProps } from 'react-select';

interface PaymentMediumOptionInterface {
  iconImage: string;
}

const PaymentMediumOption: React.FC<
  OptionProps<PaymentMediumOptionInterface>
> = props => {
  return (
    <components.Option {...props}>
      <Flex
        align="center"
        h="36px"
        p="8px 4px"
        borderRadius="4px"
        justify="space-between"
      >
        <Flex gap="8px">
          <Flex w="18px" h="18px" rounded="xl">
            <Image src={props.data.iconImage} rounded="inherit" />
          </Flex>
          <Text fontSize="12px" color="#1B1B18" fontWeight={500}>
            {props.label}
          </Text>
        </Flex>
      </Flex>
    </components.Option>
  );
};

export default PaymentMediumOption;
