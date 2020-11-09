<template>
  <section class="ui two column centered grid">
    <div class="column">
      <form class="ui segment large form">
        <div class="ui message red" v-show="error">{{error}}</div>
        <div class="ui segment">
          <div class="field">
            <div class="ui right icon input large" :class="{loading:spinner}">
              <input type="text" placeholder="Seu Endereço" v-model="address" />
              <i class="dot circle link icon" @click="locatorButtonPressed"></i>
            </div>
          </div>
          <button class="ui button">Processar</button>
          <button class="ui button green">Enviar XML</button>
        </div>
      </form>
    </div>
  </section>
</template> 

<script>
import axios from "axios"

export default {

    data() {
      return {
        address: "",
        error:  "",
        spinner: false
      }
    },

  methods: {
    locatorButtonPressed() {

      this.spinner = true;

      if (navigator.geolocation) {
        //Verificação de suporte do navegador
        navigator.geolocation.getCurrentPosition(
          position => {
            //pegar localização atual do usuário
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude)
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
          "Seu Navegador não tem suporte de Geolocalização do Google");
      }
    },
    getAddressFrom(lat, long) {
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" 
          + lat +
            "," +
            long +
            "&key=AIzaSyBeYsZgDRvl1Gnn-Kbq4A1L8-Qpfb2z--w")
        .then(response => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
            console.log(response.data.error_message);
          }else{
            this.address = response.data.results[0].formatted_address
            // console.log(response.data.results[0].formatted_address);
          }
          this.spinner = false;
        })
        .catch(error => {
          this.error = error.message;
          console.log(error.message);
        })
    }
  }
};
</script>

<style>
.ui.button,
.dot.circle.icon {
  background-color: #ff5a5f;
  color: white;
}
</style>