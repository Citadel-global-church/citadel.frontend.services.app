<template>
  <section class="min-h-screen flex flex-col py-10 px-2 bg-[#E7EBEE] gap-y-2">
    <div class="flex-1 flex flex-col gap-y-3 bg-white rounded-lg">
      <div class="p-10 text-center flex items-center justify-center mt-20">
        <div>
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
          <h1
            class="text-4xl md:text-8xl font-bold mb-2 text-[rgb(206_154_34)]"
          >
            404 <span class="text-gray-800">ERROR!</span>
          </h1>
          <h2 class="text-xl font-bold text-gray-800 mb-8">PAGE NOT FOUND</h2>
          <router-link :to="-1">
            <button
              class="text-white btn-dark px-12 py-4 rounded-full uppercase"
            >
              go back
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
