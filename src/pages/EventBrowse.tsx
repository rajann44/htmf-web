import {
  Box,
  Container,
  Grid,
  GridItem,
  Input,
  VStack,
  Heading,
  Text,
  Button,
  useDisclosure,
  IconButton,
  useBreakpointValue,
  HStack,
  InputGroup,
  InputAddon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';
import EventCard from '../components/EventCard';
import { useEventStore } from '../store/eventStore';
import useDebounce from '../hooks/useDebounce';
import { format } from 'date-fns';

// Mock data for demonstration
const mockEvents = [
  {
    id: '1',
    title: 'Coffee & Conversation',
    description: 'Join us for a casual coffee meetup at the local cafe.',
    date: '2024-03-20T10:00:00',
    location: 'Downtown Cafe',
    category: 'Social',
    attendees: 5,
  },
  {
    id: '2',
    title: 'Board Game Night',
    description: 'Bring your favorite board games and join us for a fun evening!',
    date: '2024-03-22T18:00:00',
    location: 'Community Center',
    category: 'Games',
    attendees: 8,
  },
  // Add more mock events as needed
];

const EventBrowse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState('');
  const { open, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { events } = useEventStore();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      event.description.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = !category || event.category.toLowerCase() === category.toLowerCase();
    const matchesDate = !dateRange || isEventInDateRange(event.date, dateRange);
    return matchesSearch && matchesCategory && matchesDate;
  });

  const isEventInDateRange = (eventDate: string, range: string) => {
    const date = new Date(eventDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    switch (range) {
      case 'today':
        return date.toDateString() === today.toDateString();
      case 'tomorrow':
        return date.toDateString() === tomorrow.toDateString();
      case 'week':
        return date >= today && date <= nextWeek;
      default:
        return true;
    }
  };

  const FilterSidebar = () => (
    <VStack gap={4} align="stretch" p={4}>
      <Heading size="md">Filters</Heading>
      
      <Box>
        <Text mb={2}>Category</Text>
        <select
          value={category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #E2E8F0',
          }}
        >
          <option value="">All Categories</option>
          <option value="social">Social</option>
          <option value="games">Games</option>
          <option value="outdoor">Outdoor</option>
          <option value="food">Food & Drink</option>
        </select>
      </Box>

      <Box>
        <Text mb={2}>Date Range</Text>
        <select
          value={dateRange}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDateRange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #E2E8F0',
          }}
        >
          <option value="">Any Time</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="week">Next 7 Days</option>
        </select>
      </Box>

      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          setCategory('');
          setDateRange('');
        }}
      >
        Clear Filters
      </Button>
    </VStack>
  );

  return (
    <Container maxW="container.xl">
      <Grid
        templateColumns={{ base: '1fr', md: '250px 1fr' }}
        gap={6}
        py={8}
      >
        {/* Desktop Filters */}
        {!isMobile && (
          <GridItem>
            <Box
              position="sticky"
              top="100px"
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
              p={4}
            >
              <FilterSidebar />
            </Box>
          </GridItem>
        )}

        {/* Mobile Filter Button */}
        {isMobile && (
          <IconButton
            aria-label="Filter events"
            onClick={onOpen}
            position="fixed"
            bottom={4}
            right={4}
            colorScheme="brand"
            size="lg"
            borderRadius="full"
          >
            <FaFilter />
          </IconButton>
        )}

        {/* Main Content */}
        <GridItem>
          <VStack gap={6} align="stretch">
            <Box>
              <InputGroup size="lg">
                <InputAddon>
                  <FaSearch />
                </InputAddon>
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </Box>

            <HStack justify="space-between">
              <Text color="gray.600">
                {filteredEvents.length} events found
              </Text>
              {category && (
                <Text color="gray.600">
                  Category: {category}
                </Text>
              )}
            </HStack>

            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              gap={6}
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <GridItem colSpan={3}>
                  <Box textAlign="center" py={10}>
                    <Text fontSize="lg" color="gray.600">
                      No events found matching your criteria
                    </Text>
                  </Box>
                </GridItem>
              )}
            </Grid>
          </VStack>
        </GridItem>
      </Grid>

      {/* Mobile Filter Drawer */}
      {isMobile && open && (
        <Box
          position="fixed"
          top={0}
          right={0}
          bottom={0}
          width="300px"
          bg="white"
          boxShadow="lg"
          zIndex={1000}
          p={4}
        >
          <Box position="relative">
            <Button
              position="absolute"
              top={2}
              right={2}
              onClick={onClose}
              variant="ghost"
              size="sm"
            >
              ✕
            </Button>
            <Heading size="md" mb={4}>Filter Events</Heading>
            <FilterSidebar />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default EventBrowse; 