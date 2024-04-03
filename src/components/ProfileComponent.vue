<template>
    <v-app>
     <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="profile-card">
            <v-card-title class="text-h5">User Profile</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>User ID:</v-list-item-title>
                    <v-list-item-subtitle>{{ user.userId }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Nama:</v-list-item-title>
                    <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Username:</v-list-item-title>
                    <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
            <v-btn color="primary" @click="logout">Logout</v-btn>
          </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </v-app>
  </template>
  
  <script>
  import { mapState,mapActions } from 'vuex';
  
  export default {
    name: 'ProfileComponent',
    computed: {
      ...mapState({
        user: state => state.profile
      })
    },
    methods: {
        ...mapActions(['logout'])
    }
  };
  </script>
  
  <style scoped>
  .profile-card {
    margin-top: 20px;
    padding: 20px;
  }
  </style>
  