<template>
    <v-app>
        <v-container>
            <h1 class="text-center mb-4">Welcome to Movies Booking App</h1>
            <MoviesViewAllData/>
        </v-container>
    </v-app>
</template>

<script>

import MoviesViewAllData from './MoviesViewAllData.vue';

 export default{
    name : 'MoviesView',
    components:{
        MoviesViewAllData
    }
 }
</script>
