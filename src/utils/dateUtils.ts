import { format, parseISO, isPast, isFuture, isToday } from 'date-fns';

export const formatEventDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'EEEE, MMMM d, yyyy h:mm a');
};

export const formatEventTime = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'h:mm a');
};

export const getEventStatus = (dateString: string): 'past' | 'upcoming' | 'today' => {
  const date = parseISO(dateString);
  if (isPast(date)) return 'past';
  if (isToday(date)) return 'today';
  return 'upcoming';
};

export const isEventInPast = (dateString: string): boolean => {
  const date = parseISO(dateString);
  return isPast(date);
};

export const isEventToday = (dateString: string): boolean => {
  const date = parseISO(dateString);
  return isToday(date);
};

export const isEventUpcoming = (dateString: string): boolean => {
  const date = parseISO(dateString);
  return isFuture(date);
}; 