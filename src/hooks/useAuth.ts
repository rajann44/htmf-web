import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const toast = useToast();

  // Simulate checking for existing session
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real app, this would check for a valid session token
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setAuthState({
            user: JSON.parse(storedUser),
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isLoading: false,
          error: 'Failed to restore session',
        });
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data
      const user: User = {
        id: '1',
        name: 'John Doe',
        email,
        avatar: 'https://bit.ly/dan-abramov',
      };

      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isLoading: false,
        error: null,
      });

      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to login';
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      toast({
        title: 'Login Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });

    toast({
      title: 'Logged out successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const register = async (name: string, email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data
      const user: User = {
        id: '1',
        name,
        email,
        avatar: 'https://bit.ly/dan-abramov',
      };

      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isLoading: false,
        error: null,
      });

      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to register';
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      toast({
        title: 'Registration Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return {
    ...authState,
    login,
    logout,
    register,
  };
}; 