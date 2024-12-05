// import { v4 as uuidv4 } from "uuid";
import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
const toast = useToast();
export default {
  state: {
    addmodal: false,
    addZoneLoading: false,
    addZoneSuccess: false,
    addZoneError: null,
    isLoading: null,
    // for edit
    editModal: false,
    editName: "",
    editassignto: null,
    editStartDate: null,
    editEndDate: null,
    editcta: null,
    editId: null,
    editdesc: null,
    getZonesLoading: false,
    getZonesSuccess: false,
    getZonesError: null,
    updateZoneLoading: false,
    updateZoneSuccess: false,
    updateZoneError: null,
    deleteZoneLoading: false,
    deleteZoneSuccess: false,
    deleteZoneError: null,
    zone: null,

    zones: [],
  },
  getters: {
    zones: (state) => state.zones,
  },
  mutations: {
    addZoneBegin(state) {
      state.addZoneLoading = true;
      state.addZoneSuccess = false;
      state.addZoneError = null;
    },

    addZoneSuccess(state) {
      state.addZoneLoading = false;
      state.addZoneSuccess = true;
    },

    addZoneError(state, err) {
      state.addZoneLoading = false;
      state.addZoneSuccess = false;
      state.addZoneError = err;
    },

    getZonesBegin(state) {
      state.getZonesLoading = true;
      state.getZonesSuccess = false;
      state.getZonesError = null;
    },
    getZonesSuccess(state, data) {
      state.getZonesLoading = false;
      state.getZonesSuccess = true;
      state.getZonesError = null;
      state.zones = data;
    },
    getZonesError(state, err) {
      state.getZonesLoading = false;
      state.getZonesSuccess = false;
      state.getZonesError = err;
    },

    updateZoneBegin(state) {
      state.updateZoneLoading = true;
      state.updateZoneSuccess = false;
      state.updateZoneError = null;
    },
    updateZoneSuccess(state) {
      state.updateZoneLoading = false;
      state.updateZoneSuccess = true;
      state.updateZoneError = null;
    },
    updateZoneError(state, err) {
      state.updateZoneLoading = false;
      state.updateZoneSuccess = false;
      state.updateZoneError = err;
    },
    deleteZoneBegin(state) {
      state.deleteZoneLoading = true;
      state.deleteZoneSuccess = false;
      state.deleteZoneError = null;
    },
    deleteZoneSuccess(state) {
      state.deleteZoneLoading = false;
      state.deleteZoneSuccess = true;
      state.deleteZoneError = null;
    },
    deleteZoneError(state, err) {
      state.deleteZoneLoading = false;
      state.deleteZoneSuccess = false;
      state.deleteZoneError = err;
    },

    //

    // removeZone
    removeZone(state, data) {
      state.zones = state.zones.filter((item) => item.id !== data.id);
      toast.error("Zone Removed", {
        timeout: 2000,
      });
    },
    // updateZone
    updateZone(state, data) {
      state.zones.findIndex((item) => {
        if (item.id === data.id) {
          // store data
          state.editId = data.id;
          state.editName = data.name;
          state.editassignto = data.assignto;
          state.editStartDate = data.startDate;
          state.editEndDate = data.endDate;
          state.editcta = data.category;
          state.editdesc = data.des;

          // set data to data
          item.name = data.name;
          item.des = data.des;
          item.startDate = data.startDate;
          item.endDate = data.endDate;
          item.assignto = data.assignto;
          item.progress = data.progress;
          item.category = data.category;
        }
      });
      state.editModal = true;
    },
    //open edit zone
    openEditModal(state, data) {
      state.editModal = true;
      state.zone = data;
    },

    // openZone
    openZone(state) {
      state.addmodal = true;
    },
    // closeModal
    closeModal(state) {
      state.addmodal = false;
    },
    // closeEditModal
    closeEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async addZone({ commit }, data) {
      try {
        commit("addZoneBegin");
        const response = await DataService.post(urls.CREATE_ZONE, data);

        if (response.status === 200) {
          commit("addZoneSuccess");
        }
      } catch (err) {
        commit("addZoneError", err);
      }
    },
    async getZones({ commit }) {
      try {
        commit("getZonesBegin");
        const response = await DataService.get(urls.GET_ALL_ZONES);

        if (response.status === 200) {
          commit("getZonesSuccess", response.data.data);
        }
      } catch (err) {
        commit("getZonesError", err);
      }
    },
    async updateZone({ commit }, data) {
      try {
        commit("updateZoneBegin");
        const response = await DataService.put(urls.UPDATE_ZONE, data);

        if (response.status === 200) {
          commit("updateZoneSuccess", response.data.data);
        }
      } catch (err) {
        commit("updateZoneError", err);
      }
    },

    async deleteZone({ commit }, id) {
      try {
        commit("deleteZoneBegin");
        const response = await DataService.delete(
          `${urls.DELETE_ZONE}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteZoneSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteZoneError", err);
      }
    },
    // removeZone
    removeZone({ commit }, data) {
      commit("removeZone", data);
    },
    // updateZone

    //open edit modal
    openEditModal({ commit }, data) {
      commit("openEditModal", data);
    },
    // eopen zone
    openZone({ commit }) {
      commit("openZone");
    },

    closeModal({ commit }) {
      commit("closeModal");
    },
    // closeEditModal
    closeEditModal({ commit }) {
      commit("closeEditModal");
    },
  },
};
