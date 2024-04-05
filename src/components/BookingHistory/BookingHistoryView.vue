<template>
    <v-app>
        <v-container>
            <h1 class="text-center mb-4">Booking History</h1>
            <BookingHistoryViewTab/>
        </v-container>
    </v-app>
</template>

<script>
import BookingHistoryViewTab from '@/components/BookingHistory/BookingHistoryViewTab.vue'

 export default{
    name : 'BookingHistoryView',
    components : {
        BookingHistoryViewTab
    }
 }
</script>
