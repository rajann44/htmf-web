import { useState } from 'react';
import { useEventStore } from '../store/eventStore';
import type { Event } from '../store/eventStore';
import { useToast } from '@chakra-ui/toast';

export const useEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { addEvent, updateEvent, deleteEvent, toggleAttendance } = useEventStore();

  const createEvent = async (eventData: Omit<Event, 'id'>) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addEvent(eventData);
      toast({
        title: 'Event created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating event',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const editEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateEvent(id, eventData);
      toast({
        title: 'Event updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating event',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeEvent = async (id: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      deleteEvent(id);
      toast({
        title: 'Event deleted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error deleting event',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttendance = async (
    eventId: string,
    attendee: { id: string; name: string; avatar: string }
  ) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toggleAttendance(eventId, attendee);
      toast({
        title: 'Attendance updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating attendance',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createEvent,
    editEvent,
    removeEvent,
    handleAttendance,
  };
}; 