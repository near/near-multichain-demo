import { Flex, Text, Stack, IconButton, Image } from '@chakra-ui/react';
import SignOutSvg from '@/assets/SignOut.svg';

const NavBar = () => (
  <Flex align="center" p="24px 0" alignSelf="stretch" justify="space-between">
    <Stack spacing={0}>
      <Text
        color="--Sand-Light-12"
        fontSize="20px"
        fontWeight={500}
        lineHeight="130%"
        letterSpacing="0.3px"
        my={0}
        fontFamily="FKGroteskNeueTrial-ThinItalic-BF6576818c5cbd8"
      >
        Multi Chain Demo
      </Text>
      <Text
        color="--Sand-Light-11"
        fontSize="12px"
        fontWeight={450}
        lineHeight="140%"
        letterSpacing="0.24px"
      >
        username@email.com
      </Text>
    </Stack>
    <IconButton
      h="40px"
      w="40px"
      bg="--Sand-Light-1"
      opacity={0.9}
      _hover={{ bg: '--Sand-Light-1', opacity: 1 }}
      border="1px solid"
      borderColor="--Sand-Light-6"
      borderRadius="50px"
      colorScheme="blue"
      aria-label="Logout"
      icon={<Image src={`${SignOutSvg}`} />}
    />
  </Flex>
);
export default NavBar;
