<template>
    <v-container>
      <h1 class="text-center mb-4">Booking History</h1>
      <v-row v-if="!isLoading && bookings.length === 0">
        <v-col cols="12">
          <p class="text-center">No bookings found.</p>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="(booking, index) in bookings" :key="index" cols="12" sm="6" md="4">
          <v-card class="mb-4">
            <v-img :src="booking.moviePoster" height="300"></v-img>
            <v-card-title>{{ booking.movieTitle }}</v-card-title>
            <v-card-text>
              <div>Booking ID: {{ booking.id }}</div>
              <div>Screening Date: {{ booking.screeningDate }}</div>
              <div>Screening Time: {{ booking.screeningTime }}</div>
              <div>Seat Number: {{ booking.seatNumber }}</div>
              <div>Status: {{ booking.status }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="isLoading">
        <v-col cols="12">
          <v-skeleton-loader height="300px" type="list-item-three-line" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { fetchBookingsData,fetchMoviesById } from '@/helper/data-fetch';
  
  export default {
    name: 'BookingHistoryComponent',
    data() {
      return {
        bookings: [],
        isLoading: false,
      };
    },
    mounted() {
      this.loadBookings();
    },
    methods: {
        async loadBookings() {
            this.isLoading = true;
            try {
                // Fetch bookings data with movie IDs
                const bookings = await fetchBookingsData();
                // Fetch movie details for each booking
                const bookingsWithMovies = await Promise.all(
                bookings.map(async (booking) => {
                    const movie = await fetchMoviesById(booking.movieId);
                    return { ...booking, moviePoster: movie.poster };
                })
                );
                this.bookings = bookingsWithMovies;
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                this.isLoading = false;
            }
      },
    },
  };
  </script>
  
  <style scoped>
  .mb-4 {
    margin-bottom: 1rem;
  }
  </style>
  