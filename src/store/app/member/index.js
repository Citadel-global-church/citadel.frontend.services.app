import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

export default {
  state: {
    addmodal: false,
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
    roles: [],
    stats: null,
    total: 0,
    avatar: null,
    user: null,
    profile: null,
    loading: false,
    editloading: false,
    editsuccess: false,
    addloading: false,
    deleteloading: false,
    changeloading: false,
    avatarloading: false,
    profileloading: false,
    success: false,
    addsuccess: false,
    deletesuccess: false,
    changesuccess: false,
    avatarsuccess: false,
    profilesuccess: false,
    error: null,
    custstatloading: false,
    custstatsuccess: false,
    custstaterror: null,
    adminstatloading: false,
    adminstatsuccess: false,
    adminstaterror: null,
  },
  getters: {
    members: (state) => state.members,
  },
  mutations: {
    adminStatBegin(state) {
      state.adminstatloading = true;
      state.adminstatsuccess = false;
      state.adminstaterror = null;
      state.stat = null;
    },

    adminStatSuccess(state, data) {
      state.adminstatloading = false;
      state.adminstatsuccess = true;
      state.stats = data;
    },

    adminStatErr(state, err) {
      state.adminstatloading = false;
      state.adminstaterror = err;
      state.adminstatsuccess = false;
    },

    rolesSuccess(state, data) {
      state.roles = data;
    },
    profileBegin(state) {
      state.profileloading = true;
      state.profilesuccess = false;
      state.profileerror = null;
    },

    profileSuccess(state, data) {
      state.profileloading = false;
      state.profilesuccess = true;
      state.profile = data;
    },

    profileErr(state, err) {
      state.profileloading = false;
      state.error = err;
      state.profilesuccess = false;
    },
    avatarBegin(state) {
      state.avatarloading = true;
      state.avatarsuccess = false;
    },

    avatarSuccess(state, data) {
      state.avatarloading = false;
      state.avatarsuccess = true;
      state.avatar = data;
    },

    avatarErr(state, err) {
      state.avatarloading = false;
      state.error = err;
      state.avatarsuccess = false;
    },

    fetchUserBegin(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.data = [];
    },
    fetchUserSuccess(state, { data, totalCount }) {
      state.loading = false;
      state.success = true;
      state.data = data;
      state.total = totalCount;
    },
    fetchUserErr(state, err) {
      state.loading = false;
      state.error = err;
      state.success = false;
    },
    deleteBegin(state) {
      state.deleteloading = true;
      state.error = null;
      state.deletesuccess = false;
    },
    deleteSuccess(state) {
      state.deleteloading = false;
      state.deletesuccess = true;
    },
    deleteErr(state, err) {
      state.deleteloading = false;
      state.error = err;
      state.deletesuccess = false;
    },
    editBegin(state) {
      state.editloading = true;
      state.error = null;
      state.editsuccess = false;
    },
    editSuccess(state) {
      state.editloading = false;
      state.editsuccess = true;
    },
    editErr(state, err) {
      state.editloading = false;
      state.error = err;
      state.editsuccess = false;
    },
    addBegin(state) {
      state.addloading = true;
      state.error = null;
      state.addsuccess = false;
    },
    addSuccess(state) {
      state.addloading = false;
      state.addsuccess = true;
    },
    addErr(state, err) {
      state.addloading = false;
      state.error = err;
      state.addsuccess = false;
    },
    changeBegin(state) {
      state.changeloading = true;
      state.error = null;
      state.changesuccess = false;
    },
    changeSuccess(state) {
      state.changeloading = false;
      state.changesuccess = true;
    },
    changeErr(state, err) {
      state.changeloading = false;
      state.error = err;
      state.changesuccess = false;
    },
    // openMember
    openMember(state) {
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
    async getAffiliationByMemberQuery({ commit }, data) {
      try {
        commit("fetchUserBegin");
        const response = await DataService.get(
          `${urls.GET_CHURCH_AFFILIATION_BY_MEMBER}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("fetchUserSuccess", response.data);
        }
      } catch (err) {
        commit("fetchUserErr", err);
      }
    },
    async getRoles({ commit }) {
      const response = await DataService.get(`${urls.GET_USER_ROLES}`);
      if (response.status === 200) {
        commit("rolesSuccess", response.data);
      }
    },
    async getUsers({ commit }, data) {
      try {
        commit("fetchUserBegin");
        const response = await DataService.get(
          `${urls.ADMIN_GET_ALL_USERS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("fetchUserSuccess", response.data);
        }
      } catch (err) {
        commit("fetchUserErr", err);
      }
    },
    async getUserById({ commit }, id) {
      try {
        commit("profileBegin");
        const response = await DataService.get(
          `${urls.GET_USER_BY_ID}?UserId=${id}`
        );
        if (response.status === 200) {
          commit("profileSuccess", response.data.data);
        }
      } catch (err) {
        commit("profileErr", err);
      }
    },
    async getUserByEmail({ commit }, email) {
      try {
        commit("profileBegin");
        const response = await DataService.get(
          `${urls.GET_USER_BY_EMAIL}?UserEmail=${email}`
        );
        if (response.status === 200) {
          commit("profileSuccess", response.data.data);
        }
      } catch (err) {
        commit("profileErr", err);
      }
    },
    async getUserProfile({ commit }, email) {
      try {
        commit("profileBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_USERS}?UserEmail=${email}`
        );
        if (response.status === 200) {
          commit("profileSuccess", response.data.data);
        }
      } catch (err) {
        commit("profileErr", err);
      }
    },
    async getUserAvatar({ commit }, UserId) {
      try {
        commit("avatarBegin");
        const response = await DataService.get(
          `${urls.GET_USER_AVATAR}?UserId=${UserId}`
        );
        if (response.status === 200) {
          commit("avatarSuccess", response.data.data);
        }
      } catch (err) {
        commit("avatarErr", err);
      }
    },

    async getUserByUsername({ commit }, Username) {
      try {
        commit("profileBegin");
        const response = await DataService.get(
          `${urls.GET_USER_BY_NAME}?Username=${Username}`
        );
        if (response.status === 200) {
          commit("profileSuccess", response.data.data);
        }
      } catch (err) {
        commit("profileErr", err);
      }
    },

    async addUser({ commit }, data) {
      try {
        commit("addBegin");
        const response = await DataService.post(urls.CREATE_ADMIN, data);
        if (response.status === 200) {
          commit("addSuccess");
        }
      } catch (err) {
        commit("addErr", err);
      }
    },
    async disableUser({ commit }, data) {
      try {
        commit("deleteBegin");
        const response = await DataService.delete(
          `${urls.DISABLE_USER}?UserId=${data}`
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },
    async enableUser({ commit }, data) {
      try {
        commit("deleteBegin");
        const response = await DataService.put(
          `${urls.ENABLE_USER}?UserId=${data}`
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },
    async changePassword({ commit }, data) {
      try {
        commit("changeBegin");
        const response = await DataService.post(urls.CHANGE_PASSWORD, data);

        if (response.status === 200) {
          commit("changeSuccess");
        }
      } catch (err) {
        commit("changeErr", err);
      }
    },

    async getAdminStats({ commit }, data) {
      try {
        commit("adminStatBegin");
        const response = await DataService.get(urls.GET_ADMIN_STATS, data);

        if (response.status === 200) {
          commit("adminStatSuccess", response.data.data);
        }
      } catch (err) {
        commit("adminStatErr", err);
      }
    },
    async getCustomerStats({ commit }, id) {
      try {
        commit("adminStatBegin");
        const response = await DataService.get(
          `${urls.GET_CUSTOMER_STATS}?userId=${id}`
        );

        if (response.status === 200) {
          commit("adminStatSuccess", response.data.data);
        }
      } catch (err) {
        commit("adminStatErr", err);
      }
    },
    async updateUser({ commit }, data) {
      try {
        commit("editBegin");
        const response = await DataService.put(urls.UPDATE_USER_PROFILE, data);
        if (response.status === 200) {
          commit("editSuccess");
        }
      } catch (err) {
        commit("editErr", err);
      }
    },
    addMember({ commit }, data) {
      commit("addMember", data);
    },
    // removeMember
    removeMember({ commit }, data) {
      commit("removeMember", data);
    },
    // updateMember
    updateMember({ commit }, data) {
      commit("updateMember", data);
    },
    // eopen member
    openMember({ commit }) {
      commit("openMember");
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
