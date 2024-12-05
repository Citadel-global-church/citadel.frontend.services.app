<template>
  <div class="flex h-[250px] items-center justify-center text-center">
    {{ message }}
  </div>
</template>
<script setup>
import { defineProps } from "vue";

defineProps({
  message: {
    default: "No data available",
    type: String,
  },
});
</script>
