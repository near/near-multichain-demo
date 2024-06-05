import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  InputGroup,
  Input,
  IconButton,
  Image,
  ChakraProps,
  NumberIncrementStepper,
  Box,
  useClipboard,
  useToast,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import canonicalize from 'canonicalize';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/Button';
import Card from '@/components/Card';
import PageTitle from '@/components/PageTitle';
import PlusCircle from '@/components/PlusCircle';
import { Select, KeyTypeOption, AssetOption } from '@/components/select';
import ToastComponent from '@/components/ToastComponent';
import { SendMultichainMessage, useAuth } from '@/context/AuthContext';
import assets, { Asset } from '@/data/assets';
import keyTypes, { KeyType } from '@/data/keyTypes';
import { getDomain, getPayloadAndAsset } from '@/utils/utils';

const CopiedNotification = () => (
  <ToastComponent align="center" gap={1.5}>
    <Image src="/images/CheckCircle.svg" />
    <Text color="--Sand-Light-12" fontSize="13px" fontWeight={500}>
      Address copied to clipboard
    </Text>
  </ToastComponent>
);

const helperTextProps = {
  fontSize: '12px',
  fontWeight: 450,
  lineHeight: '140%',
  letterSpacing: '0.24px',
  my: '2px',
};

const getComputedInputStyles = (
  errors: Record<string, unknown>,
  inputName: string
): ChakraProps => {
  const hasInput = !!errors[inputName];
  return {
    borderColor: hasInput ? '#D95C4A' : '--Sand-Light-6',
    _focus: {
      borderColor: hasInput ? '#D95C4A' : '--Violet-Light-8',
      outline: 'none',
      boxShadow: hasInput ? 'none' : '0px 0px 0px 4px #CBC7F4',
    },
  };
};

type FormValues = {
  address: string;
  amount: number;
  assetType: Asset;
  keyType: KeyType;
};

