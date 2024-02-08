import {
  FormControl,
  FormErrorMessage,
  Input,
  FormHelperText,
  Flex,
  Button as ChakraButton,
  FormLabel,
  InputProps,
  ChakraProps,
  Image,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import CopySvg from '@/assets/Copy.svg';
import Button from '@/components/Button';
import Card from '@/components/Card';
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
  keyType: yup.string().required('This is required'),
  asset: yup.string().required('This is required'),
});

const GenerateTransaction = () => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    watch,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const formValues = watch();

  const [isAmountInputFocused, setIsAmountInputFocused] = useState(false);

  const handleAmountInputFocus = () => {
    setIsAmountInputFocused(true);
  };

  const onSubmitForm = () => {};

  console.log('assets ', assets);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Card gap="20px">
        <PageTitle>Generate Transaction</PageTitle>
        <FormControl>
          <FormLabel {...helperTextProps} fontWeight={600}>
            Key Type
          </FormLabel>
          <Select
            options={keyTypes.map(({ name, value, iconImage }) => ({
              label: name,
              value,
              iconImage,
            }))}
            placeholder="Select..."
            {...register('keyType')}
            components={{
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              Option: KeyTypeOption,
            }}
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
            <Select
              options={assets.map(
                ({ name, value, iconImage, networkImage }) => ({
                  label: name,
                  value,
                  iconImage,
                  networkImage,
                })
              )}
              placeholder="Select..."
              {...register('asset')}
              components={{
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                Option: AssetOption,
              }}
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
            {errors?.keyType?.message && errors.keyType.message.toString()}
          </FormErrorMessage>
        </FormControl>
        <Button w="full" variant="black">
          Continue
        </Button>
      </Card>
    </form>
  );
};
export default GenerateTransaction;
