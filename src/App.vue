<template>
  <div id="app">
    <v-app>
      <Navbar v-if="$route.meta.layout !== false" />
      <router-view/>
    </v-app>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<script>
import Navbar from '@/components/NavbarComponent.vue'

export default {
  components: {
      Navbar
  }
}
</script>