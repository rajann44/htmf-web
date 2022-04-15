import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaUsers, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg="brand.500"
        color="white"
        py={20}
        px={4}
        textAlign="center"
        borderRadius="xl"
        mb={12}
      >
        <Container maxW="container.md">
          <VStack spacing={6}>
            <Heading as="h1" size="2xl">
              Build Genuine Friendships Through Casual Meetups
            </Heading>
            <Text fontSize="xl" opacity={0.9}>
              Join Eventurely to discover and create casual gatherings in your area.
              No pressure, just genuine connections.
            </Text>
            <HStack spacing={4}>
              <Button
                as={RouterLink}
                to="/events"
                size="lg"
                colorScheme="whiteAlpha"
                variant="solid"
              >
                Browse Events
              </Button>
              <Button
                as={RouterLink}
                to="/events/create"
                size="lg"
                colorScheme="whiteAlpha"
                variant="outline"
              >
                Create Event
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={12}>
        <VStack spacing={4} align="start">
          <Icon as={FaUsers} w={10} h={10} color="brand.500" />
          <Heading size="md">Casual Connections</Heading>
          <Text color="gray.600">
            Meet new people through shared interests and activities in a relaxed,
            pressure-free environment.
          </Text>
        </VStack>

        <VStack spacing={4} align="start">
          <Icon as={FaMapMarkerAlt} w={10} h={10} color="brand.500" />
          <Heading size="md">Local Events</Heading>
          <Text color="gray.600">
            Discover gatherings in your area, from coffee meetups to outdoor
            activities and game nights.
          </Text>
        </VStack>

        <VStack spacing={4} align="start">
          <Icon as={FaCalendarAlt} w={10} h={10} color="brand.500" />
          <Heading size="md">Flexible Scheduling</Heading>
          <Text color="gray.600">
            Create spontaneous meetups or plan ahead. Join events that fit your
            schedule.
          </Text>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};

export default Home; 