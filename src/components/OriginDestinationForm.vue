<!--
<template>
  <section class="origin-destination-form">
    <div class="ui form">
      <div class="ui message red small" v-show="error">{{ error }}</div>
      <div class="two fields">
        <div class="field">
          <div class="ui left icon input">
            <i class="marker alternate icon"></i>
            <input
              type="text"
              placeholder="Digite aqui a doença I"
              ref="origin"
            />
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="marker alternate icon"></i>
            <input
              type="text"
              placeholder="Digite aqui a doença II"
              ref="destination"
            />
          </div>
        </div>
        <button
          class="ui button small red"
          :class="{ loading: spinner }"
          @click="calculateButtonPressed"
        >
          Pesquisar
        </button>
      </div>
    </div>
  </section>
</template>
-->

 <style scoped>
.origin-destination-form {
  position: relative;
  z-index: 1;
  max-width: 610px;
  margin: 10px;
}
</style>

<script>
import axios from "axios";
import firebase from "firebase";

export default {
  data() {
    return {
      route: {
        origin: {
          address: "",
          lat: 0,
          lng: 0,
        },
        destination: {
          address:
            "UBS - Unidade Basica De Saúde - São José, Avenida Caçador, 40 - CENTRO, Fraiburgo",
          lat: -27.023756,
          lng: -50.9214803,
        },
        distance: {},
        duration: {},
      },
      error: "",
      spinner: false,
    };
  },

  mounted() {
    for (let ref in this.$refs) {
      // console.log(this.$ [ref]);
      const autocomplete = new google.maps.places.Autocomplete(
        this.$refs[ref],
        {
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(-27.0266, -50.922)
          ),
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        this.route[ref].address = `${place.name}, ${place.vicinity}`;
        this.route[ref].lat = place.geometry.location.lat();
        this.route[ref].lng = place.geometry.location.lng();
      });
    }
  },
  methods: {
    calculateButtonPressed() {
      this.spinner = true;

      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.route.origin.lat},${this.route.origin.lng}&destinations=${this.route.destination.lat},${this.route.destination.lng}&key=AIzaSyBeYsZgDRvl1Gnn-Kbq4A1L8-Qpfb2z--w`;

      axios
        .get(URL)
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
          } else {
            const elements = response.data.rows[0].elements;

            //console.log(response);

            if (elements[0].status === "ZERO_RESULTS") {
              this.error = "No Results Found.";
            } else {
              this.route.distance = elements[0].distance;
              this.route.duration = elements[0].duration;
              this.route.color = this.getRandomColor();

              this.saveRoute();
            }
            this.spinner = false;
            // this.spinner = false;
          }
        })
        .catch((error) => {
          console.log(error.message);
          this.error = error.message;
          this.spinner = false;
          // this.spinner = false;
        });
    },

    saveRoute() {
      const db = firebase.firestore();
      db.collection("routes").doc().set(this.route);
    },
    getRandomColor() {
      //GERAR UMA COR ALEATÓRIA
      let characters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>
     
