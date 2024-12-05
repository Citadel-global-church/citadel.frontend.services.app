import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

export default {
  state: {
    //personal Info

    //post methods
    biodata: null,
    allbiodata: [],
    creatingProfile: false,
    profileCreated: false,
    createProfileError: null,

    createChildrenDataloading: false,
    createChildrenDataSuccess: false,
    createChildrenDataerror: null,

    updateQualificationDataloading: false,
    updateQualificationDataSuccess: false,
    updateQualificationDataerror: null,

    updateEmployerDataloading: false,
    updateEmployerDataSuccess: false,
    updateEmployerDataerror: null,

    updateSpouseDataloading: false,
    updateSpouseDataSuccess: false,
    updateSpouseDataerror: null,

    updateChildrenDataloading: false,
    updateChildrenDataSuccess: false,
    updateChildrenDataerror: null,

    updateChurchAffiliationDataloading: false,
    updateChurchAffiliationDataSuccess: false,
    updateChurchAffiliationDataerror: null,

    //get
    getAllBiodataloading: false,
    getAllBiodatasuccess: false,
    getAllBiodataerror: false,
    getBiodatasuccess: false,
    getBiodataerror: null,
    childDetails: null,
    childrensData: null,
    getChildrensDataloading: false,
    getChildrensDataSuccess: false,
    getChildrensDataerror: null,
    spouseData: null,
    getSpouseDataloading: false,
    getSpouseDatasuccess: false,
    getSpouseDataerror: null,
    employerData: null,
    getEmployerDataloading: false,
    getEmployerDatasuccess: false,
    getEmployerDataerror: null,
    qualificationData: null,
    getQualificationDataloading: false,
    getQualificationDatasuccess: false,
    getQualificationDataerror: null,
    churchAffiliationsData: null,
    getChurchAffiliationsDataloading: false,
    getChurchAffiliationsDatasuccess: false,
    getChurchAffiliationsDataerror: null,
    deleteloading: false,
    deletesuccess: false,
    deleteChildDataloading: false,
    deleteChildDataSuccess: false,
    deleteChildDataError: null,

    //edit modal
    editModal: false,
    deleteModal: false,
  },
  getters: {
    creatingProfile(state) {
      return state.creatingProfile;
    },
    profileCreated(state) {
      return state.profileCreated;
    },
    createProfileError(state) {
      return state.createProfileError;
    },
  },
  mutations: {
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
    //post
    creatingProfile(state) {
      state.creatingProfile = true;
      state.profileCreated = false;
      state.createProfileError = false;
    },
    profileCreated(state) {
      state.creatingProfile = false;
      state.profileCreated = true;
      state.createProfileError = false;
    },
    createProfileError(state, err) {
      state.creatingProfile = false;
      state.profileCreated = false;
      state.createProfileError = err;
    },

    updateQualificationDataBegin(state) {
      state.updateQualificationDataloading = true;
      state.updateQualificationDataSuccess = false;
      state.updateQualificationDataerror = null;
    },

    updateQualificationDataSuccess(state) {
      state.updateQualificationDataloading = false;
      state.updateQualificationDataSuccess = true;
    },

    updateQualificationDataErr(state, err) {
      state.updateQualificationDataloading = false;
      state.updateQualificationDataerror = err;
      state.updateQualificationDataSuccess = false;
    },
    updateEmployerDataBegin(state) {
      state.updateEmployerDataloading = true;
      state.updateEmployerDataSuccess = false;
      state.updateEmployerDataerror = null;
    },

    updateEmployerDataSuccess(state) {
      state.updateEmployerDataloading = false;
      state.updateEmployerDataSuccess = true;
    },

    updateEmployerDataErr(state, err) {
      state.updateEmployerDataloading = false;
      state.updateEmployerDataerror = err;
      state.updateEmployerDataSuccess = false;
    },

    updateSpouseDataBegin(state) {
      state.updateSpouseDataloading = true;
      state.updateSpouseDataSuccess = false;
      state.updateSpouseDataerror = null;
    },

    updateSpouseDataSuccess(state) {
      state.updateSpouseDataloading = false;
      state.updateSpouseDataSuccess = true;
    },

    updateSpouseDataErr(state, err) {
      state.updateSpouseDataloading = false;
      state.updateSpouseDataerror = err;
      state.updateSpouseDataSuccess = false;
    },

    createChildrenDataBegin(state) {
      state.createChildrenDataloading = true;
      state.createChildrenDataSuccess = false;
      state.createChildrenDataerror = null;
    },

    createChildrenDataSuccess(state) {
      state.createChildrenDataloading = false;
      state.createChildrenDataSuccess = true;
    },

    createChildrenDataErr(state, err) {
      state.createChildrenDataloading = false;
      state.createChildrenDataerror = err;
      state.createChildrenDataSuccess = false;
    },

    updateChildrenDataBegin(state) {
      state.updateChildrenDataloading = true;
      state.updateChildrenDataSuccess = false;
      state.updateChildrenDataerror = null;
    },

    updateChildrenDataSuccess(state) {
      state.updateChildrenDataloading = false;
      state.updateChildrenDataSuccess = true;
    },

    updateChildrenDataErr(state, err) {
      state.updateChildrenDataloading = false;
      state.updateChildrenDataerror = err;
      state.updateChildrenDataSuccess = false;
    },

    updateChurchAffiliationDataBegin(state) {
      state.updateChurchAffiliationDataloading = true;
      state.updateChurchAffiliationDataSuccess = false;
      state.updateChurchAffiliationDataerror = null;
    },

    updateChurchAffiliationDataSuccess(state) {
      state.updateChurchAffiliationDataloading = false;
      state.updateChurchAffiliationDataSuccess = true;
    },

    updateChurchAffiliationDataErr(state, err) {
      state.updateChurchAffiliationDataloading = false;
      state.updateChurchAffiliationDataerror = err;
      state.updateChurchAffiliationDataSuccess = false;
    },

    //get
    getAllBiodataBegin(state) {
      state.getAllBiodataloading = true;
      state.getAllBiodatasuccess = false;
      state.getAllBiodataerror = null;
    },

    getAllBiodataSuccess(state, { data, totalCount }) {
      state.getAllBiodataloading = false;
      state.getAllBiodatasuccess = true;
      state.allbiodata = data;
      state.total = totalCount;
    },

    getAllBiodataErr(state, err) {
      state.getAllBiodataloading = false;
      state.getAllBiodataerror = err;
      state.getAllBiodatasuccess = false;
    },
    getBiodataBegin(state) {
      state.getBiodataloading = true;
      state.getBiodatasuccess = false;
      state.getBiodataerror = null;
    },

    getBiodataSuccess(state, data) {
      state.getBiodataloading = false;
      state.getBiodatasuccess = true;
      state.biodata = data;
    },

    getBiodataErr(state, err) {
      state.getBiodataloading = false;
      state.getBiodataerror = err;
      state.getBiodatasuccess = false;
    },

    getChildrensDataBegin(state) {
      state.getChildrensDataloading = true;
      state.getChildrensDataSuccess = false;
      state.getChildrensDataerror = null;
    },

    getChildrensDataSuccess(state, data) {
      state.getChildrensDataloading = false;
      state.getChildrensDataSuccess = true;
      state.childrensData = data;
    },

    getChildrensDataErr(state, err) {
      state.getChildrensDataloading = false;
      state.getChildrensDataerror = err;
      state.getChildrensDataSuccess = false;
    },

    getSpouseDataBegin(state) {
      state.getSpouseDataloading = true;
      state.getSpouseDatasuccess = false;
      state.getSpouseDataerror = null;
    },

    getSpouseDataSuccess(state, data) {
      state.getSpouseDataloading = false;
      state.getSpouseDatasuccess = true;
      state.spouseData = data;
    },

    getSpouseDataErr(state, err) {
      state.getSpouseDataloading = false;
      state.getSpouseDataerror = err;
      state.getSpouseDatasuccess = false;
    },
    getEmployerDataBegin(state) {
      state.getEmployerDataloading = true;
      state.getEmployerDatasuccess = false;
      state.getEmployerDataerror = null;
    },

    getEmployerDataSuccess(state, data) {
      state.getEmployerDataloading = false;
      state.getEmployerDatasuccess = true;
      state.employerData = data;
    },

    getEmployerDataErr(state, err) {
      state.getEmployerDataloading = false;
      state.getEmployerDataerror = err;
      state.getEmployerDatasuccess = false;
    },
    getQualificationDataBegin(state) {
      state.getQualificationDataloading = true;
      state.getQualificationDatasuccess = false;
      state.getQualificationDataerror = null;
    },

    getQualificationDataSuccess(state, data) {
      state.getQualificationDataloading = false;
      state.getQualificationDatasuccess = true;
      state.qualificationData = data;
    },

    getQualificationDataErr(state, err) {
      state.getQualificationDataloading = false;
      state.getQualificationDataerror = err;
      state.getQualificationDatasuccess = false;
    },

    getChurchAffiliationsDataBegin(state) {
      state.getChurchAffiliationsDataloading = true;
      state.getChurchAffiliationsDatasuccess = false;
      state.getChurchAffiliationsDataerror = null;
    },

    getChurchAffiliationsDataSuccess(state, data) {
      state.getChurchAffiliationsDataloading = false;
      state.getChurchAffiliationsDatasuccess = true;
      state.churchAffiliationsData = data;
    },

    getChurchAffiliationsDataErr(state, err) {
      state.getChurchAffiliationsDataloading = false;
      state.getChurchAffiliationsDataerror = err;
      state.getChurchAffiliationsDatasuccess = false;
    },

    deleteChildBegin(state) {
      state.deleteChildDataloading = true;
      state.deleteChildDataSuccess = false;
      state.deleteChildDataError = null;
    },
    deleteChildDataSuccess(state) {
      state.deleteChildDataloading = false;
      state.deleteChildDataSuccess = true;
    },

    deleteChildDataError(state, err) {
      state.deleteChildDataloading = false;
      state.deleteChildDataSuccess = false;
      state.deleteChildDataError = err;
    },

    //edit modal
    openChildDetail(state, data) {
      state.editModal = true;
      state.childDetails = data;
      // console.log(data);
    },
    closeEditModal(state) {
      state.editModal = false;
      // state.childDetails = null;
    },

    //delete modal
    closeDeleteModal(state) {
      state.editModal = false;
    },
    openDeleteModal(state) {
      state.deleteModal = true;
    },
  },
  actions: {
    //post
    async createProfile({ commit }, data) {
      try {
        commit("creatingProfile");
        const response = await DataService.post(urls.CREATE_BIODATA, data);
        if (response.status === 200) {
          commit("profileCreated");
          // console.log("SuccessResponse:" + response);
        }
      } catch (err) {
        commit("createProfileError", err);
      }
    },

    async updateProfile({ commit }, data) {
      try {
        commit("creatingProfile");
        const response = await DataService.put(urls.UPDATE_BIODATA, data);
        if (response.status === 200) {
          commit("profileCreated");
          // console.log("SuccessResponse:" + response);
        }
      } catch (err) {
        commit("createProfileError", err);
      }
    },
    async createQualification({ commit }, data) {
      try {
        commit("updateQualificationDataBegin");
        const response = await DataService.post(
          urls.CREATE_QUALIFICATION,
          data
        );

        if (response.status === 200) {
          commit("updateQualificationDataSuccess");
        }
      } catch (err) {
        commit("updateQualificationDataerror", err);
      }
    },
    async updateQualification({ commit }, data) {
      try {
        commit("updateQualificationDataBegin");
        const response = await DataService.put(urls.UPDATE_QUALIFICATION, data);

        if (response.status === 200) {
          commit("updateQualificationDataSuccess");
        }
      } catch (err) {
        commit("updateQualificationDataerror", err);
      }
    },

    async createChurchAffiliation({ commit }, data) {
      try {
        commit("updateChurchAffiliationDataBegin");
        const response = await DataService.post(
          urls.CREATE_CHURCH_AFFILIATION,
          data
        );

        if (response.status === 200) {
          commit("updateChurchAffiliationDataSuccess");
        }
      } catch (err) {
        commit("updateChurchAffiliationDataerror", err);
      }
    },
    async updateChurchAffiliation({ commit }, data) {
      try {
        commit("updateChurchAffiliationDataBegin");
        const response = await DataService.put(
          urls.UPDATE_CHURCH_AFFILIATION,
          data
        );

        if (response.status === 200) {
          commit("updateChurchAffiliationDataSuccess");
        }
      } catch (err) {
        commit("updateChurchAffiliationDataerror", err);
      }
    },

    //get
    async getAllBiodata({ commit }, data) {
      try {
        commit("getAllBiodataBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_BIODATA}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("getAllBiodataSuccess", response.data);
        }
      } catch (err) {
        console.log("getAllBiodataErr", JSON.stringify(err));
        commit("getBiodataErr", err);
      }
    },

    async getBiodataByUserId({ commit }, id) {
      try {
        commit("getBiodataBegin");
        const response = await DataService.get(
          `${urls.GET_BIODATA_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getBiodataSuccess", response.data.data);
        }
      } catch (err) {
        console.log("getBiodataErr", JSON.stringify(err));
        commit("getBiodataErr", err);
      }
    },

    //children

    async getChildrenDetailByUserId({ commit }, id) {
      try {
        commit("getChildrensDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHILDREN_DETAIL_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getChildrensDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getChildrensDataErr", err);
      }
    },

    async createChildren({ commit }, data) {
      try {
        commit("createChildrenDataBegin");
        const response = await DataService.post(
          urls.CREATE_CHILDREN_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("createChildrenDataSuccess");
        }
      } catch (err) {
        commit("createChildrenDataerror", err);
      }
    },
    async updateChildren({ commit }, data) {
      try {
        commit("updateChildrenDataBegin");
        const response = await DataService.put(
          urls.UPDATE_CHILDREN_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("updateChildrenDataSuccess");
        }
      } catch (err) {
        commit("updateChildrenDataerror", err);
      }
    },

    async deleteChildById({ commit }, id) {
      try {
        commit("deleteChildBegin");
        const response = await DataService.delete(
          `${urls.DELETE_CHILDREN_DETAIL}?id=${id}`
        );
        if (response.status === 200) {
          commit("deleteChildDataSuccess");
        }
      } catch (err) {
        commit("deleteChildDataError", err);
      }
    },

    //spouse

    async getSpouseDetailById({ commit }, id) {
      try {
        commit("getSpouseDataBegin");
        const response = await DataService.get(
          `${urls.GET_SPOUSE_DETAIL_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getSpouseDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getSpouseDataErr", err);
      }
    },
    async createSpouse({ commit }, data) {
      try {
        commit("updateSpouseDataBegin");
        const response = await DataService.post(
          urls.CREATE_SPOUSE_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("updateSpouseDataSuccess");
        }
      } catch (err) {
        commit("updateSpouseDataerror", err);
      }
    },

    async updateSpouse({ commit }, data) {
      try {
        commit("updateSpouseDataBegin");
        const response = await DataService.put(urls.UPDATE_SPOUSE_DETAIL, data);

        if (response.status === 200) {
          commit("updateSpouseDataSuccess");
        }
      } catch (err) {
        commit("updateSpouseDataerror", err);
      }
    },

    //Employer
    async getEmployerDetailById({ commit }, id) {
      try {
        commit("getEmployerDataBegin");
        const response = await DataService.get(
          `${urls.GET_EMPLOYER_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getEmployerDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getEmployerDataErr", err);
      }
    },

    async createEmployer({ commit }, data) {
      try {
        commit("updateEmployerDataBegin");
        const response = await DataService.post(urls.CREATE_EMPLOYER, data);

        if (response.status === 200) {
          commit("updateEmployerDataSuccess");
        }
      } catch (err) {
        commit("updateEmployerDataErr", err);
      }
    },

    async updateEmployer({ commit }, data) {
      try {
        commit("updateEmployerDataBegin");
        const response = await DataService.put(urls.UPDATE_EMPLOYER, data);

        if (response.status === 200) {
          commit("updateEmployerDataSuccess");
        }
      } catch (err) {
        commit("updateEmployerDataErr", err);
      }
    },

    //ChurchAffiliation

    async getChurchAffiliationsById({ commit }, id) {
      try {
        commit("getChurchAffiliationsDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHURCH_AFFILIATION_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getChurchAffiliationsDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getChurchAffiliationsDataErr", err);
      }
    },

    async getQualificationsById({ commit }, id) {
      try {
        commit("getQualificationDataBegin");
        const response = await DataService.get(
          `${urls.GET_QUALIFICATION_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getQualificationDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getQualificationDataErr", err);
      }
    },
    async deleteBiodata({ commit }, id) {
      try {
        commit("deleteBegin");
        const response = await DataService.delete(
          `${urls.DELETE_BIODATA}?id=${id}`
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },
    openChildDetail({ commit }, data) {
      commit("openChildDetail", data);
    },

    closeEditModal({ commit }) {
      commit("closeEditModal");
    },

    openDeleteModal({ commit }) {
      commit("openDeleteModal");
    },

    closeDeleteModal({ commit }) {
      commit("closeDeleteModal");
    },
  },
};
