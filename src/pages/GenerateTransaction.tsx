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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import CopySvg from '@/assets/Copy.svg';
import Button from '@/components/Button';
import Card from '@/components/Card';
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
  asset: yup
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

  const {
    register,
    handleSubmit,
    formState: { errors = {}, isValid },
    control,
    watch,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
    defaultValues: {
      keyType: defaultKeyType,
      asset: defaultAsset,
      amount: 0.01,
    },
  });
  const formValues = watch();

  const keyTypeAssistiveText = useMemo(() => {
    const selected = formValues?.keyType?.value;
    if (selected) return signerAppBehavior[selected];
    return null;
  }, [formValues.keyType]);

  const assetAssistiveText = useMemo(() => {
    const selected = formValues?.asset?.value;
    if (selected) return associatedNetwork[selected];
    return null;
  }, [formValues.asset]);

  const handleAmountInputFocus = () => {
    setIsAmountInputFocused(true);
  };

  const handleAddressInputFocus = () => {
    setIsAddressInputFocused(true);
  };

  const onSubmitForm = (values: any) => {
    console.log('values ', values);
  };

  console.log('formValues ', formValues);

  return (
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
                // eslint-disable-next-line
                //@ts-ignore
                components={{ Option: KeyTypeOption }}
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
              name="asset"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={assets}
                  onChange={e => field.onChange(e)}
                  placeholder="Select..."
                  // eslint-disable-next-line
                  //@ts-ignore
                  components={{ Option: AssetOption }}
                />
              )}
            />
            <FormHelperText {...helperTextProps} color="--Sand-Light-11" mt={1}>
              {assetAssistiveText}
            </FormHelperText>
            <FormErrorMessage>{errors?.asset?.message}</FormErrorMessage>
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
              onFocus={handleAmountInputFocus}
              onBlur={() => setIsAmountInputFocused(false)}
            />
            <NumberInputStepper
              mr="8px"
              display="flex"
              justifyContent="center"
              mb={0}
            >
              <NumberIncrementStepper border="none">
                <PlusCircle isActive={isAmountInputFocused} cursor="pointer" />
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
              onFocus={handleAddressInputFocus}
              onBlur={() => setIsAddressInputFocused(false)}
              border="1px solid"
              bg="--Sand-Light-1"
              {...getComputedInputStyles(errors, 'address')}
            />
            <InputRightElement>
              <GenerateAddress isActive={isAddressInputFocused} />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
        </FormControl>
        <Button w="full" variant="black" type="submit" isDisabled={!isValid}>
          Continue
        </Button>
      </Card>
    </form>
  );
};

export default GenerateTransaction;
