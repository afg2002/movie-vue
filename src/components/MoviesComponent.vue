<template>
  <v-container>
    <h1 class="text-center mb-4">Welcome to Movies Booking App</h1>
    <v-text-field v-model="search" label="Search" outlined dense clearable class="mb-4"></v-text-field>

    <v-row v-if="isLoading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="filteredMovies.length > 0">
      <v-col v-for="movie in filteredMovies" :key="movie.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="movie-card">
          <v-img :src="movie.poster" height="300"></v-img>
          <v-card-title class="text-h5">{{ movie.title }}</v-card-title>
          <v-card-text class="text-justify">{{ truncateDescription(movie.description) }}</v-card-text>
          <v-card-subtitle style="font-weight: 300; font-style: oblique;">Genre: {{ movie.genre }}</v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card-actions>
             <router-link :to="{ name: 'MoviesDetail', params: { id: movie.id } }">
               <v-btn color="primary">Book Now</v-btn> 
             </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <p class="text-center">Movies not found.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchMoviesData } from '@/helper/data-fetch';
import store from '@/store';

export default {
  name: 'MoviesComponent',
  data() {
    return {
      movies: [],
      isLoading: false,
      search: '',
      token: store.state.token
    };
  },
  mounted() {
    this.isLoading = true;
    fetchMoviesData()
      .then((movies) => {
        this.movies = movies;
      })
      .catch((error) => {
        console.error('Error fetching movies data:', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    truncateDescription(description) {
      const maxLength = 150;
      if (description.length > maxLength) {
        return description.substring(0, maxLength) + '...';
      }
      return description;
    },
  }
};
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
.movie-card {
  height: 100%;
}
</style>
