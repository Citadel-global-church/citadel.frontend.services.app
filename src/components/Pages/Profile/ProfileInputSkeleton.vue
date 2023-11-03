<template>
  <div class="animate-pulse grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div
      v-for="num in arr"
      :key="num"
      class="h-10 bg-gray-100 rounded-md dark:bg-slate-700"
    ></div>
  </div>
</template>

<script setup>
const arr = [1, 2, 3, 4];
</script>

<style lang="scss" scoped></style>
