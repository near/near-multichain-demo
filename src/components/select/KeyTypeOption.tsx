import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { components, OptionProps } from 'react-select';

interface KeyTypeOptionInterface {
  iconImage: string;
}

const KeyTypeOption: React.FC<OptionProps<KeyTypeOptionInterface>> = props => {
  return (
    <components.Option {...props}>
      <Flex align="center" h="36px" p="8px 4px" gap="8px" borderRadius="4px">
        <Image src={`${props.data.iconImage}`} />
        <Text fontSize="14px" color="#1B1B18">
          {props.label}
        </Text>
      </Flex>
    </components.Option>
  );
};

export default KeyTypeOption;
