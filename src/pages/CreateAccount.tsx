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

const GetStarted = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors = {} },
    watch,
    setValue,
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  return (
    <form>
      <Card gap="32px">
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
        </FormControl>

        <Button w="full">Continue</Button>
      </Card>
    </form>
  );
};
export default GetStarted;
