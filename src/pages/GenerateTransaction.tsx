import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Flex,
  FormLabel,
  ChakraProps,
  Image,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import CopySvg from '@/assets/Copy.svg';
import Button from '@/components/Button';
import Card from '@/components/Card';
import GenerateAddress from '@/components/GenerateAddress';
import PageTitle from '@/components/PageTitle';
import PlusCircle from '@/components/PlusCircle';
import { Select, KeyTypeOption, AssetOption } from '@/components/select';
import assets from '@/data/assets';
import keyTypes from '@/data/keyTypes';

const helperTextProps: ChakraProps = {
  fontSize: '12px',
  fontWeight: 450,
  lineHeight: '140%',
  letterSpacing: '0.24px',
  my: '2px',
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

const GenerateTransaction = () => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    control,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const [isAmountInputFocused, setIsAmountInputFocused] = useState(false);
  const [isAddressInputFocused, setIsAddressInputFocused] = useState(false);

  const handleAmountInputFocus = () => {
    setIsAmountInputFocused(true);
  };

  const handleAddressInputFocus = () => {
    setIsAddressInputFocused(true);
  };

  const onSubmitForm = (values: Record<string, unknown>) => {
    console.log('values ', values);
  };

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
                options={keyTypes.map(({ name, value, iconImage }) => ({
                  label: name,
                  value,
                  iconImage,
                }))}
                onChange={e => {
                  field.onChange(e);
                }}
                placeholder="Select..."
                components={{
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  Option: KeyTypeOption,
                }}
              />
            )}
          />
          <FormHelperText {...helperTextProps} color="--Sand-Light-11">
            No confirmation required
          </FormHelperText>
          <FormErrorMessage>
            {errors?.keyType?.message && errors.keyType.message.toString()}
          </FormErrorMessage>
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
                  options={assets.map(
                    ({ name, value, iconImage, networkImage }) => ({
                      label: name,
                      value,
                      iconImage,
                      networkImage,
                    })
                  )}
                  onChange={e => {
                    field.onChange(e);
                  }}
                  placeholder="Select..."
                  components={{
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    Option: AssetOption,
                  }}
                />
              )}
            />

            <FormHelperText {...helperTextProps} color="--Sand-Light-11">
              Ethereum Testnet Network{' '}
            </FormHelperText>
            <FormErrorMessage>
              {errors?.keyType?.message && errors.keyType.message.toString()}
            </FormErrorMessage>
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
            aria-label="Logout"
            icon={<Image src={`${CopySvg}`} />}
          />
        </Flex>
        <FormControl>
          <FormLabel {...helperTextProps} fontWeight={600}>
            Amount
          </FormLabel>
          <NumberInput defaultValue={0.01} step={0.01}>
            <NumberInputField
              {...register('amount')}
              h="40px"
              p="8px 12px"
              borderRadius="6px"
              border="1px solid"
              borderColor="--Sand-Light-6"
              bg="--Sand-Light-1"
              _focus={{
                outline: 'none',
                borderColor: '--Sand-Light-6',
                boxShadow: 'none',
              }}
              onFocus={handleAmountInputFocus}
              onBlur={() => setIsAmountInputFocused(false)}
            />
            <NumberInputStepper mr="8px">
              <NumberIncrementStepper
                border="none"
                children={<PlusCircle isActive={isAmountInputFocused} />}
                w="20px"
                h="20px"
              />
            </NumberInputStepper>
          </NumberInput>
          <FormHelperText {...helperTextProps} color="--Sand-Light-11">
            42.331 available{' '}
          </FormHelperText>
          <FormErrorMessage>
            {errors?.amount?.message && errors.amount.message.toString()}
          </FormErrorMessage>
        </FormControl>{' '}
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
            />
            <InputRightElement>
              <GenerateAddress isActive={isAddressInputFocused} />{' '}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors?.address?.message && errors.address.message.toString()}
          </FormErrorMessage>
        </FormControl>
        <Button w="full" variant="black" type="submit">
          Continue
        </Button>
      </Card>
    </form>
  );
};
export default GenerateTransaction;
