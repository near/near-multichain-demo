import { Flex, Heading, Image, List, Text } from '@chakra-ui/react';
import React from 'react';
import ListItemWithFlex from './ListItemWithFlex';
import { PersonalKeyPayloadType } from './types';
import { formatCurrencyInUSD } from './utils';
import { Select } from '@/components/select';
import PaymentMediumOption from '@/components/select/PaymentMediumOption';
import paymentMediums from '@/data/paymentMediums';

type DomainConfirmationProps = {
  payload: PersonalKeyPayloadType;
};

const PersonalKeyConfirmation: React.FC<DomainConfirmationProps> = ({
  payload,
}) => {
  const { message, paymentMedium, email, domain, address, fees } = payload;

  return (
    <Flex flexDir="column" align="center">
      <Image src="/images/PenNib.png" h="40px" w="40px" />
      <Heading as="h4" size="md" my="18px" fontSize="24px">
        Sign Message?
      </Heading>
      <Text fontWeight={600} color="--Violet-Light-8">
        {email}
      </Text>
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
          <Text color="--Sand-Light-11" fontSize="14px" fontWeight={450}>
            Message
          </Text>
          <Flex h="full" align="center" gap={2}>
            <Text fontWeight={450} fontSize="14px" lineHeight="150%">
              {message}
            </Text>
          </Flex>
        </ListItemWithFlex>
        <ListItemWithFlex borderBottomRadius="inherit">
          <Text color="--Sand-Light-11" fontSize="14px" fontWeight={450}>
            To
          </Text>
          <Text fontWeight={600} fontSize="14px">
            {address}
          </Text>
        </ListItemWithFlex>
      </List>
      <List bg="--Sand-Light-1" borderRadius="6px" w="full">
        <ListItemWithFlex borderTopRadius="inherit">
          <Text color="--Sand-Light-11" fontSize="14px" fontWeight={450}>
            Estimated Fees
          </Text>
          <Text fontWeight={600} fontSize="14px">
            {fees.map(amount => formatCurrencyInUSD(amount)).join(' - ')}
          </Text>
        </ListItemWithFlex>
        <ListItemWithFlex borderBottomRadius="inherit" py="8px">
          <Text color="--Sand-Light-11" fontSize="14px" fontWeight={450}>
            Paid With
          </Text>
          <Select
            options={paymentMediums}
            value={paymentMediums.find(item => item.value === paymentMedium)}
            onChange={selected => console.log('value ', selected)}
            placeholder="Select"
            components={{ Option: PaymentMediumOption } as never}
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderRadius: '50px',
              }),
            }}
          />
        </ListItemWithFlex>
      </List>
    </Flex>
  );
};

export default PersonalKeyConfirmation;
