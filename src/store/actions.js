import Axios from "@/api/config";

export default {
  async getStoresInfo({ commit }) {
    const response = await Axios.get();
    commit("setStoresInfo", response.data.features);
  }
};
