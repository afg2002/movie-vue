<template>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center" style="margin-right: 30px">
        <v-toolbar-title>
          <router-link to="/movies" class="text-decoration-none white--text">Movies App</router-link>
        </v-toolbar-title>
      </div>
      <div>
        <v-btn text to="/movies">Movies</v-btn>
        <v-btn text to="/history">History</v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn text to="/profile">Profile</v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'NavbarComponent',
  };
  </script>
  