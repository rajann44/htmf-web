import { Box, Container, Flex, Link, Button, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navigation />
      <Box flex="1">
        <Container maxW="7xl" py={8}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 