import { Flex, FlexProps } from '@chakra-ui/react';
import { forwardRef } from 'react';

export const Card = forwardRef<HTMLDivElement, FlexProps>(function FlexColumn(
  { children, ...props },
  ref
) {
  return (
    <Flex
      direction="column"
      ref={ref}
      boxShadow="0px -4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(0, 0, 0, 0.06)"
      borderRadius="8px"
      p="24px"
      maxW="380px"
      justify="center"
      align="center"
      border="1px solid"
      borderColor="--Sand-Light-4"
      bg="#fff"
      {...props}
    >
      {children}
    </Flex>
  );
});

export default Card;
