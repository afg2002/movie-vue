<template>
  <v-main>
    <v-container v-if="!isLoading">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card v-if="movie" class="movie-detail">
            <v-row no-gutters>
              <v-col cols="12" md="4">
                <v-img :src="movie.poster" class="movie-poster"></v-img>
              </v-col>
              <v-col cols="12" md="8">
                <div class="mx-2">
                  <v-card-title class="text-h5">{{ movie.title }}</v-card-title>
                  <v-divider class="mb-3"></v-divider>
                  <v-card-subtitle class="text-overline">Genre</v-card-subtitle>
                  <v-chip
                    class="mr-2"
                    v-for="(genreItem, index) in movie.genre.split(',')"
                    :key="index"
                    >{{ genreItem.trim() }}</v-chip
                  >
                  <v-divider class="my-3"></v-divider>
                  <v-card-subtitle class="text-overline">Rating</v-card-subtitle>
                  <v-rating length="10" v-model="movie.rating" half-increments readonly></v-rating>
                  <v-divider class="my-3"></v-divider>
                  <v-card-subtitle class="text-overline">Release Date</v-card-subtitle>
                  <v-card-subtitle>{{ formattedDate }}</v-card-subtitle>
                  <v-divider class="my-3"></v-divider>
                  <v-card-subtitle class="text-overline">Description</v-card-subtitle>
                  <v-card-text>{{ movie.description }}</v-card-text>
                </div>
              </v-col>
            </v-row>
            <div class="mx-2 mt-6">
              <v-divider class="mb-3"></v-divider>
              <v-card-subtitle class="text-overline">Seat Selection</v-card-subtitle>
              <v-row>
                <v-col v-for="row in rows" :key="row" cols="12">
                  <v-row justify="center">
                    <v-col v-for="seat in seats" :key="`${row}${seat}`" cols="auto">
                      <v-btn
                        outlined
                        :color="isSelected(`${row}${seat}`) ? 'primary' : 'default'"
                        @click="toggleSeat(`${row}${seat}`)"
                        >{{ `${row}${seat}` }}</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </v-card>
          <p v-else-if="error" class="error-message">{{ error }}</p>
          <p v-else class="loading-message">Loading...</p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { fetchMoviesById } from '@/helper/data-fetch.js';

export default {
  name: 'MoviesDetailComponent',
  data() {
    return {
      movie: null,
      isLoading: true,
      error: null,
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      seats: Array.from({ length: 10 }, (_, i) => i + 1),
      selectedSeats: [],
    };
  },
  computed: {
    formattedDate() {
      if (this.movie && this.movie.releaseDate) {
        const date = new Date(this.movie.releaseDate);
        return date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      }
      return '';
    },
  },
  created() {
    this.fetchMovieDetail(this.$route.params.id);
  },
  methods: {
    async fetchMovieDetail(id) {
      this.isLoading = true;
      this.error = null;
      try {
        this.movie = await fetchMoviesById(id);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
        this.error = 'Failed to fetch movie detail.';
      } finally {
        this.isLoading = false;
      }
    },
    toggleSeat(seat) {
      if (this.selectedSeats.includes(seat)) {
        this.selectedSeats = this.selectedSeats.filter((s) => s !== seat);
      } else {
        this.selectedSeats.push(seat);
      }
      console.log('Selected seats:', this.selectedSeats);
    },
    isSelected(seat) {
      return this.selectedSeats.includes(seat);
    },
  },
};
</script>