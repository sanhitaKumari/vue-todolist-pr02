<!-- Sanhita Kumari
ToDo List - Vue -->

<template>

  <!-- Importing and recognizing ToDo -->
  <div id="app">
    <ToDo>
  </div>
</template>

<script>

//Importing toastr
import ToDo from './components/ToDo.vue';
import { ref } from "vue"

//Importing jquery for validation
import $ from 'jquery';

export default {
  name: 'App',
  components: {
    ToDo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 8px;
}
</style>
