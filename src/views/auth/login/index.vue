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
      <div class="right-column relative">
        <div
          class="inner-content h-full flex flex-col bg-white dark:bg-slate-800"
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
            <div class="text-center 2xl:mb-10 mb-4">
              <h4 class="font-medium">Sign in</h4>
              <div class="text-slate-500 text-base">
                Sign in to your account
              </div>
            </div>
            <Signin />

            <div
              class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm"
            >
              Don’t have an account?
              <router-link
                to="/register"
                class="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Sign up
              </router-link>
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright {{ new Date().getFullYear() }}, The Citadel Global
            Community Church, All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Carousel from "@/components/Carousel";
import Signin from "../common/Signin";
export default {
  components: {
    Signin,
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
