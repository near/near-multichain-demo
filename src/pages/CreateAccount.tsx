import {
  FormControl,
  FormErrorMessage,
  Input,
  FormHelperText,
  Flex,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, RefObject, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@/components/Button';
import Card from '@/components/Card';
import PageTitle from '@/components/PageTitle';
import useVerificationCode from '@/hooks/useVerificationCode';

const steps = {
  GET_STARTED: 'GET_STARTED',
  VERIFY_EMAIL: 'VERIFY_EMAIL',
};

const schema = yup.object().shape({
  email: yup.string().email().required('This is required'),
  code: yup
    .array()
    .required('This is required')
    .length(6)
    .of(yup.string().length(1)),
});

const CreateAccount = () => {
  const [currentStep, setCurrentStep] = useState(steps.VERIFY_EMAIL);

  const { inputRefs, onInputChange, code, onPaste } = useVerificationCode();

  console.log('code ', code);

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

  useEffect(() => {
    setValue('code', code);
  }, [code, setValue]);

  const onSubmitForm = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Card gap="32px">
        {currentStep === steps.GET_STARTED && (
          <>
            <PageTitle>Get Started</PageTitle>
            <FormControl>
              <Input placeholder="name@youremail.com" {...register('email')} />
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
          </>
        )}

        {currentStep === steps.VERIFY_EMAIL && (
          <>
            <PageTitle>Check Your Email</PageTitle>
            <FormControl>
              <Flex mb={2} justify="space-between">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Input
                    onPaste={onPaste}
                    key={index}
                    name={`codes.${index}`}
                    ref={
                      inputRefs[index] as unknown as RefObject<HTMLInputElement>
                    }
                    height="40px"
                    width="40px"
                    onChange={e => onInputChange(index, e)}
                    value={formValues.code?.[index]}
                  />
                ))}
              </Flex>
              <Flex align="center" gap={1} mt={1}>
                <FormHelperText
                  fontSize="12px"
                  fontWeight={450}
                  lineHeight="140%"
                  color="--Sand-Light-11"
                  mt={0}
                >
                  Need a new code?
                </FormHelperText>
                <ChakraButton
                  color="--Violet-Light-8"
                  variant="link"
                  fontSize="12px"
                  fontWeight={450}
                >
                  Resend Email
                </ChakraButton>
              </Flex>
              <FormErrorMessage>
                {errors?.email?.message && errors.email.message.toString()}
              </FormErrorMessage>
            </FormControl>{' '}
          </>
        )}

        <Button w="full">Continue</Button>
      </Card>
    </form>
  );
};
export default CreateAccount;
