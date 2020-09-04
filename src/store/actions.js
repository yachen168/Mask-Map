import Axios from "@/api/config";

export default {
  async getStoresInfo({ commit }) {
    const response = await Axios.get();
    commit("setStoresInfo", response.data.features);
  },
  getUserCoords({ commit }) {
    navigator.geolocation.getCurrentPosition(position => {
      const userCoords = position.coords;
      commit("setUserCoords", [userCoords.latitude, userCoords.longitude]);
    });
  }
};
