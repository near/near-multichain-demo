// Button.js
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import ButtonSpinner from './ButtonSpinner';

export default function Button(props: ButtonProps) {
  return (
    <ChakraButton spinner={<ButtonSpinner />} {...props}>
      {props.children}
    </ChakraButton>
  );
}
