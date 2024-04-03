<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card elevation="12">
              <v-card-title class="headline font-weight-bold">
                Movies App
                <v-spacer></v-spacer>
                <v-icon large>mdi-movie-open</v-icon>
              </v-card-title>
              <v-card-text>
                
              <v-alert type="error" v-if="errorMessage">{{ errorMessage }}</v-alert>
                <v-form @submit.prevent="login">
                  <v-text-field
                    label="Username"
                    v-model="username"
                    prepend-inner-icon="mdi-account-circle"
                    outlined
                    dense
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    prepend-inner-icon="mdi-lock"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    outlined
                    dense
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'LoginComponent',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      errorMessage: '',
    };
  },
  methods: {
    ...mapActions(['setToken', 'setProfile']),
    login() {
      const credentials = {
        username: this.username,
        password: this.password,
      };

      axios
        .post('http://localhost:7070/api/users/login', credentials)
        .then((response) => {
          if(response.data.responseCode === '02' || response.data.responseCode === '01'){
            this.errorMessage = response.data.responseMessage
            setTimeout(() => {
              this.errorMessage = null
            }, 3000);
          }else if(response.data.responseCode === '00'){
              const token  = response.data.data.token
              const profile = response.data.data
              this.setToken(token);
              this.setProfile(profile);
              this.$router.push('/movies');
          }
        })
    },
  },
};
</script>