<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
        <v-tab v-for="item,i in tabsItem" :key="item.key+i" > {{ item.name }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in tabsItem" :key="item.key+'content'">
                <component v-bind:is="item.comp" :bookingsData="item.data" @on:cancelBooking="cancelBooking"/>
        </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import BookingHistoryViewTabActive from './BookingHistoryViewTabActive.vue'
import BookingHistoryViewTabSuccess from './BookingHistoryViewTabSuccess.vue'
import BookingHistoryViewTabCancel from './BookingHistoryViewTabCancel.vue'
import Bookings from '@/api/booking'
import Movies from '@/api/movies'
export default {
    name : 'BookingHistoryViewTab',
    components : {
        BookingHistoryViewTabActive,
        BookingHistoryViewTabCancel,
        BookingHistoryViewTabSuccess
    },
    async mounted(){
        await this.loadBookings()
    },
    data(){
        return {
            tab : 0 ,
            tabsItem : [{
                name : "Active",
                key : 'active',
                comp  : 'BookingHistoryViewTabActive',
                data : []
            },{
                name : "Success",
                key : "success",
                comp  : 'BookingHistoryViewTabSuccess',
                data : []
            },
            {
                name : "Cancel",
                key : "cancel",
                comp  : 'BookingHistoryViewTabCancel',
                data : [],
            },
            ],
           
        }
        
    },
    methods : {
        async cancelBooking(id){
            console.log(id)
            Bookings.cancelBookingById(id).then((res) =>{
                if(res.data.responseCode == '00' && res.data){
                    this.tabsItem[0].data = ''
                }
            })
        }
        ,
        async loadBookings() {
            this.isLoading = true;
            try {
                let bookings = await Bookings.fetchBookingsData();
                let dataActive = [];
                let dataSuccess = [];
                let dataCancel = [];
                await bookings.map(async (booking)=>{
                    let movie = await Movies.fetchMoviesById(booking.movieId);
                    booking.moviePoster = movie.poster
                    booking.movieTitle = movie.title
                    if(booking.status.toLowerCase() === 'aktif'){
                        dataActive.push(booking);
                    }else if (booking.status.toLowerCase() ==='berhasil'){
                        dataSuccess.push(booking);
                    }else{
                        dataCancel.push(booking)
                    }
                })
                this.tabsItem[0].data = dataActive
                this.tabsItem[1].data = dataSuccess
                this.tabsItem[2].data = dataCancel
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                this.isLoading = false;
            }
        }
    }
    
}
</script>
@/api/data-fetch