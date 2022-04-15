import { Center, Spinner } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingSpinner = ({ size = 'xl' }: LoadingSpinnerProps) => {
  return (
    <Center h="100%" minH="200px">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size={size}
      />
    </Center>
  );
};

export default LoadingSpinner; 