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
  Image,
  ChakraProps,
  NumberIncrementStepper,
  Box,
  useClipboard,
  useToast,
  Tooltip,
  Skeleton,
} from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { AppNotification } from '@/components/notifications';
import PageTitle from '@/components/PageTitle';
import PlusCircle from '@/components/PlusCircle';
import { Select, KeyTypeOption, AssetOption } from '@/components/select';
import { useAuth } from '@/context/AuthContext';
import assets, { Asset } from '@/data/assets';
import keyTypes, { KeyType } from '@/data/keyTypes';
import useDerivedAddress from '@/hooks/useDerivedAddress';
import useFetchTokenBalance from '@/hooks/useFetchTokenBalance';
import {
  getPayloadAndAsset,
  getTransactionExplorerLink,
  truncateAddressForDisplay,
} from '@/utils/asset';

type MultiChainResponse = {
  type: string;
  message: string;
  transactionHash?: string;
  closeIframe: boolean;
};

const helperTextProps = {
  fontSize: '12px',
  fontWeight: 450,
  lineHeight: '140%',
  letterSpacing: '0.24px',
  my: '2px',
  mt: 0,
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

const schema = yup.object().shape({
  keyType: yup.object<KeyType>().required('This is required'),
  assetType: yup.object<Asset>().required('This is required'),
  address: yup.string().required('This is required'),
  amount: yup.number().required('This is required'),
});

const GenerateTransaction = () => {
  const { fastAuthWallet } = useAuth();
  const [isAmountInputFocused, setIsAmountInputFocused] = useState(false);
  const [inFlight, setInFlight] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { onCopy, setValue: setCopyValue } = useClipboard('');
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors = {}, isValid },
    control,
    watch,
    reset,
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      keyType: keyTypes[0],
      assetType: assets[0],
      amount: 0.01,
      address: '',
    },
    // @ts-expect-error: There's currently a typing issue with the resolver library
    resolver: yupResolver(schema),
  });

  const assetType = watch('assetType');
  const keyType = watch('keyType');

  const {
    fetchDerivedAddress,
    derivedAddress,
    loading: deriveAddressLoading,
    error: deriveAddressError,
  } = useDerivedAddress(assetType, keyType);
  const {
    refetch: fetchTokenBalance,
    balance: tokenBalance,
    loading: tokenBalanceLoading,
    error: tokenBalanceError,
  } = useFetchTokenBalance(derivedAddress, assetType.code);

  const handleMultiChainMessage = useCallback(
    (e: MessageEvent) => {
      if (e.data.type === 'multiChainRequest') setInFlight(true);
      if (e.data.type === 'multiChainResponse') {
        setInFlight(false);
        const { transactionHash, message } = e.data as MultiChainResponse;
        toast({
          duration: 10000,
          render: () => (
            <AppNotification
              type={transactionHash ? 'SUCCESS' : 'ERROR'}
              title={
                transactionHash ? 'Transaction success' : 'Transaction error'
              }
              message={message}
              externalLink={
                transactionHash
                  ? getTransactionExplorerLink(transactionHash, assetType.code)
                  : undefined
              }
            />
          ),
        });
        if (transactionHash) {
          fetchTokenBalance();
          reset();
        }
      }
    },
    [assetType.code, fetchTokenBalance, reset, toast]
  );

  useEffect(() => {
    window.addEventListener('message', handleMultiChainMessage);

    return () => {
      window.removeEventListener('message', handleMultiChainMessage);
    };
  }, [handleMultiChainMessage]);

  useEffect(() => {
    if (assetType && keyType) fetchDerivedAddress();
  }, [assetType, fetchDerivedAddress, keyType]);

  useEffect(() => {
    setCopyValue(derivedAddress);
  }, [derivedAddress, setCopyValue]);

  useEffect(() => {
    if (!tokenBalanceLoading && tokenBalance === 0) {
      toast({
        duration: 10000,
        render: () => (
          <AppNotification
            type="WARNING"
            message="Add funds to the sending address"
          />
        ),
      });
    }
  }, [toast, tokenBalance, tokenBalanceLoading]);

  const toggleAmountFocus = () => setIsAmountInputFocused(focused => !focused);
  const handleCopyClick = () => {
    onCopy();
    toast({
      render: () => (
        <AppNotification type="SUCCESS" message="Address copied to clipboad" />
      ),
    });
  };

  const onSubmitForm = useCallback(
    async (values: {
      address: string;
      amount: number;
      assetType: Asset;
      keyType: KeyType;
    }) => {
      if (!fastAuthWallet) {
        console.error('FastAuth wallet not available');
        return;
      }

      setInFlight(true);
      const { domain, value } = getPayloadAndAsset(
        assetType.value,
        keyType.value,
        values.amount
      );

      if (assetType.value === 0) {
        fastAuthWallet.signMultiChainTransaction({
          derivationPath: {
            chain: assetType.value,
            ...(domain ? { domain } : {}),
          },
          transaction: {
            to: values.address,
            value,
          },
          chainConfig: {
            network: assetType.chainId === 'testnet' ? 'testnet' : 'mainnet',
          },
        });
      } else if (assetType.value === 60) {
        fastAuthWallet.signMultiChainTransaction({
          derivationPath: {
            chain: assetType.value,
            ...(domain ? { domain } : {}),
          },
          transaction: {
            to: values.address,
            value: value,
            chainId: assetType.chainId,
          },
        });
      }
    },
    [assetType.chainId, assetType.value, fastAuthWallet, keyType.value]
  );

  return (
    <Box w="full" h="fit-content" ref={ref}>
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
              rules={{
                required: true,
              }}
            />
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
              <FormErrorMessage>{errors?.assetType?.message}</FormErrorMessage>
              <Flex justify="space-between" mt={1} align="center">
                <Skeleton
                  height="12px"
                  isLoaded={
                    derivedAddress !== undefined &&
                    !deriveAddressLoading &&
                    !deriveAddressError
                  }
                  borderRadius={1}
                >
                  <Flex align="center" gap={1.5}>
                    <FormHelperText
                      {...helperTextProps}
                      color="--Sand-Light-11"
                    >
                      Address:
                    </FormHelperText>
                    <FormHelperText
                      {...helperTextProps}
                      color="--Sand-Light-11"
                      fontWeight={600}
                      fontSize="13px"
                    >
                      {truncateAddressForDisplay(derivedAddress)}
                    </FormHelperText>
                  </Flex>
                </Skeleton>
                <Skeleton
                  isLoaded={
                    derivedAddress !== undefined &&
                    !deriveAddressLoading &&
                    !deriveAddressError
                  }
                  borderRadius="18px"
                >
                  <Button
                    variant="black"
                    size="xs"
                    h="20px"
                    p={undefined}
                    fontSize="10px"
                    py="0px"
                    onClick={handleCopyClick}
                  >
                    Copy
                  </Button>
                </Skeleton>
              </Flex>
            </FormControl>
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
            <Flex justify="space-between" mt={1} align="center">
              <Skeleton
                height="12px"
                isLoaded={
                  tokenBalance !== undefined &&
                  !tokenBalanceLoading &&
                  !tokenBalanceError
                }
                borderRadius={1}
              >
                <FormHelperText
                  {...helperTextProps}
                  display="flex"
                  alignItems="center"
                  color="--Sand-Light-11"
                  gap={1}
                >
                  <Tooltip
                    fontSize="12px"
                    label={
                      tokenBalance && tokenBalance > 0
                        ? 'Balance of sending address'
                        : 'Send some funds to the derived address'
                    }
                    aria-label="A tooltip"
                  >
                    <Image src="/images/InfoCircle.svg" mb={0.3} />
                  </Tooltip>
                  Available: {tokenBalance ?? 0}
                </FormHelperText>
              </Skeleton>
              <Skeleton
                borderRadius="18px"
                isLoaded={
                  tokenBalance !== undefined &&
                  !tokenBalanceLoading &&
                  !tokenBalanceError
                }
              >
                <Button
                  variant="black"
                  size="xs"
                  h="20px"
                  p={undefined}
                  fontSize="10px"
                  py="0px"
                  onClick={fetchTokenBalance}
                >
                  Refresh
                </Button>
              </Skeleton>
            </Flex>

            <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel {...helperTextProps} fontWeight={600}>
              Send To
            </FormLabel>
            <InputGroup>
              <Input
                {...register('address')}
                placeholder={`${assetType?.code} address`}
                border="1px solid"
                bg="--Sand-Light-1"
                {...getComputedInputStyles(errors, 'address')}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
          </FormControl>
          <Button
            w="full"
            variant="black"
            type="submit"
            isDisabled={!isValid}
            isLoading={inFlight}
          >
            Continue
          </Button>
        </Card>
      </form>
    </Box>
  );
};

export default GenerateTransaction;
