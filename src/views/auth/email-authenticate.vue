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
          <div class="auth-box2 flex flex-col justify-center h-full">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/"
                ><img
                  src="@/assets/images/logo/icon.png"
                  alt=""
                  class="mx-auto w-[100px]"
              /></router-link>
            </div>
            <div class="text-center">
              <h4 class="font-medium">Email Verification</h4>
              <!-- <div class="text-slate-500 dark:text-slate-400 text-base">
                Please enter the one-time password (OTP) that has been sent to
                your email address for the purpose of verification.
              </div> -->
            </div>
            <div
              class="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-6"
            >
              Please enter the one-time password (OTP) that has been sent to
              your email address for the purpose of verification.
            </div>

            <EmailAuthenticate />
            <div
              class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm"
            >
              <router-link
                to="/"
                class="text-slate-900 dark:text-white font-medium hover:underline"
              >
                Back to The Sign In
              </router-link>
            </div>
          </div>
          <div class="auth-footer text-center">
            Copyright 2021, The Citadel Global Community Church, All Rights
            Reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import EmailAuthenticate from "./common/emailAuthenticate";
import Carousel from "@/components/Carousel";

const content = [
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
];
</script>
<style lang="scss"></style>
