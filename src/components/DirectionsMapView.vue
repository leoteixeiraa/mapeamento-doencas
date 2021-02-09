<template>
  <section class="map" ref="map"></section>
</template>

<script>
import { EventBus } from "@/EventBus";
export default {
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    const directionsService = new google.maps.DirectionsService();
    EventBus.$on("routes-data", (routes) => {
      this.map = new google.maps.Map(this.$refs["map"], {
        center: new google.maps.LatLng(-27.0266, -50.922),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      routes.forEach(({ origin, destination, color }) => {
        directionsService.route(
          {
            origin: origin.address,
            destination: destination.address,
            travelMode: "DRIVING",
          },
          (response, status) => {
            if (status === "OK") {
              const directionsRenderer = new google.maps.DirectionsRenderer({
                suppressMarkers: true, // marcador
                directions: response,
                map: this.map,
                polylineOptions: {
                  strokeColor: color,
                  strokeWeight: 8,
                },
                suppressPolylines: true, //ativação da linha que liga 1 marcador ao outro
              });
              this.createInfoWindowWith(origin, "marker alternate", color);
              const overviewPath = response.routes[0].overview_path;
              const middleIndex = parseInt(overviewPath.lenght / 2);
              const middleLoc = overviewPath[middleIndex];
              distanceDurationLabel.open(this.map, null);
              directionsRenderer.setDirections(response);
              directionsRenderer.setMap(this.map);
              this.createPolylineWith(
                [
                  { lat: origin.lat, lng: origin.lng },
                  { lat: overviewPath[0].lat(), lng: overviewPath[0].lng() },
                ],
                color
              );
              this.createPolylineWith(
                [
                  { lat: origin.lat, lng: origin.lng },
                  {
                    lat: overviewPath[overviewPath.lenght - 1].lat(),
                    lng: overviewPath[overviewPath.lenght - 1].lng(),
                  },
                ],
                color
              );
            }
          }
        );
      });
    });
  },
  methods: {
    createInfoWindowWith(location, icon, color) {
      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="background-color:${color};padding:5px;"><i class="${icon} icon"></i> ${location.address}`,
        position: new google.maps.LatLng(location.lat, location.lng),
      });
      infoWindow.open(this.map, null);
    },
    createPolylineWith(path, color) {
      new google.maps.Polyline({
        path,
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: 8,
        map: this.map,
      });
    },
  },
};
</script>


<style >
.map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: green;
}
.gm-style-iw button {
  display: none !important;
}
.gm-style .gm-style-iw-c {
  padding: 0px !important;
}
.gm-style-iw-d {
  overflow: hidden !important;
}
</style>