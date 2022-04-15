import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="white" py={6} borderTop="1px" borderColor="gray.200">
      <Container maxW="7xl">
        <Flex justify="space-between" align="center">
          <Text color="gray.500">© 2024 Eventurely. All rights reserved.</Text>
          <Flex gap={4}>
            <Link href="#" color="gray.500">
              Privacy Policy
            </Link>
            <Link href="#" color="gray.500">
              Terms of Service
            </Link>
            <Link href="#" color="gray.500">
              Contact Us
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer; 