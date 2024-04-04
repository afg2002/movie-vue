<template>
    <div>
        <v-row v-if="bookingsData.length > 0">
            <v-col v-for="(booking, index) in bookingsData" :key="index" cols="12" sm="6" md="4">
                <v-card class="mb-4" :style="{ minHeight: '450px' }"> 
                <v-img :src="booking.moviePoster" height="300"></v-img>
                <v-card-title>{{ booking.movieTitle }}</v-card-title>
                <v-card-text>
                    <div>Booking ID: {{ booking.id }}</div>
                    <div>Screening Date: {{ booking.screeningDate }}</div>
                    <div>Screening Time: {{ booking.screeningTime }}</div>
                    <div v-if="booking.seatNumber">Seat Number: {{ booking.seatNumber.join(',') }}</div>
                    <div>Status: {{ booking.status }}</div>
                </v-card-text>
               
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <p class="text-center">No bookings found.</p>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name : 'BookingHistoryViewTabSuccess',
    props : {
        bookingsData : {
            type : Array[Object],
            default : ()=>[{
                moviePoster : '',
                movieTitle : '',
                id: '',
                screeningDate : '',
                screeningTime : '',
                seatNumber : [],
                status : ''
            }]
        }
    },
    data(){
        return {
            bookingsArray : [],
        }
    },
    
}
</script>

<style>

</style>