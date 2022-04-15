import { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from '@chakra-ui/react';
import { useAuthContext } from '../contexts/AuthContext';
import { useEventStore } from '../store/eventStore';
import EventCard from '../components/EventCard';

const Profile = () => {
  const { user } = useAuthContext();
  const { events } = useEventStore();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const toast = useToast();

  const userEvents = events.filter((event) =>
    event.attendees.includes(user?.id || '')
  );

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="4xl" mx="auto">
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Avatar
            size="2xl"
            name={user?.name}
            src={user?.avatar}
            mb={4}
          />
          <Heading size="lg">{user?.name}</Heading>
          <Text color="gray.600">{user?.email}</Text>
        </Box>

        <Tabs>
          <TabList>
            <Tab>Profile</Tab>
            <Tab>My Events</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <form onSubmit={handleUpdateProfile}>
                <VStack spacing={4}>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      type="email"
                    />
                  </FormControl>

                  <Button type="submit" colorScheme="blue" alignSelf="flex-end">
                    Update Profile
                  </Button>
                </VStack>
              </form>
            </TabPanel>

            <TabPanel>
              {userEvents.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {userEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </SimpleGrid>
              ) : (
                <Text textAlign="center" color="gray.600">
                  You haven't joined any events yet.
                </Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default Profile; 