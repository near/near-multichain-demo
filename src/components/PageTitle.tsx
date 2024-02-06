import { Heading } from '@chakra-ui/react';
import React from 'react';

type PageTitleProps = {
  children: React.ReactNode;
};
const GetStarted: React.FC<PageTitleProps> = ({ children }) => (
  <Heading
    fontWeight={700}
    fontSize="24px"
    lineHeight="130%"
    color="--Sand-Light-12"
    fontFamily="FK Grotesk"
  >
    {children}
  </Heading>
);
export default GetStarted;
