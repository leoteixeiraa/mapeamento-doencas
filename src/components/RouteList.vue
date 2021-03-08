<template>
  <section class="route-list-view">
    <div class="route-list-view-header">
      <h3 class="ui header">Lista de Enfermidades</h3>

      <button class="ui button show-all" @click="showAllRoutesButtonPressed">
        Mostrar tudo
      </button>
    </div>

    <div class="ui segment" style="max-height: 750px; overflow: auto">
      <div class="ui divided items" style="overflow: auto">
        <div
          class="item"
          v-for="route in routes"
          :key="route.id"
          @click="routeItemPressed(route)"
          :style="{ 'background-color': route.color }"
        >
          <div>
            <i class="male alternate icon"></i>
            <b>Nome: </b
            >{{
              route.cadastroIndividualTransport.identificacaoUsuarioCidadao
                .nomeCidadao
            }}
          </div>
          <div>
            <b-button @click="abrirModal(route)" v-b-modal.modal
              >Abrir Modal</b-button
            >
          </div>
        </div>
      </div>
      <b-modal v-if="currentRoute" id="meuModal" title="BootstrapVue">
        <p class="my-4">
          {{
            currentRoute.cadastroIndividualTransport.identificacaoUsuarioCidadao
              .nomeCidadao
          }}
        </p>
      </b-modal>
    </div>
  </section>
</template>


<script>
import firebase from "firebase";
import { EventBus } from "@/EventBus";

export default {
  components: {},
  data() {
    return {
      routes: [],
      currentRoute: false,
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
    abrirModal(route) {
      this.currentRoute = route;
      this.$bvModal.show("meuModal");
    },
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

.ui.segment.item {
  position: relative;
  background: #fff;
  box-shadow: 0px 1px 2px 0 rgba(34, 36, 38, 0.15);
  margin: 1rem 0;
  padding: 1em;
  border-radius: 0.25rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  cursor: pointer;
}
.item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.show-all {
  padding: 4px 12px;
}
</style>