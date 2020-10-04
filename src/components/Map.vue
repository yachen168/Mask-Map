<template>
  <div class="map">
    <l-map
      style="width: 100%; height: 100Vh;"
      ref="myMap"
      :zoom="16"
      :center="searchCoords || userCoords"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="userCoords">
        <l-icon
          :icon-url="icon.type.userLocation"
          :icon-size="icon.iconSize"
          class-name="userLocationIcon"
        ></l-icon>
      </l-marker>
      <v-marker-cluster>
        <l-marker
          ref="storesLocation"
          :lat-lng="store.coordinates"
          v-for="(store, index) in storesInfo"
          :key="index"
        >
          <l-popup>
            <h2>{{ store.properties.name }}</h2>
            <a
              class="link"
              :href="
                `https://www.google.com.tw/maps/search/${store.properties.address}`
              "
              target="_blank"
              >規劃路線</a
            >
            <a class="link" :href="`tel:+${store.phone}`">撥打電話</a>
            <div class="popup-mask-quantity">
              <StockBoard :stockOfMask="store.properties.mask_adult"
                >成人</StockBoard
              >
              <StockBoard :stockOfMask="store.properties.mask_child"
                >兒童</StockBoard
              >
            </div>
          </l-popup>
          <!-- 標記 icon -->
          <l-icon
            :icon-url="icon.type.pin"
            :icon-size="icon.iconSize"
            :icon-anchor="icon.iconAnchor"
            :popup-anchor="icon.popupAnchor"
            :shadow-size="icon.shadowSize"
          />
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import StockBoard from "./StockBoard";

export default {
  name: "MyAwesomeMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
    StockBoard
  },
  props: {
    storesInfo: {},
    userCoords: {
      type: Array
    },
    searchCoords: {
      type: Array
    }
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png", // 圖資
      icon: {
        type: {
          pin: "https://image.flaticon.com/icons/svg/252/252106.svg",
          userLocation: "https://image.flaticon.com/icons/svg/2275/2275330.svg"
        },
        iconSize: [40, 50],
        iconAnchor: [16, 45],
        popupAnchor: [5, -40]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
::v-deep .popup-mask-quantity {
  display: flex;
  width: 150px;
  justify-content: space-around;
  text-align: center;
  margin-top: 10px;
  align-items: center;
  height: 50px;
  .mask-quantity {
    width: 48%;
    padding: 3px;
    h3 {
      font-size: 16px;
    }
    h2 {
      margin: 0;
    }
  }
}

::v-deep .link {
  padding: 2px;
}

::v-deep .leaflet-popup-content {
  text-align: center;
  margin: 3px;
}
</style>
