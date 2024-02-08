import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { match } from 'ts-pattern';
import ButtonSpinner from './ButtonSpinner';

type ButtonProps = ChakraButtonProps & {
  variant?: 'green' | 'black' | 'red';
};

const commonProps: ChakraButtonProps = {
  h: '48px',
  p: '8px 24px',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  borderRadius: '50px',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '150%',
  _hover: { opacity: 1 },
  _active: { opacity: 1 },
  _disabled: {
    opacity: 1,
    color: '--Sand-Light-8',
    bg: '--Sand-Light-3',
    borderColor: 'transparent',
    cursor: 'default',
  },
  spinner: <ButtonSpinner />,
  _loading: {
    borderColor: '--Sand-Light-6',
    bg: '--Sand-Light-1',
  },
};

export default function Button({ variant = 'green', ...props }: ButtonProps) {
  return match(variant)
    .with('green', () => <GreenButton {...props} />)
    .with('black', () => <BlackButton {...props} />)
    .with('red', () => <RedButton {...props} />)
    .exhaustive();
}

function GreenButton(props: ButtonProps) {
  return (
    <ChakraButton
      bg="--Green-Light-9"
      color="--Green-Light-12"
      border="1px solid"
      borderColor="--Green-Light-8"
      {...commonProps}
      {...props}
    />
  );
}

function BlackButton(props: ButtonProps) {
  return (
    <ChakraButton
      bg="--Sand-Dark-1"
      color="#fff"
      border="1px solid"
      {...commonProps}
      {...props}
    />
  );
}

function RedButton(props: ButtonProps) {
  return (
    <ChakraButton
      bg="--Red-Light-9"
      color="--Red-Light-12"
      border="1px solid"
      borderColor="--Red-Light-8"
      {...commonProps}
      {...props}
    />
  );
}