const GenerateTransaction = () => {
  const [isAmountInputFocused, setIsAmountInputFocused] = useState(false);
  const { deriveAddress, accountId, sendTransaction } = useAuth();
  const [derivedAddress, setDerivedAddress] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);
  const { onCopy, setValue: setCopyValue } = useClipboard('');
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors = {}, isValid },
    control,
    watch,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      keyType: keyTypes[0],
      assetType: assets[0],
      amount: 0.01,
    },
  });
  const assetType = watch('assetType');
  const keyType = watch('keyType');

  const selectedAsset = useMemo(
    () =>
      assets.find(
        ({ label, value }) =>
          label === assetType.label && value === assetType.value
      ),
    [assetType]
  );

  const selectedKey = useMemo(
    () =>
      keyTypes.find(
        ({ label, value }) => label === keyType.label && value === keyType.value
      ),
    [keyType]
  );

  const fetchDerivedAddress = useCallback(async () => {
    try {
      const domain = getDomain(keyType.value);

      const derivationPath = canonicalize(
        domain ? { chain: assetType.value, domain } : { chain: assetType.value }
      );

      // const derivationPath = `,${asset},${domain}`;
      console.log({ derivationPath });

      if (!derivationPath || !accountId) {
        console.error('Error: Missing derivation path for address generation.');
        return;
      }

      let address = '';

      if (assetType.value === 0) {
        address = await deriveAddress({
          type: 'BTC',
          signerId: accountId,
          path: derivationPath,
          btcNetworkId: 'testnet',
          networkId: 'testnet',
          contract: 'v2.multichain-mpc.testnet',
        });
      } else if (assetType.value === 60) {
        address = await deriveAddress({
          type: 'EVM',
          signerId: accountId,
          path: derivationPath,
          networkId: 'testnet',
          contract: 'v2.multichain-mpc.testnet',
        });
      }

      console.log({ address });

      setDerivedAddress(address);
      setCopyValue(address);
    } catch (e) {
      console.log('Error fetching derived address ', e);
    }
  }, [accountId, assetType, deriveAddress, keyType.value, setCopyValue]);

  useEffect(() => {
    if (!assetType || !keyType) return;
    fetchDerivedAddress();
    // Subscribe to changes in assetType and keyType
    return () => {
      // Cleanup or unsubscribe if needed
    };
  }, [assetType, fetchDerivedAddress, keyType]);

  const toggleAmountFocus = () => setIsAmountInputFocused(focused => !focused);
  const handleCopyClick = () => {
    onCopy();
    toast({
      render: CopiedNotification,
    });
  };

  const onSubmitForm = useCallback(
    async (values: {
      address: string;
      amount: number;
      assetType: Asset;
      keyType: KeyType;
    }) => {
      const { domain, asset, value } = getPayloadAndAsset(
        assetType.value,
        keyType.value,
        values.amount
      );

      console.log({ domain, asset, value });
      let payload: SendMultichainMessage;

      if (assetType.value === 0) {
        payload = {
          chain: assetType.value,
          ...(domain ? { domain } : {}),
          to: values.address,
          value: BigInt(value),
          from: derivedAddress,
          network: assetType.chainId === 'testnet' ? 'testnet' : 'mainnet',
        };
      } else {
        payload = {
          chain: assetType.value,
          ...(domain ? { domain } : {}),
          to: values.address,
          value: BigInt(value),
          from: derivedAddress,
          chainId: assetType.chainId as bigint,
        };
      }

      await sendTransaction(payload);
    },
    [assetType, derivedAddress, keyType, sendTransaction]
  );

  return (
    <Box w="fit-contet" h="fit-content" ref={ref}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <Card gap="20px">
          <PageTitle>Generate Transaction</PageTitle>
          <FormControl>
            <FormLabel {...helperTextProps} fontWeight={600}>
              Key Type
            </FormLabel>
            <Controller
              name="keyType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={keyTypes}
                  onChange={e => field.onChange(e)}
                  placeholder="Select..."
                  components={{ Option: KeyTypeOption } as never}
                />
              )}
            />
            <FormHelperText {...helperTextProps} color="--Sand-Light-11" mt={1}>
              {selectedKey?.assistiveMessage}
            </FormHelperText>
            <FormErrorMessage>{errors?.keyType?.message}</FormErrorMessage>
          </FormControl>
          <Flex w="full" align="center" gap={3}>
            <FormControl>
              <FormLabel {...helperTextProps} fontWeight={600}>
                Asset
              </FormLabel>
              <Controller
                name="assetType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={assets}
                    onChange={e => field.onChange(e)}
                    placeholder="Select..."
                    components={{ Option: AssetOption } as never}
                  />
                )}
              />
              <FormHelperText
                {...helperTextProps}
                color="--Sand-Light-11"
                mt={1}
              >
                {selectedAsset?.networkTooltip}
              </FormHelperText>
              <FormErrorMessage>{errors?.assetType?.message}</FormErrorMessage>
            </FormControl>
            <Tooltip label={derivedAddress} placement="top" hasArrow>
              <IconButton
                h="40px"
                w="40px"
                bg="--Sand-Light-1"
                opacity={0.9}
                _hover={{ bg: '--Sand-Light-1', opacity: 1 }}
                border="1px solid"
                borderColor="--Sand-Light-6"
                borderRadius="50px"
                colorScheme="blue"
                aria-label="Copy"
                icon={<Image src="/images/Copy.svg" />}
                mb="2px"
                onClick={handleCopyClick}
                isDisabled={!derivedAddress}
              />
            </Tooltip>
          </Flex>
          <FormControl>
            <FormLabel {...helperTextProps} fontWeight={600}>
              Amount
            </FormLabel>
            <NumberInput step={0.01}>
              <NumberInputField
                {...register('amount')}
                h="40px"
                p="8px 12px"
                borderRadius="6px"
                border="1px solid"
                bg="--Sand-Light-1"
                {...getComputedInputStyles(errors, 'amount')}
                onFocus={toggleAmountFocus}
                onBlur={toggleAmountFocus}
              />
              <NumberInputStepper
                mr="8px"
                display="flex"
                justifyContent="center"
                mb={0}
              >
                <NumberIncrementStepper border="none">
                  <PlusCircle
                    isActive={isAmountInputFocused}
                    cursor="pointer"
                  />
                </NumberIncrementStepper>
              </NumberInputStepper>
            </NumberInput>
            {/* <FormHelperText {...helperTextProps} color="--Sand-Light-11" mt={1}>
              ... available
            </FormHelperText> */}
            <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel {...helperTextProps} fontWeight={600}>
              Send To
            </FormLabel>
            <InputGroup>
              <Input
                {...register('address')}
                placeholder={`${selectedAsset?.code} address`}
                border="1px solid"
                bg="--Sand-Light-1"
                {...getComputedInputStyles(errors, 'address')}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
          </FormControl>
          <Button w="full" variant="black" type="submit" isDisabled={!isValid}>
            Continue
          </Button>
        </Card>
      </form>
    </Box>
  );
};

export default GenerateTransaction;
