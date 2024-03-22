import { Flex, Box, Text } from '@chakra-ui/react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useSignInRedirect } from '@/hooks/useSignInRedirect';

const CreateAccount = () => {
  const { requestAuthentication } = useSignInRedirect();

  const handleSignIn = () => requestAuthentication();

  const handleCreateAccount = () => requestAuthentication(true);

  return (
    <Card gap="35px">
      <Button w="full" onClick={handleSignIn}>
        Login
      </Button>
      <Flex
        w="full"
        justify="space-between"
        align="center"
        color="#868682"
        fontSize="13px"
        gap="6px"
      >
        <Box w="50px" h="1px" bg="#EEEEEC" />
        <Text>Don't have an account?</Text>
        <Box w="50px" h="1px" bg="#EEEEEC" />
      </Flex>
      <Button w="full" variant="black" onClick={handleCreateAccount}>
        Create account
      </Button>
    </Card>
  );
};
export default CreateAccount;
