import { Flex, Box, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { useAuth } from '@/context/AuthContext';

const CreateAccount = () => {
  const { fastAuthWallet, signedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () =>
    fastAuthWallet?.signIn({
      contractId: 'near-social',
      isRecovery: true,
    });

  const handleCreateAccount = () =>
    fastAuthWallet?.signIn({
      contractId: 'near-social',
      isRecovery: false,
    });

  useEffect(() => {
    if (signedIn) {
      navigate('/generate-transaction');
    }
  }, [navigate, signedIn]);

  return (
    <Card gap="35px" pt="25px">
      <Button w="full" variant="green" onClick={handleSignIn}>
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
