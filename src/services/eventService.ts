import { Event } from '../types/event';

const API_URL = 'http://localhost/src/server'; // Update this with your actual server URL

export const getEvents = async (): Promise<Event[]> => {
  const response = await fetch(`${API_URL}/events.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }
  return response.json();
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  const response = await fetch(`${API_URL}/events.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error('Failed to create event');
  }
  return response.json();
};

export const deleteEvent = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/events.php?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
};