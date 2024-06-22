import axios from 'axios';

interface EventPayload {
  action: string;
  userId: number;
  timestamp: string;
}

export const sendEvent = async (payload: EventPayload): Promise<void> => {
  try {
    await axios.post('http://localhost:3003/history', payload);
  } catch (error) {
    console.error('Error sending event:', error);
  }
};
