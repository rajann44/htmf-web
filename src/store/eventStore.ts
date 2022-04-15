import { create } from 'zustand';

export interface Event {
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
  isPrivate: boolean;
}

interface EventStore {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  toggleAttendance: (eventId: string, attendee: { id: string; name: string; avatar: string }) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [
        ...state.events,
        {
          ...event,
          id: Math.random().toString(36).substr(2, 9),
          attendees: [],
        },
      ],
    })),
  updateEvent: (id, event) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, ...event } : e
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
  toggleAttendance: (eventId, attendee) =>
    set((state) => ({
      events: state.events.map((event) => {
        if (event.id === eventId) {
          const isAttending = event.attendees.some((a) => a.id === attendee.id);
          return {
            ...event,
            attendees: isAttending
              ? event.attendees.filter((a) => a.id !== attendee.id)
              : [...event.attendees, attendee],
          };
        }
        return event;
      }),
    })),
})); 