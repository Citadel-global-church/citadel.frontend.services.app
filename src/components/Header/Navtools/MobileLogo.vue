<template>
  <router-link :to="{ name: 'home' }">
    <img
      src="@/assets/images/logo/icon.png"
      alt=""
      v-if="!this.$store.state.isDark"
      class="w-8"
    />

    <img
      src="@/assets/images/logo/icon.png"
      alt=""
      v-if="this.$store.state.isDark"
      class="w-8"
    />
  </router-link>
</template>
<script></script>
