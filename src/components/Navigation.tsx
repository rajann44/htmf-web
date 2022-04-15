import { Box, Flex, Button, Link as ChakraLink, Avatar, Menu, MenuButton, MenuList, MenuItem, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box as="nav" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
      <Flex
        maxW="7xl"
        mx="auto"
        px={4}
        py={4}
        align="center"
        justify="space-between"
      >
        <Flex align="center" gap={8}>
          <ChakraLink as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
            Eventurely
          </ChakraLink>
          <Flex gap={4}>
            <ChakraLink as={RouterLink} to="/events">
              Browse Events
            </ChakraLink>
            {user && (
              <ChakraLink as={RouterLink} to="/events/create">
                Create Event
              </ChakraLink>
            )}
          </Flex>
        </Flex>

        <Flex align="center" gap={4}>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? '🌙' : '☀️'}
          </Button>

          {user ? (
            <Menu>
              <MenuButton>
                <Avatar size="sm" name={user.name} src={user.avatar} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Flex gap={4}>
              <Button as={RouterLink} to="/login" variant="ghost">
                Login
              </Button>
              <Button as={RouterLink} to="/register" colorScheme="blue">
                Sign Up
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation; 