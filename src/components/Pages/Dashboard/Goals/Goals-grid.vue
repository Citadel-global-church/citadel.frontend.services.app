<template>
  <div class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
    <Card bodyClass="p-6" v-for="(item, i) in goals" :key="i">
      <!-- header -->
      <header class="flex justify-between items-end">
        <div class="flex space-x-4 items-center" @click="openPreview">
          <div class="font-medium text-base leading-6">
            <div class="dark:text-slate-200 text-slate-900">
              {{ item.name }}
            </div>
          </div>
        </div>
        <div>
          <Dropdown classMenuItems=" w-[130px]">
            <span
              class="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400"
              ><Icon icon="heroicons-outline:dots-vertical"
            /></span>
            <template v-slot:menus>
              <MenuItem v-for="(mneu, i) in actions" :key="i">
                <div
                  @click="mneu.doit(item)"
                  :class="`
                
                  ${'hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white'}
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center  capitalize `"
                >
                  <span class="text-base"><Icon :icon="mneu.icon" /></span>
                  <span>{{ mneu.name }}</span>
                </div>
              </MenuItem>
            </template>
          </Dropdown>
        </div>
      </header>
      <div @click="openPreview">
        <!-- description -->
        <div class="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-8">
          {{ item.des }}
        </div>
        <!--  date -->
        <div class="flex space-x-4">
          <!-- start date -->
          <div>
            <span class="block date-label">Start date</span>
            <span class="block date-text">{{ item.startDate }}</span>
          </div>
          <!-- end date -->
          <div>
            <span class="block date-label">Achievement date</span>
            <span class="block date-text">{{ item.endDate }}</span>
          </div>
        </div>
        <!-- progress -->
        <div
          class="text-right text-xs text-slate-600 dark:text-slate-300 mb-1 font-medium"
        >
          {{ item.progress }}%
        </div>
        <ProgressBar :value="item.progress" barColor="bg-primary-500" />
        <!-- assign and time count -->
        <div class="grid grid-cols-2 gap-4 mt-6">
          <!-- assign -->
          <div>
            <!-- <div
            class="text-slate-400 dark:text-slate-400 text-sm font-normal mb-3"
          >
            Assigned to
          </div>
          <div class="flex justify-start -space-x-1.5">
            <div
              class="h-6 w-6 rounded-full ring-1 ring-slate-100"
              v-for="(user, userIndex) in item.assignto"
              :key="userIndex"
            >
              <img
                :src="user.image"
                :alt="user.title"
                class="w-full h-full rounded-full"
              />
            </div>
            <div
              class="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 text-xs ring-2 ring-slate-100 dark:ring-slate-700 rounded-full h-6 w-6 flex flex-col justify-center items-center"
            >
              +2
            </div>
          </div> -->
          </div>

          <!-- total date -->
          <div class="text-right">
            <span
              class="inline-flex items-center space-x-1 bg-danger-500 bg-opacity-[0.16] text-danger-500 text-xs font-normal px-2 py-1 rounded-full"
            >
              <span> <Icon icon="heroicons-outline:clock" /></span>
              <span>{{ totalDate(item.startDate, item.endDate) }}</span>
              <span>days left</span></span
            >
          </div>
        </div>
      </div>
    </Card>
  </div>
  <Modal
    title="Confirm action"
    label="Small modal"
    labelClass="btn-outline-dark"
    ref="modal"
    sizeClass="max-w-md"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure about this action?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm "
          @click="$refs.modal.closeModal()"
        />
        <Button
          text="Proceed"
          btnClass="btn-dark btn-sm"
          @click="$refs.modal.closeModal()"
        />
      </div>
    </template>
  </Modal>
  <Modal
    title="Goal Information"
    labelClass="btn-outline-dark"
    ref="goalPreview"
    sizeClass="max-w-3xl"
  >
    <ViewDetail />
  </Modal>
</template>
<script setup>
import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
import ViewDetail from "./goal-details";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import ProgressBar from "@/components/ProgressBar";
import { MenuItem } from "@headlessui/vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const goals = computed(() => store.getters.goals);
const modal = ref(null);
const goalPreview = ref(null);
const totalDate = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffDays = endDate.getDate() - startDate.getDate();
  return diffDays;
};

const actions = ref([
  {
    name: "Edit",
    icon: "heroicons-outline:pencil-alt",
    doit: (data) => {
      store.dispatch("updateGoal", data);
    },
  },
  {
    name: "Delete",
    icon: "heroicons-outline:trash",
    doit: () => {
      modal.value.openModal();
    },
  },
]);
function openPreview() {
  goalPreview.value.openModal();
}
</script>
<style lang="scss" scoped>
.date-label {
  @apply text-xs text-slate-400 dark:text-slate-400 mb-1;
}
.date-text {
  @apply text-xs text-slate-600 dark:text-slate-300 font-medium;
}
</style>
