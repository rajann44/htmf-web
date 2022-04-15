import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Switch,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EventCreate = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Event created successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    navigate('/events');
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Create New Event</Heading>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Event Title</FormLabel>
              <Input
                placeholder="What's the name of your event?"
                size="lg"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Tell people what to expect..."
                size="lg"
                rows={4}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select placeholder="Select a category" size="lg">
                <option value="social">Social</option>
                <option value="games">Games</option>
                <option value="outdoor">Outdoor</option>
                <option value="food">Food & Drink</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Date & Time</FormLabel>
              <Input type="datetime-local" size="lg" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                placeholder="Where is the event taking place?"
                size="lg"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Private Event</FormLabel>
              <Switch
                isChecked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <FormHelperText ml={2}>
                Private events are only accessible via a unique link
              </FormHelperText>
            </FormControl>

            <Button
              type="submit"
              colorScheme="brand"
              size="lg"
              isLoading={isLoading}
            >
              Create Event
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default EventCreate; 