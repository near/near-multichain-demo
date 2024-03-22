import {
  FormControl,
  FormErrorMessage,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '@/components/Button';
import Card from '@/components/Card';
import PageTitle from '@/components/PageTitle';

const schema = yup.object().shape({
  email: yup.string().email().required('This is required'),
});

const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (values: { email: any }) => {};

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
