import { Flex, Heading, Image, List, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { DomainKeyPayloadType } from './types';
import { formatCurrencyInUSD } from './utils';
import assets from '@/data/assets';

const ListItemWithFlex = ({
  children,
  borderTopRadius,
  borderBottomRadius,
}: {
  children: React.ReactNode;
  borderTopRadius?: string;
  borderBottomRadius?: string;
}) => (
  <ListItem
    as={Flex}
    p="16px"
    alignItems="center"
    justifyContent="space-between"
    border="1px solid"
    borderColor="--Sand-Light-5"
    borderTopRadius={borderTopRadius}
    borderBottomRadius={borderBottomRadius}
  >
    {children}
  </ListItem>
);

type DomainConfirmationProps = {
  payload: DomainKeyPayloadType;
};

const DomainKeyConfirmation: React.FC<DomainConfirmationProps> = ({
  payload,
}) => {
  const { assetType, domain, amount, address, fees, total } = payload;
  const asset = assets.find(item => item.value === assetType);

  return (
    <Flex flexDir="column" align="center">
      <Image src={asset?.networkImage} h="30px" w="30px" />
      <Heading as="h4" size="md" mt="20px" fontSize="24px">
        Send {asset?.label}?
      </Heading>
      <Flex
        align="center"
        p="8px 12px"
        borderRadius="50px"
        boxShadow="0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
        border="1px solid"
        borderColor="--Sand-Light-6"
        gap="6px"
        mt={2}
        mb={4}
      >
        <Image src="/images/globe.png" h="16px" w="16px" />
        <Text color="--Sand-Light-12" fontSize="12px" fontWeight={450}>
          {domain}
        </Text>
      </Flex>
      <List bg="--Sand-Light-1" borderRadius="6px" w="full" my={4}>
        <ListItemWithFlex borderTopRadius="inherit">
          <Text color="--Sand-Light-11" fontSize="12px" fontWeight={450}>
            Send
          </Text>
          <Flex h="full" align="center" gap={2}>
            <Image src={asset?.networkImage} h="12px" w="12px" />
            <Text fontWeight={600} fontSize="14px" lineHeight="150%">
              {amount} {asset?.label}
            </Text>
          </Flex>
        </ListItemWithFlex>
        <ListItemWithFlex>
          <Text color="--Sand-Light-11" fontSize="12px" fontWeight={450}>
            To
          </Text>
          <Text fontWeight={600} fontSize="14px">
            {address}
          </Text>
        </ListItemWithFlex>
      </List>
      <List bg="--Sand-Light-1" borderRadius="6px" w="full">
        <ListItemWithFlex borderTopRadius="inherit">
          <Text color="--Sand-Light-11" fontSize="12px" fontWeight={450}>
            Estimated Fees
          </Text>
          <Text fontWeight={600} fontSize="14px">
            {fees.map(amount => formatCurrencyInUSD(amount)).join(' - ')}
          </Text>
        </ListItemWithFlex>
        <ListItemWithFlex borderBottomRadius="inherit">
          <Text color="--Sand-Light-11" fontSize="12px" fontWeight={450}>
            Total
          </Text>
          <Text fontWeight={600} fontSize="14px">
            {formatCurrencyInUSD(total)}
          </Text>
        </ListItemWithFlex>
      </List>
    </Flex>
  );
};

export default DomainKeyConfirmation;
