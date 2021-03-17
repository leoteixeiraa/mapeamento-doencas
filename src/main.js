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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""

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
