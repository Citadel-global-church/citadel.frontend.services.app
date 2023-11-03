import { createStore } from "vuex";
import chat from "./app/chat";
import email from "./app/email";
import kanban from "./app/kanban";
import project from "./app/project";
import member from "./app/member";
import firsttimer from "./app/first-timer";
import event from "./app/event";
import outreach from "./app/outreach";
import goal from "./app/goal";
import attendance from "./app/attendance";
import department from "./app/department";
import meeting from "./app/meeting";
import notification from "./app/notification";
import venue from "./app/venue";
import zone from "./app/zone";
import center from "./app/center";
import apptodo from "./app/todo";
import auth from "./app/auth";
import profile from "./app/profile";

export default createStore({
  state: {
    sidebarCollasp: true,
    sidebarHidden: false,
    mobielSidebar: false,
    semidark: false,
    semiDarkTheme: "semi-light",
    isDark: false,
    skin: "default",
    theme: "light",
    isOpenSettings: false,
    cWidth: "full",
    menuLayout: "vertical",
    navbarType: "sticky",
    footerType: "static",
    chartColors: {
      title: "red",
    },
  },
  getters: {
    theme: (state) => state.theme,
    skin: (state) => state.skin,
  },
  mutations: {
    setSidebarCollasp(state) {
      state.sidebarCollasp = !state.sidebarCollasp;
    },

    toogleDark(state) {
      state.isDark = !state.isDark;
      state.theme = state.theme === "dark" ? "light" : "dark";
      document.body.classList.toggle(state.theme);
      document.body.classList.remove(state.theme === "dark" ? "light" : "dark");
      localStorage.setItem("theme", state.theme);
    },

    toggleSettings(state) {
      state.isOpenSettings = !state.isOpenSettings;
    },
    toggleMsidebar(state) {
      state.mobielSidebar = !state.mobielSidebar;
    },
    toggleSemiDark(state) {
      state.semidark = !state.semidark;
      state.semiDarkTheme = state.semidark ? "semi-dark" : "semi-light";
      document.body.classList.toggle(state.semiDarkTheme);
      localStorage.setItem("semiDark", state.semidark);
    },
  },
  actions: {
    // toogleDark
    toogleDark({ commit }) {
      commit("toogleDark");
    },
    // toggleSettings
    toggleSettings({ commit }) {
      commit("toggleSettings");
    },
    // setSidebarCollasp
    setSidebarCollasp({ commit }) {
      commit("setSidebarCollasp");
    },
    // toggleMsidebar
    toggleMsidebar({ commit }) {
      commit("toggleMsidebar");
    },
    toggleSemiDark({ commit }) {
      commit("toggleSemiDark");
    },

    // setTheme
  },
  modules: {
    apptodo,
    project,
    kanban,
    email,
    chat,
    member,
    firsttimer,
    event,
    outreach,
    goal,
    attendance,
    department,
    meeting,
    notification,
    venue,
    zone,
    center,
    profile,
    auth,
  },
});
