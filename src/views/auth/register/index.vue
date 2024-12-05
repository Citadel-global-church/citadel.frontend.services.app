<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <div class="left-column relative z-[1]">
        <Carousel
          :carousels="content"
          :canNavigate="false"
          :canPaginate="false"
        />
      </div>
      <div
        class="right-column relative bg-white dark:bg-slate-800 h-screen overflow-y-auto"
      >
        <div
          class="inner-content max-h-full flex flex-col bg-white dark:bg-slate-800"
        >
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-6 4xl:hidden block">
              <router-link to="/">
                <img
                  src="@/assets/images/logo/icon.png"
                  alt=""
                  class="mx-auto w-[100px]"
                  v-if="!this.$store.state.isDark"
                />
                <img
                  src="@/assets/images/logo/icon.png"
                  alt=""
                  class="mx-auto w-[100px]"
                  v-else
                />
              </router-link>
            </div>
            <div class="text-center 2xl:mb-10 mb-5">
              <h4 class="font-medium">Sign up</h4>
              <div class="text-slate-500 dark:text-slate-400 text-base">
                Create an account to start
              </div>
            </div>
            <Signup />

            <div
              class="max-w-[215px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm"
            >
              Already registered?
              <router-link
                to="/"
                class="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Sign In</router-link
              >
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright {{ new Date().getFullYear() }}, Citadel All Rights
            Reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Signup from "../common/Signup";
import Carousel from "@/components/Carousel";
export default {
  components: {
    Signup,
    Carousel,
  },
  data() {
    return {
      content: [
        {
          img: "images/all-img/auth-1.jpg",
          title: "",
          description: "",
        },
        {
          img: "images/all-img/auth-2.jpg",
          title: "",
          description: "",
        },
      ],
    };
  },
};
</script>
<style lang="scss"></style>
