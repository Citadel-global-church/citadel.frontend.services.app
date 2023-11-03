<template>
  <Modal
    :title="title"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      {{ text }}
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button text="Cancel" btnClass="btn-outline-secondary btn-sm" />
        <Button text="Delete" btnClass="btn-danger btn-sm" />
      </div>
    </template>
  </Modal>
</template>
<script setup>
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button";
import { defineProps } from "vue";

defineProps(["text", "title"]);
// const emit = defineEmits(["close", "onopen"]);
</script>
