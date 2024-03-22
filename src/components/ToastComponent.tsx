import { Flex, FlexProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const ToastComponent = forwardRef<HTMLDivElement, FlexProps>(
  function FlexColumn({ children, ...props }, ref) {
    return (
      <Flex
        ref={ref}
        boxShadow="0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(0, 0, 0, 0.06)"
        borderRadius="6px"
        p="16px"
        width="350px"
        maxW="380px"
        bg="#fff"
        {...props}
      >
        {children}
      </Flex>
    );
  }
);

export default ToastComponent;
