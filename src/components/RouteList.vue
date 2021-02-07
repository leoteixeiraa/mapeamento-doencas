<template>
  <section class="route-list-view">
    <div class="route-list-view-header">
      <h3 class="ui header">Lista de Enfermidades</h3>

      <!-- <select>
        <option selected disabled>Selecione a Doença</option>

        <option value="">Diabético</option>
        <option value="">Hipertensão</option>

        <option value="">Aids</option>
        <option value="">insuficiência cardíaca</option>
        <option value="">AVC</option>
      </select> -->

      <select @change="sortRoute($event)">
        <option selected disabled>Ordenar</option>
        <optgroup label="Distancia">
          <option value="distance-asc">Mais perto</option>
          <option value="distance-desc">Mais Longe</option>
        </optgroup>
        <optgroup label="Duração">
          <option value="duration-asc">Mais Rápido</option>
          <option value="duration-desc">Mais Lento</option>
        </optgroup>
      </select>
      <button class="ui button show-all" @click="showAllRoutesButtonPressed">
        Mostrar tudo
      </button>
    </div>
    <div
      class="item"
      v-for="route in routes"
      :key="route.id"
      @click="routeItemPressed(route)"
      :style="{ 'background-color': route.color }"
    >
      <div>
        <i class="marker alternate icon"></i>
        {{ route.origin.address }}
      </div>
      <!-- <div>
        <i class="marker alternate icon"></i>
        {{ route.origin.diabetico ? "Diabético" : "" }}
      </div> -->
      <!-- <div>
        <i class="marker alternate icon"></i>{{ route.destination.address }}
      </div> -->
      <!-- <div class="ui label small">{{ route.distance.text }}</div> -->

      <div class="ui red horizontal label">
        {{ route.origin.diabetico ? "Diabético" : "Não Diabético" }}
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
import { EventBus } from "@/EventBus";

export default {
  data() {
    return {
      routes: [],
    };
  },
  created() {
    const db = firebase.firestore();
    db.collection("routes").onSnapshot((snap) => {
      this.routes = [];
      snap.forEach((doc) => {
        let route = doc.data();
        route.id = doc.id;
        this.routes.push(route);

        console.log(doc.data());
        console.log(doc.id);
      });
    });
  },
  methods: {
    sortRoute(e) {
      const sortName = e.target.value.split("-")[0];
      const sortOrder = e.target.value.split("-")[1];

      const db = firebase.firestore();
      db.collection("routes")
        .orderBy(sortName + ".value", sortOrder)
        .get()
        .then((snap) => {
          this.routes = [];
          snap.forEach((doc) => {
            let route = doc.data();
            route.id = doc.id;
            this.routes.push(route);
          });
        });
    },
    routeItemPressed(route) {
      EventBus.$emit("routes-data", [route]);
    },
    showAllRoutesButtonPressed() {
      EventBus.$emit("routes-data", this.routes);
    },
  },
};
</script> 

<style scoped>
.route-list-view {
  position: relative;
  z-index: 1;
  max-width: 250px;
  margin: 10px;
  background-color: white;
}

.route-list-view-header {
  padding: 10px;
}

.item {
  padding: 10px;
  cursor: pointer;
}
.item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.show-all {
  padding: 4px 10px;
}
</style>