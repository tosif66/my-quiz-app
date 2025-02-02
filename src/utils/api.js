import axios from 'axios';

export const fetchQuizData = async () => {
  try {
    const response = await axios.get('/api/Uw5CrX'); // Use the proxy path
    const data = response.data;
    console.log('Api working ');
    return data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};