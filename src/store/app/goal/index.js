import { v4 as uuidv4 } from "uuid";
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  state: {
    addmodal: false,
    isLoading: null,
    deletemodal: false,
    // for edit
    editModal: false,
    editName: "",
    editassignto: null,
    editStartDate: null,
    editEndDate: null,
    editcta: null,
    editId: null,
    editdesc: null,

    goals: [
      {
        id: uuidv4(),
        assignto: [
          {
            image: require("@/assets/images/avatar/av-1.svg"),
            title: "Mahedi Amin",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Sovo Haldar",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Rakibul Islam",
          },
        ],
        name: "Welfare",
        des: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        startDate: "2022-10-03",
        endDate: "2022-10-06",
        progress: 75,
        category: [
          {
            value: "team",
            label: "team",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
      {
        id: uuidv4(),
        assignto: [
          {
            image: require("@/assets/images/avatar/av-1.svg"),
            title: "Mahedi Amin",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Sovo Haldar",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Rakibul Islam",
          },
        ],
        name: "Sanitation ",
        des: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        startDate: "2022-10-03",
        endDate: "2022-10-10",
        progress: 50,

        category: [
          {
            value: "team",
            label: "team",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
    ],
  },
  getters: {
    goals: (state) => state.goals,
  },
  mutations: {
    //
    addGoal(state, data) {
      state.isLoading = true;

      setTimeout(() => {
        state.goals.unshift(data);
        state.isLoading = false;
        toast.success -
          500("Goal added", {
            timeout: 2000,
          });
      }, 1500);
      state.addmodal = false;
    },
    // removeGoal
    removeGoal(state, data) {
      state.goals = state.goals.filter((item) => item.id !== data.id);
      toast.error("Goal Removed", {
        timeout: 2000,
      });
    },
    // updateGoal
    updateGoal(state, data) {
      state.goals.findIndex((item) => {
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
    // openGoal
    openGoal(state) {
      state.addmodal = true;
    },
    openDeleteModal(state) {
      state.deletemodal = true;
    },
    closeDeleteModal(state) {
      state.deletemodal = false;
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
    addGoal({ commit }, data) {
      commit("addGoal", data);
    },
    // removeGoal
    removeGoal({ commit }, data) {
      commit("removeGoal", data);
    },
    // updateGoal
    updateGoal({ commit }, data) {
      commit("updateGoal", data);
    },
    // eopen goal
    openGoal({ commit }) {
      commit("openGoal");
    },

    closeModal({ commit }) {
      commit("closeModal");
    },
    // closeEditModal
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
