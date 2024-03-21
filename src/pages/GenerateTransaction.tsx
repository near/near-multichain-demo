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
  InputRightElement,
  IconButton,
  Image,
  ChakraProps,
  NumberIncrementStepper,
  Box,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import CopySvg from '@/assets/Copy.svg';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { ModalManager as ConfirmationModalModalManager } from '@/components/ConfirmationModal/ConfirmationModal';
import {
  SAMPLE_DOMAIN_KEY_PAYLOAD,
  SAMPLE_PERSONAL_KEY_PAYLOAD,
  SAMPLE_WRONG_KEY_PAYLOAD,
} from '@/components/ConfirmationModal/data';
import DomainKeyConfirmation from '@/components/ConfirmationModal/DomainKeyConfirmation';
import PersonalKeyConfirmation from '@/components/ConfirmationModal/PersonalKeyConfirmation';
import { ConfirmationPayload } from '@/components/ConfirmationModal/types';
import WarningConfirmation from '@/components/ConfirmationModal/WarningConfirmation';
import GenerateAddress from '@/components/GenerateAddress';
import PageTitle from '@/components/PageTitle';
import PlusCircle from '@/components/PlusCircle';
import { Select, KeyTypeOption, AssetOption } from '@/components/select';
import assets, { associatedNetwork } from '@/data/assets';
import keyTypes, { signerAppBehavior } from '@/data/keyTypes';

const helperTextProps = {
  fontSize: '12px',
  fontWeight: 450,
  lineHeight: '140%',
  letterSpacing: '0.24px',
  my: '2px',
};

const modalContentsKeyMap: { [key: string]: unknown } = {
  domainKey: DomainKeyConfirmation,
  personalKey: PersonalKeyConfirmation,
  wrongKey: WarningConfirmation,
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

const schema = yup.object().shape({
  keyType: yup
    .object()
    .shape({
      value: yup.string().required('Key type is required'),
      label: yup.string().required('Key type is required'),
    })
    .required('This is required'),
  assetType: yup
    .object()
    .shape({
      value: yup.string().required('Please select an asset'),
      label: yup.string().required('Please select an asset'),
    })
    .required('This is required'),
  amount: yup.number().required('This is required'),
  address: yup.string().required('This is required'),
});

const defaultKeyType = keyTypes.find(keyType => keyType.value === 'domainKey');
const defaultAsset = assets.find(asset => asset.value === 'eth');

const GenerateTransaction = () => {
  const [isAmountInputFocused, setIsAmountInputFocused] = useState(false);
  const [isAddressInputFocused, setIsAddressInputFocused] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors = {}, isValid },
    control,
    getValues,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      keyType: defaultKeyType,
      assetType: defaultAsset,
      amount: 0.01,
      address: 'mw5vJDm1Vx0xyBCiMsaT7',
    },
  });
  const formValues = getValues();

  const ModalContents = modalContentsKeyMap[
    formValues.keyType!.value
  ] as React.FC<{ payload: ConfirmationPayload }>;

  const confirmationPayload = useMemo(() => {
    if (!formValues || !formValues.keyType || !formValues.assetType)
      return null;
    const { keyType, amount, address, assetType } = formValues;
    let payload: Record<string, unknown> = {
      amount,
      address,
      asset: assetType.value,
    };

    switch (keyType.value) {
      case 'domainKey':
        payload.domain = SAMPLE_DOMAIN_KEY_PAYLOAD.domain;
        payload.fees = SAMPLE_DOMAIN_KEY_PAYLOAD.fees;
        payload.total = SAMPLE_DOMAIN_KEY_PAYLOAD.total;
        break;
      case 'personalKey':
        payload.domain = SAMPLE_PERSONAL_KEY_PAYLOAD.domain;
        payload.fees = SAMPLE_PERSONAL_KEY_PAYLOAD.fees;
        payload.message = SAMPLE_PERSONAL_KEY_PAYLOAD.message;
        delete payload.total;
        payload.email = SAMPLE_PERSONAL_KEY_PAYLOAD.email;
        payload.paymentMedium = SAMPLE_PERSONAL_KEY_PAYLOAD.paymentMedium;
        break;
      default:
        payload = { message: SAMPLE_WRONG_KEY_PAYLOAD.message };
        break;
    }

    return payload as ConfirmationPayload;
  }, [formValues]);

  const keyTypeAssistiveText = useMemo(() => {
    const selected = formValues?.keyType?.value;
    if (selected) return signerAppBehavior[selected];
    return null;
  }, [formValues.keyType]);

  const assetAssistiveText = useMemo(() => {
    const selected = formValues?.assetType?.value;
    if (selected) return associatedNetwork[selected];
    return null;
  }, [formValues?.assetType?.value]);

  const toggleAmountFocus = () => setIsAmountInputFocused(focused => !focused);
  const toggleAddressFocus = () =>
    setIsAddressInputFocused(focused => !focused);

  const onSubmitForm = (values: any) => {
    console.log('values ', values);
  };

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
              {keyTypeAssistiveText}
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
                {assetAssistiveText}
              </FormHelperText>
              <FormErrorMessage>{errors?.assetType?.message}</FormErrorMessage>
            </FormControl>
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
              icon={<Image src={CopySvg} />}
            />
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
            <FormHelperText {...helperTextProps} color="--Sand-Light-11" mt={1}>
              42.331 available
            </FormHelperText>
            <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel {...helperTextProps} fontWeight={600}>
              Send To
            </FormLabel>
            <InputGroup>
              <Input
                {...register('address')}
                placeholder="ETH address"
                onFocus={toggleAddressFocus}
                onBlur={toggleAddressFocus}
                border="1px solid"
                bg="--Sand-Light-1"
                {...getComputedInputStyles(errors, 'address')}
                pr="40px"
              />

              <InputRightElement>
                <GenerateAddress isActive={isAddressInputFocused} />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
          </FormControl>
          <ConfirmationModalModalManager
            ctaButtonProps={
              formValues.keyType!.value === 'wrongKey'
                ? { variant: 'red' }
                : undefined
            }
            children={
              <ModalContents
                payload={confirmationPayload as ConfirmationPayload}
              />
            }
            triggerFn={({ trigger }) => (
              <Button
                onClick={() => isValid && trigger()}
                w="full"
                variant="black"
                type="submit"
                isDisabled={!isValid}
              >
                Continue
              </Button>
            )}
          />
        </Card>
      </form>
    </Box>
  );
};

export default GenerateTransaction;
