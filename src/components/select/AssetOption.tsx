import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { components, OptionProps } from 'react-select';

interface AssetOptionInterface {
  iconImage: string;
  networkImage: string;
}

const AssetOption: React.FC<OptionProps<AssetOptionInterface>> = props => {
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
          <Text fontSize="14px" color="#1B1B18">
            {props.label}
          </Text>
        </Flex>
        <Flex w="16px" h="16px" rounded="xl" bg="#fff">
          <Image src={props.data.networkImage} rounded="inherit" />
        </Flex>
      </Flex>
    </components.Option>
  );
};

export default AssetOption;
