import { Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { components, OptionProps } from 'react-select';

interface AssetOptionInterface {
  iconImage: string;
  networkImage: string;
  networkTooltip: string;
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
          <Tooltip
            hasArrow
            label={props.data.networkTooltip}
            placement="top-end"
            borderRadius="8px"
            bg="#ffffff"
            boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
            fontSize="12px"
            fontWeight={450}
            color="--Sand-Light-12"
            letterSpacing="0.24px"
            padding="12px 16px"
          >
            <Image src={props.data.networkImage} rounded="inherit" />
          </Tooltip>
        </Flex>
      </Flex>
    </components.Option>
  );
};

export default AssetOption;
