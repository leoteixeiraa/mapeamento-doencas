import Vue from 'vue'
import App from './App'
import router from './router'

import "semantic-ui-css/semantic.min.css"

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import firebase from 'firebase';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var firebaseConfig = {
  apiKey: "AIzaSyDMThZI56-xB5gIq_CxF9dnceZqO-XcUrE",
  authDomain: "saudemap-4fd5f.firebaseapp.com",
  projectId: "saudemap-4fd5f",
  storageBucket: "saudemap-4fd5f.appspot.com",
  messagingSenderId: "597349920133",
  appId: "1:597349920133:web:916ede6b6433d30fc8a8ec"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);


new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
