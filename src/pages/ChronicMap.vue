<template>
  <div class="ui grid">
    <div class="six wide column red">
      <form class="ui segment large form">
        <img
          src="https://i.imgur.com/18MKrkz.png"
          alt=""
          height="80px"
          srcset=""
        />
        <div class="ui message red" v-show="error">{{error}}</div>
        <div class="ui segment">
          <div class="field">
            <div
              class="ui right icon input large"
              :class="{ loading: spinner }"
            >
              <input
                type="text"
                placeholder="Seu Endereço"
                v-model="address"
                id="autocomplete"
              />
              <i class="dot circle link icon" @click="locatorButtonPressed"></i>
            </div>
          </div>

          <div class="field">
            <div class="two fields">
              <div class="field">
                <select v-model="type">
                  <option value="diabetes">Diabetes</option>
                </select>
              </div>

              <div class="field">
                <select v-model="radius">
                  <option value="5">5KM</option>
                  <option value="10">10KM</option>
                  <option value="15">15KM</option>
                  <option value="20">20KM</option>
                </select>
              </div>
            </div>
          </div>

           <button class="ui button" @click="findChronicMapButtonPressed">Procurar Doença ao Redor</button>
        </div>
      </form>
    </div>
    <div class="ten wide column blue"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      address: "",
      error: "",
      spinner: false,
      apiKey: "AIzaSyBeYsZgDRvl1Gnn-Kbq4A1L8-Qpfb2z--w",
      lat: 0,
      lng: 0,
      type:'',
      radius:''
    };
  },

  mounted() {
    new google.maps.places.Autocomplete(this.$refs["autocomplete"], {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(-27.0266, -50.922)
        )
      });
  },

  //   autocomplete.addListener("place_changed", () => {
  //     let place = autocomplete.getPlace();
  //     console.log(place);
  //     this.showUserLocationOnTheMap(
  //       place.geometry.location.lat(),
  //       place.geometry.location.lng()
  //     );
  //   });
  // },

  methods: {
    locatorButtonPressed() {
      this.spinner = true;

      if (navigator.geolocation) {
        //Verificação de suporte do navegador
        navigator.geolocation.getCurrentPosition(
          position => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            //pegar localização atual do usuário
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );     
          },
          error => {
            this.error = "Não conseguimos encontrar sua localização";
            this.spinner = false;
          }
        );
      } else {
        this.error = error.message;
        this.spinner = false;
        console.log(
          "Seu Navegador não tem suporte de Geolocalização do Google"
        );
      }
    },
    getAddressFrom(lat, long) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=" +
            this.apiKey
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
            // console.log(response.data.results[0].formatted_address);
          }
          this.spinner = false;
        })
        .catch((error) => {
          this.error = error.message;
          this.spinner = false;
          console.log(error.message);
        });
    },
    findChronicMapButtonPressed() {
      console.log(this.lat);
      console.log(this.lng);
      console.log(this.type);
      console.log(this.radius);
    },
  }
};


//     showUserLocationOnTheMap(latitude, longitude) {
//       // Criar objeto de mapa
//       let map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 15,
//         center: new google.maps.LatLng(latitude, longitude),
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//       });

//       //Markadores no mapa
//       new google.maps.Marker({
//         position: new google.maps.LatLng(latitude, longitude),
//         map: map,
//       });
//     },
//   },
// };
</script>

<style>
.ui.button,
.dot.circle.icon {
  background-color: #ff5a5f;
  color: white;
}

.pac-icon {
  display: none;
}

.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.pac-item:hover {
  background: green;
}

.pac-item-query {
  font-size: 16px;
}

#map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: red;
}
</style>

