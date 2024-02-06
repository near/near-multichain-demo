import { Text } from '@chakra-ui/react';
import React from 'react';

type PageTitleProps = {
  children: React.ReactNode;
};
const GetStarted: React.FC<PageTitleProps> = ({ children }) => (
  <Text
    fontWeight={700}
    fontSize="24px"
    lineHeight="130%"
    color="--Sand-Light-12"
    fontFamily="FK Grotesk Monospaced"
  >
    {children}
  </Text>
);
export default GetStarted;
