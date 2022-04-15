import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Icon,
  Divider,
  Avatar,
  AvatarGroup,
  useToast,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { format } from 'date-fns';

// Mock data for demonstration
const mockEvent = {
  id: '1',
  title: 'Coffee & Conversation',
  description:
    "Join us for a casual coffee meetup at the local cafe. We'll discuss interesting topics, share experiences, and make new friends in a relaxed atmosphere.",
  date: '2024-03-20T10:00:00',
  location: 'Downtown Cafe',
  category: 'Social',
  attendees: [
    { id: '1', name: 'John Doe', avatar: 'https://bit.ly/dan-abramov' },
    { id: '2', name: 'Jane Smith', avatar: 'https://bit.ly/ryan-florence' },
    { id: '3', name: 'Mike Johnson', avatar: 'https://bit.ly/kent-c-dodds' },
  ],
  isPrivate: false,
};

const EventDetails = () => {
  const { id } = useParams();
  const toast = useToast();
  const [isAttending, setIsAttending] = useState(false);
  const navigate = useNavigate();

  const handleAttend = () => {
    setIsAttending(!isAttending);
    toast({
      title: isAttending ? 'Removed from attending' : 'Added to attending',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack align="stretch" spacing={8}>
        <Box>
          <Button
            variant="ghost"
            leftIcon={<Icon as={FaCalendarAlt} />}
            onClick={() => navigate('/events')}
            mb={4}
          >
            Back to Events
          </Button>

          <VStack align="stretch" spacing={4}>
            <HStack justify="space-between">
              <Badge colorScheme="brand" fontSize="md" px={3} py={1}>
                {mockEvent.category}
              </Badge>
              {mockEvent.isPrivate && (
                <Badge colorScheme="gray">Private Event</Badge>
              )}
              <Text color="gray.500">
                {format(new Date(mockEvent.date), 'EEEE, MMMM d, yyyy h:mm a')}
              </Text>
            </HStack>

            <Heading size="xl">{mockEvent.title}</Heading>

            <HStack spacing={4}>
              <HStack>
                <Icon as={FaMapMarkerAlt} color="gray.500" />
                <Text color="gray.600">{mockEvent.location}</Text>
              </HStack>
              <HStack>
                <Icon as={FaUsers} color="gray.500" />
                <Text color="gray.600">{mockEvent.attendees.length} attending</Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Heading size="md" mb={4}>
            About this event
          </Heading>
          <Text color="gray.600" whiteSpace="pre-wrap">
            {mockEvent.description}
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={4}>
            Attendees
          </Heading>
          <AvatarGroup size="md" max={5}>
            {mockEvent.attendees.map((attendee) => (
              <Avatar
                key={attendee.id}
                name={attendee.name}
                src={attendee.avatar}
              />
            ))}
          </AvatarGroup>
        </Box>

        <Button
          colorScheme="brand"
          size="lg"
          onClick={handleAttend}
          variant={isAttending ? 'outline' : 'solid'}
        >
          {isAttending ? 'Cancel Attendance' : 'Attend Event'}
        </Button>
      </VStack>
    </Container>
  );
};

export default EventDetails; 