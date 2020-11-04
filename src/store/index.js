import Vue from "vue";
import Vuex from "vuex";
import API from "../api/service";
import L from "leaflet";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storesInfo: [],
    userCoords: [23.546162, 120.6402133], // 預設
    searchedKeywords: ""
  },
  mutations: {
    setStoresInfo(state, storesInfo) {
      state.storesInfo = storesInfo;
    },
    setUserCoords(state, userCoords) {
      state.userCoords = userCoords;
    }
  },
  actions: {
    async getStoresInfo({ commit }) {
      const response = await API.get();
      commit("setStoresInfo", response.data.features);
    },
    getUserCoords({ commit }) {
      navigator.geolocation.getCurrentPosition(position => {
        const userCoords = position.coords;
        commit("setUserCoords", [userCoords.latitude, userCoords.longitude]);
      });
    }
  },
  getters: {
    storesInfo(state) {
      return state.storesInfo.map(data => {
        let coordinate = data.geometry.coordinates;
        // format coordinate to match leaflet.js
        [coordinate[0], coordinate[1]] = [coordinate[1], coordinate[0]];
        return {
          properties: data.properties,
          coordinates: data.geometry.coordinates
        };
      });
    },
    searchCoords(state, getters) {
      const matchedStoresAreaCoords = getters.matchedStores.map(store => {
        return store.geometry.coordinates;
      })[0];
      // 若有搜尋結果，則使用搜尋結果，否則使用使用者位置
      return getters.matchedStores.length
        ? matchedStoresAreaCoords
        : state.userCoords;
    },
    userCoords(state) {
      return state.userCoords;
    },
    matchedStores(state) {
      const allStores = state.storesInfo;
      const keywords = state.searchedKeywords;

      if (state.searchedKeywords) {
        return allStores
          .filter(store => {
            return store.properties.address.includes(keywords);
          })
          .sort((a, b) => {
            return a.distance - b.distance;
          });
      } else {
        return [];
      }
    },
    storesIn1km(state) {
      const userCoords = state.userCoords;
      const allStores = state.storesInfo;
      const center = L.latLng(userCoords);
      const maxDistance = 1000;

      const storesIn1km = allStores
        .filter(store => {
          // add a key: distance to store
          store.distance = center.distanceTo(
            L.latLng([
              store.geometry.coordinates[0],
              store.geometry.coordinates[1]
            ])
          );
          return store.distance <= maxDistance;
        })
        .sort((a, b) => {
          return a.distance - b.distance;
        });

      return storesIn1km.map(store => {
        const distance = (
          center.distanceTo(
            L.latLng([
              store.geometry.coordinates[0],
              store.geometry.coordinates[1]
            ])
          ) / 1000
        ).toFixed(2);
        return { properties: store.properties, distance: distance };
      });
    },
    storeServicePeriods(state) {
      const hour_now = new Date().getHours();
      const servicePeriods = state.storesInfo.map(store => {
        return store.properties["service_periods"];
      });

      // 21:00 ~ 09:00 休息
      if (hour_now >= 21 || hour_now <= 8) {
        return servicePeriods.map(() => {
          return Array(7)
            .fill()
            .map(() => "Y");
        });
      }

      // 9:00 ~ 12:00 早
      if (hour_now >= 9 && hour_now <= 12) {
        return servicePeriods.map(period => {
          return period.slice(0, 7).split("");
        });
      }
      // 13:00 ~ 17:00 午
      if (hour_now >= 13 && hour_now <= 17) {
        return servicePeriods.map(period => {
          return period.slice(7, 14).split("");
        });
      }
      // 18:00 ~ 21:00 晚
      if (hour_now >= 18 && hour_now <= 21) {
        return servicePeriods.map(period => {
          return period.slice(14, 21).split("");
        });
      }
    }
  }
});
