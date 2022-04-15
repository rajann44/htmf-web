import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <VStack spacing={6} textAlign="center">
        <Heading size="2xl">404</Heading>
        <Heading size="lg">Page Not Found</Heading>
        <Text color="gray.600">
          The page you're looking for doesn't exist or has been moved.
        </Text>
        <Button colorScheme="blue" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound; 