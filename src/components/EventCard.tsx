import {
  Box,
  Heading,
  Text,
  Badge,
  HStack,
  VStack,
  Icon,
} from '@chakra-ui/react';
import type { LinkProps, StackProps, HeadingProps, TextProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  attendees: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/events/${event.id}`)}
      cursor="pointer"
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        bg="white"
        borderRadius="lg"
        boxShadow="sm"
        p={6}
        transition="all 0.2s"
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        }}
      >
        <VStack align="stretch" gap={4}>
          <HStack justify="space-between">
            <Badge colorScheme="brand">{event.category}</Badge>
            <Text fontSize="sm" color="gray.500">
              {format(new Date(event.date), 'MMM d, yyyy h:mm a')}
            </Text>
          </HStack>

          <Heading size="md" truncate>
            {event.title}
          </Heading>

          <Text color="gray.600" truncate>
            {event.description}
          </Text>

          <VStack align="stretch" gap={2}>
            <HStack>
              <Icon as={FaMapMarkerAlt} color="gray.500" />
              <Text fontSize="sm" color="gray.600">
                {event.location}
              </Text>
            </HStack>

            <HStack>
              <Icon as={FaUsers} color="gray.500" />
              <Text fontSize="sm" color="gray.600">
                {event.attendees.length} attending
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default EventCard; 