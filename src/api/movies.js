import apiClient from "./config";


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

const Movies = {
  fetchMoviesById,
  fetchMoviesData
}

export default Movies