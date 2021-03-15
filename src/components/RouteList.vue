<template>
  <section class="route-list-view">
    <div class="route-list-view-header">
      <h3 class="ui header">Lista de Enfermidades</h3>

      <select @change="sortRoute($event)">
        <option selected disabled>Filtrar por Doença</option>
        <optgroup label="Escolha uma doença abaixo">
          <option value="color-#6EF0A0">Hanseniase</option>
          <option value="color-#FA7846">Diabete</option>
          <option value="color-#FAACF8">Hipertensão arterial</option>
          <option value="color-#4C54D6">Cancêr</option>
          <option value="color-#38C1FF">Tuberculose</option>
          <option value="color-#45301B">AVC Derrame</option>
          <option value="color-#ABAB82">Doença Cardíaca</option>
          <option value="color-#605499">Infarto</option>
        </optgroup>
      </select>

      <button class="ui button show-all" @click="showAllRoutesButtonPressed">
        Mostrar tudo
      </button>
    </div>
    <div @change="sortRoute($event)" class="ui divided selection list">
      <a class="item">
        <a style="background: #fa7846" class="ui circular label">Diabete</a>
        <a style="background: #fae746" class="ui circular label"
          >Doença Respiratória</a
        >
        <a style="background: #6ef0a0" class="ui circular label">Hanseníase</a>
        <a style="background: #faacf8" class="ui circular label"
          >Hipertensão arterial</a
        >
        <a style="background: #4c54d6; color: white" class="ui circular label"
          >Câncer
        </a>
        <a style="background: #38c1ff" class="ui circular label"
          >Tuberculose
        </a>
      </a>
    </div>
    <div class="ui segment" style="max-height: 650px; overflow: auto">
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
          <!-- <div>
            <i class="address card alternate icon"></i>
            <b>CNES: </b> {{ route.cnesDadoSerializado }}
          </div> -->
          <div>
            <b-button @click="abrirModal(route)" v-b-modal.modal
              >+Info</b-button
            >
          </div>
        </div>
      </div>
      <b-modal v-if="currentRoute" id="meuModal" title="Informações Detalhada">
        <div>
          <i class="male alternate icon"></i>
          <b>Nome: </b
          >{{
            currentRoute.cadastroIndividualTransport.identificacaoUsuarioCidadao
              .nomeCidadao
          }}
        </div>

        <div>
          <i class="address card alternate icon"></i>
          <b>CNES: </b> {{ currentRoute.cnesDadoSerializado }}
        </div>
        <div>
          <i class="pin alternate icon"></i>
          <b>Micro Área: </b>
          {{
            currentRoute.cadastroIndividualTransport.identificacaoUsuarioCidadao
              .microArea
          }}
        </div>

        <div class="ui red horizontal label">
          {{
            currentRoute.cadastroIndividualTransport.condicoesDeSaude
              .statusTemDiabetes
              ? "Diabético"
              : "Não Diabético"
          }}
        </div>

        <a class="ui label">
          Situação Peso
          <div class="detail">
            {{
              currentRoute.cadastroIndividualTransport.condicoesDeSaude
                .situacaoPeso
            }}
          </div>
        </a>
        <div>
          <b>Causa da Internação: </b
          >{{
            currentRoute.cadastroIndividualTransport.condicoesDeSaude
              .descricaoCausaInternacaoEm12Meses
          }}
        </div>

        <div>
          <b>Outras Condições: </b
          >{{
            currentRoute.cadastroIndividualTransport.condicoesDeSaude
              .descricaoOutraCondicao1
          }}&#8212;{{
            currentRoute.cadastroIndividualTransport.condicoesDeSaude
              .descricaoOutraCondicao2
          }}
        </div>
        <div class="ui green horizontal label">
          {{
            currentRoute.cadastroIndividualTransport.condicoesDeSaude
              .statusTemDoencaRespiratoria
              ? "Tem Doença Respiratória"
              : "Não tem Doença Respiratória"
          }}
        </div>

        <div class="ui horizontal label">
          {{
            currentRoute.cadastroIndividualTransport.condicoesDeSaude
              .statusTemHanseniase
              ? "Tem hanseníase"
              : "Não tem hanseníase"
          }}
        </div>

        <div class="ui horizontal label">
          {{
            currentRoute.cadastroIndividualTransport.condicoesDeSaude
              .statusTemHipertensaoArterial
              ? "Tem Hipertensão Arterial"
              : "Não tem Hipertensão Arterial"
          }}
        </div>

        <div class="ui horizontal label">
          {{
            currentRoute.cadastroIndividualTransport.condicoesDeSaude
              .statusTemTuberculose
              ? "Tem Tuberculose"
              : "Não tem Tuberculose"
          }}
        </div>
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

        //console.log(doc.data());
        //console.log(doc.id);
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
      // console.log(sortName);
      //console.log(sortOrder);

      const db = firebase.firestore();
      db.collection("routes")
        .where(sortName + "", "==", sortOrder)
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