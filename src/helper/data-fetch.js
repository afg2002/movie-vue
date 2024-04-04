import axios from 'axios';
import store from '@/store'
import router from '@/router/'


const apiClient = axios.create({
  baseURL: 'http://localhost:0308/api',
});


apiClient.interceptors.request.use(async config =>{
  const token = await store.getters.getToken
  config.headers.Authorization  = token;

  return config
})

apiClient.interceptors.response.use(
  (response) => {
    if(response.data.responseCode === '03'){
      store.commit('setToken', null); 
      router.push('/')
    }
    return response;
  },
);

// Reusable function for handling API responses
const handleResponse = (response) => {
  if (response.data.data) {
    return response.data.data;
  } else {
    throw new Error('API response did not contain expected data');
  }
};

 const fetchMoviesData = async () => {
  try {
    const response = await apiClient.get('/movies/get-movies');
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;  
  }
};

 const fetchMoviesById = async (id)=>{
  try{
    const response = await apiClient.get(`/movies/get-movies/${id}`);
    return handleResponse(response)
  }
  catch(error){
    console.error('Error fetching movies data:', error);
    throw error;  
  }
}

 const fetchBookingsData = async () => {
  try {
    const response = await apiClient.get('/booking/list-booking');
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching bookings data:', error);
    throw error; // Re-throw to allow for further handling
  }
};


 const saveBooking = async (booking)=>{
  try{
    const response = await apiClient.post('/booking/add-booking',booking);
    return handleResponse(response)
  }catch(error){
    console.error('Error save booking data:', error);
    throw error; 
  }
}


 const getBookingsByMovieIdAndScreeningTime = async(movieId,screeningTime)=>{
  try{
    const response = await apiClient.get(`/booking/list-booking/${movieId}/${screeningTime}`)
    return response
  }catch(error){
    console.error('Error get booking data by movie id and screening time :', error);
    throw error; 
  }
}

 const cancelBookingById = async(bookingId) =>{
  try{
    const response = await apiClient.delete(`/booking/delete-booking/${bookingId}`);
    return response
  }catch(error){
    console.error("Error ")
  }
}

const dataFetch = {
  cancelBookingById,
  getBookingsByMovieIdAndScreeningTime,
  saveBooking,
  fetchBookingsData,
  fetchMoviesById,
  fetchMoviesData
}

export default dataFetch;
