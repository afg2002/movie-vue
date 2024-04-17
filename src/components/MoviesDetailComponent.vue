<template>
    <v-container v-if="!isLoading">
      <v-row justify="center">
        <v-col cols="12" md="10" sm="8">
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
                  <v-card-subtitle class="text-overline">Screening Time</v-card-subtitle>
                  <v-card-subtitle>
                    <v-alert v-if="!selectedTime" dense outlined type="warning" colored>
                      Please select a screening time before proceeding.
                    </v-alert>
                    <v-chip
                      class="mr-2"
                      v-for="(timeItem, index) in movie.screeningTime"
                      :key="index"
                      :color="selectedTime === timeItem ? 'primary' : 'default'"
                      @click="selectTime(timeItem)"
                    >
                      {{ timeItem }}
                    </v-chip>
                  </v-card-subtitle>

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
                <v-col v-for="row in rows" :key="row" cols="12" class="d-flex">
                  <v-row justify="center">
                    <v-col v-for="seat in seats" :key="`${row}${seat}`" cols="auto">
                      <v-btn
                        outlined
                        :color="isSelected(`${row}${seat}`) ? 'primary' : 'default'"
                        @click="toggleSeat(`${row}${seat}`)"
                        :disabled="isSeatBooked(`${row}${seat}`) || !selectedTime"
                      >{{ `${row}${seat}` }}</v-btn>
                    </v-col>
                    
                  </v-row>
                </v-col>
              </v-row>
            </div>
            <v-card-actions class="mt-6">
              <v-spacer></v-spacer>   
              <v-btn color="primary" @click="showConfirmation()" :disabled="isBookNowDisabled">Book Now</v-btn>

              <v-spacer></v-spacer> 
            </v-card-actions>
          </v-card>
          <p v-else-if="error" class="error-message">{{ error }}</p>
          <p v-else class="loading-message">Loading...</p>
        </v-col>
      </v-row>


    <!-- Modal dialog konfirmasi -->
    <v-dialog v-model="confirmDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Konfirmasi Pemesanan</v-card-title>
        <!-- Menampilkan data movie -->
        <v-card-text>
          <div>Title: {{ movie.title }}</div>
          <div>Genre: {{ movie.genre }}</div>
          <div>Rating: {{ movie.rating }}</div>
          <!-- Tambahkan informasi lainnya jika diperlukan -->
        </v-card-text>
        <!-- Menampilkan seatNumber yang dipilih -->
        <v-card-text>
          <div>Seat Number:</div>
          <v-chip v-for="seat in selectedSeats" :key="seat" class="mr-2">{{ seat }}</v-chip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="confirmBooking">Ya</v-btn>
          <v-btn color="grey darken-1" text @click="confirmDialog = false">Batal</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color" :bottom="true" :right="true" >
      {{ snackbar.message }}
      <router-link v-if="snackbar.linkText" :to="{ path: '/history' }">{{ snackbar.linkText }}</router-link>
      <v-btn text color="white" @click="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    </v-container>
</template>

<script>
import Movies from '@/api/movies';
import Booking from '@/api/booking';
import store from '@/store/index.js';

export default {
  name: 'MoviesDetailComponent',
  data() {
    return {
      // Properti untuk snackbar
      snackbar: {
        show: false,
        message: '',
        timeout: 6000, // Waktu snackbar ditampilkan (ms)
        color: 'success', // Warna snackbar
        linkText: 'see history',
      },
      movie: null,
      isLoading: true,
      error: null,
      rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      seats: Array.from({ length: 10 }, (_, i) => i + 1),
      selectedSeats: [],
      selectedTime: null,
      confirmDialog: false,
      bookedSeats: []
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
    isSeatBooked() {
      const allBookedSeats = this.bookedSeats.flat();
      return (seat) => allBookedSeats.includes(seat);
    },
    isBookNowDisabled() {
      // Tombol dinonaktifkan jika tidak ada waktu yang dipilih, tidak ada kursi yang dipilih, atau kursi yang dipilih telah dipesan
      return !this.selectedTime || this.selectedSeats.length === 0 || this.selectedSeats.some(seat => this.bookedSeats.includes(seat));
    },
  },
  created() {
    this.fetchMovieDetail(this.$route.params.id);
  },
  methods: {
    showSuccessSnackbar(message) {
      this.snackbar.message = message;
      this.snackbar.show = true;
    },
    showErrorSnackbar(message) {
      this.snackbar.message = message;
      this.snackbar.color = 'error';
      this.snackbar.show = true;
    },
    showConfirmation() {
      this.confirmDialog = true
    },
    confirmBooking() {
      this.bookNow()
      this.bookedSeats.push(this.selectedSeats)
      this.selectedSeats = []
      this.confirmDialog = false
    },
    async fetchMovieDetail(id) {
      this.isLoading = true;
      this.error = null;
      try {
        this.movie = await Movies.fetchMoviesById(id);
        this.movie.screeningTime = ['09:00', '12:00', '15:00', '18:00', '20:00'];
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
    },
    isSelected(seat) {
      return this.selectedSeats.includes(seat);
    },
    selectTime(time) {
      this.selectedTime = time;
      Booking.getBookingsByMovieIdAndScreeningTime(this.movie.id, this.selectedTime)
      .then((res) => {

        const activeBookings = res.data.data.filter(booking => booking.status !== 'Cancel');

        const seatNumbers = activeBookings.map(booking => booking.seatNumber);

        this.bookedSeats = seatNumbers;
      });

    },
    bookNow() {
      if (this.selectedTime == null) {
        alert("Please select time")
        return
      } else if (this.selectedSeats.length == 0) {
        alert("Please select seat")
        return
      }

      const fillableMovie = {
        screeningDate: this.movie.releaseDate,
        screeningTime: this.selectedTime,
        seatNumber: this.selectedSeats,
        movieId: this.movie.id,
        userId: store.state.profile.userId
      }
      
      Booking.saveBooking(fillableMovie)
        .then(() => {
          this.showSuccessSnackbar('Booking successfull');
        })
        .catch(() => {
          this.showErrorSnackbar('Failed to make booking!');
        });
      }
  },
};
</script>
