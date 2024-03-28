import {
  Flex,
  Text,
  Stack,
  IconButton,
  Image,
  Heading,
} from '@chakra-ui/react';
import { useAuth } from '@/context/AuthContext';

const NavBar = () => {
  const { signOut, accountId, signedIn } = useAuth();

  return (
    <Flex align="center" p="24px 0" alignSelf="stretch" justify="space-between">
      <Stack spacing={0}>
        <Heading
          color="--Sand-Light-12"
          fontSize="20px"
          fontWeight={500}
          lineHeight="130%"
          letterSpacing="0.3px"
          my={0}
          fontFamily="FK Grotesk"
        >
          Multi Chain Demo
        </Heading>
        {signedIn && (
          <Text
            color="--Sand-Light-11"
            fontSize="12px"
            fontWeight={450}
            lineHeight="140%"
            letterSpacing="0.24px"
          >
            {accountId}
          </Text>
        )}
      </Stack>
      {signedIn && (
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
          icon={<Image src="/images/SignOut.svg" />}
          onClick={signOut}
        />
      )}
    </Flex>
  );
};
export default NavBar;
