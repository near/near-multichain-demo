import {
  FormControl,
  FormErrorMessage,
  Input,
  FormHelperText,
  Flex,
  Button as ChakraButton,
  InputProps,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, RefObject, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import * as process from 'process';
import Button from '@/components/Button';
import Card from '@/components/Card';
import PageTitle from '@/components/PageTitle';
import useVerificationCode from '@/hooks/useVerificationCode';
import useWalletSelector from '@/hooks/useWalletSelector';

const steps = {
  GET_STARTED: 'GET_STARTED',
  VERIFY_EMAIL: 'VERIFY_EMAIL',
};

const schema = yup.object().shape({
  email: yup.string().email().required('This is required'),
});

const CreateAccount = () => {
  const selector = useWalletSelector();

  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  console.log('errors ', errors);
  console.log('process.env ', process.env.VITE_DEMO_ACCOUNT_ID);

  const onSubmitForm = (values: { email: any }) => {
    selector
      .then((selector: any) => selector.wallet('fast-auth-wallet'))
      .then((fastAuthWallet: any) =>
        fastAuthWallet.signIn({
          contractId: 'social.near',
          email: values.email,
          isRecovery: false,
        })
      );
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Card gap="32px">
        <PageTitle>Get Started</PageTitle>
        <FormControl>
          <Input
            placeholder="name@youremail.com"
            isInvalid={!!errors?.email?.message}
            errorBorderColor="--Red-Light-9"
            {...register('email')}
          />
          <FormHelperText
            fontSize="12px"
            fontWeight={450}
            lineHeight="140%"
            color="--Violet-Light-8"
            mt="1px"
          >
            Enter your email
          </FormHelperText>
          <FormErrorMessage>
            {errors?.email?.message && errors.email.message.toString()}
          </FormErrorMessage>
        </FormControl>{' '}
        <Button w="full" type="submit">
          Continue
        </Button>
      </Card>
    </form>
  );
};
export default CreateAccount;
