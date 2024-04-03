import axios from 'axios';
import store from '@/store'


const apiClient = axios.create({
  baseURL: 'http://localhost:7070/api',
});

apiClient.defaults.headers.common['Authorization'] = store.state.token;

// Reusable function for handling API responses
const handleResponse = (response) => {
  if (response.data.data) {
    return response.data.data;
  } else {
    throw new Error('API response did not contain expected data');
  }
};

export const fetchMoviesData = async () => {
  try {
    const response = await apiClient.get('/movies/get-movies');
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;  
  }
};

export const fetchMoviesById = async (id)=>{
  try{
    const response = await apiClient.get(`/movies/get-movies/${id}`);
    return handleResponse(response)
  }
  catch(error){
    console.error('Error fetching movies data:', error);
    throw error;  
  }
}

export const fetchBookingsData = async () => {
  try {
    const response = await apiClient.get('/booking/list-booking');
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching bookings data:', error);
    throw error; // Re-throw to allow for further handling
  }
};
