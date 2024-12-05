import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

const toast = useToast();
export default {
  state: {
    addmodal: false,
    total: 0,
    loading: false,
    isLoading: null,
    fetchsuccess: false,
    deletesuccess: false,
    getsuccess: false,
    addsuccess: false,
    updatesuccess: false,
    // for edit
    editModal: false,
    editName: "",
    editassignto: null,
    editStartDate: null,
    editEndDate: null,
    editcta: null,
    editId: null,
    editdesc: null,
    department: null,
    departments: [],
  },
  getters: {
    departments: (state) => state.departments,
  },
  mutations: {
    fetchBegin(state) {
      state.loading = true;
      state.error = null;
      state.fetchsuccess = false;
    },
    fetchSuccess(state, { data, totalCount }) {
      state.loading = false;
      state.success = true;
      state.departments = data;
      state.total = totalCount;
    },
    fetchErr(state, err) {
      state.loading = false;
      state.error = err;
      state.success = false;
    },
    updateBegin(state) {
      state.loading = true;
      state.error = null;
      state.updatesuccess = false;
    },
    updateSuccess(state) {
      state.loading = false;
      state.updatesuccess = true;
    },
    updateErr(state, err) {
      state.loading = false;
      state.error = err;
      state.updatesuccess = false;
    },
    deleteBegin(state) {
      state.loading = true;
      state.error = null;
      state.deletesuccess = false;
    },
    deleteSuccess(state) {
      state.loading = false;
      state.deletesuccess = true;
    },
    deleteErr(state, err) {
      state.loading = false;
      state.error = err;
      state.deletesuccess = false;
    },
    addBegin(state) {
      state.loading = true;
      state.error = null;
      state.addsuccess = false;
    },
    addSuccess(state) {
      state.loading = false;
      state.addsuccess = true;
    },
    addErr(state, err) {
      state.loading = false;
      state.error = err;
      state.addsuccess = false;
    },
    //
    addDepartment(state, data) {
      state.isLoading = true;

      setTimeout(() => {
        state.departments.unshift(data);
        state.isLoading = false;
        toast.success -
          500("Department added", {
            timeout: 2000,
          });
      }, 1500);
      state.addmodal = false;
    },
    // removeDepartment
    removeDepartment(state, data) {
      state.departments = state.departments.filter(
        (item) => item.id !== data.id
      );
      toast.error("Department Removed", {
        timeout: 2000,
      });
    },
    // updateDepartment
    updateDepartment(state, data) {
      state.department = data;
      state.editModal = true;
    },
    // openDepartment
    openDepartment(state) {
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
    async getDepartments({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_DEPARTMENT}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },
    async getDepartmentById({ commit }, id) {
      try {
        commit("getBegin");
        const response = await DataService.get(
          `${urls.GET_DEPARTMENT_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getSuccess", response.data.data);
        }
      } catch (err) {
        commit("getErr", err);
      }
    },
    async addDepartment({ commit }, data) {
      try {
        commit("addBegin");
        const response = await DataService.post(urls.CREATE_DEPARTMENT, data);
        if (response.status === 200) {
          commit("addSuccess");
        }
      } catch (err) {
        commit("addErr", err);
      }
    },
    // removeDepartment
    async removeDepartment({ commit }, id) {
      try {
        commit("deleteBegin");
        const response = await DataService.delete(
          `${urls.DELETE_DEPARTMENT}?id=${id}`
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },
    async editDepartment({ commit }, data) {
      try {
        commit("updateBegin");
        const response = await DataService.put(
          `${urls.UPDATE_DEPARTMENT}`,
          data
        );
        if (response.status === 200) {
          commit("updateSuccess");
        }
      } catch (err) {
        commit("updateErr", err);
      }
    },
    // updateDepartment
    updateDepartment({ commit }, data) {
      commit("updateDepartment", data);
    },
    // eopen department
    openDepartment({ commit }) {
      commit("openDepartment");
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
