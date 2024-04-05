import apiClient from "./config";


const handleResponse = (response) => {
    if (response.data.data) {
      return response.data.data;
    } else {
      throw new Error('API response did not contain expected data');
    }
  };

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


  const Booking = {
    cancelBookingById,
    getBookingsByMovieIdAndScreeningTime,
    fetchBookingsData,
    saveBooking
  }

  export default Booking;