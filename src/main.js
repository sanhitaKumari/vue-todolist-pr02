// Sanhita Kumari
// ToDo List - Vue

const { createApp } = require('vue');
import App from './App.vue';

//Importing bootstrap for form and button/toastr
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import toastr from 'toastr';

//Importing Modal
import { Modal } from 'usemodal-vue3';

//Importing Font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faList,
  faCirclePlus,
  faPenToSquare,
  faBan,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//Adding Icons
library.add(faList);
library.add(faCirclePlus);
library.add(faPenToSquare);
library.add(faBan);
library.add(faCircleXmark);

//Initiating
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
