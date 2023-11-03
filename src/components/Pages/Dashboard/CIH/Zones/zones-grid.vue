<template>
  <div>
    <div v-if="getZonesLoading && zones?.length == 0" class="">
      <EmptyGrid />
    </div>
    <div v-else class="grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
      <!-- <span>Zones: {{ zones }}</span> -->
      <Card bodyClass="p-6" v-for="(item, i) in zones" :key="i">
        <!-- header -->
        <header class="flex justify-between items-end">
          <router-link
            :to="`/cih/zones/view-centers/${item.id}`"
            class="flex-1"
          >
            <div class="flex space-x-4 items-center">
              <div class="flex-none">
                <div
                  class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize"
                >
                  {{ item.zoneName.charAt(0) + item.zoneName.charAt(1) }}
                </div>
              </div>
              <div class="font-medium text-lg leading-6">
                <div class="dark:text-slate-200 text-slate-900">
                  {{ item.zoneName }}
                </div>
              </div>
            </div>
          </router-link>
          <div>
            <Dropdown classMenuItems=" w-[130px]">
              <span
                class="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400"
                ><Icon icon="heroicons-outline:dots-vertical"
              /></span>
              <template v-slot:menus>
                <MenuItem v-for="(menu, i) in actions" :key="i">
                  <div
                    @click="menu.doit(item)"
                    :class="`
                
                  ${'hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white'}
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center  capitalize `"
                  >
                    <span class="text-base"><Icon :icon="menu.icon" /></span>
                    <span>{{ menu.name }}</span>
                  </div>
                </MenuItem>
              </template>
            </Dropdown>
          </div>
        </header>
        <router-link :to="`/cih/zones/view-centers/${item.id}`">
          <!-- description -->
          <!-- <div class="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-4">
          {{ item.des }}
        </div> -->

          <!-- assign and time count -->
          <div class="flex justify-start mt-6">
            <!-- assign -->

            <!-- total date -->
            <div class="text-left">
              <span
                class="inline-flex items-center space-x-1 bg-gray-500 bg-opacity-[0.16] text-gray-500 text-xs font-normal px-2 py-1 rounded-full"
              >
                <span> <Icon icon="heroicons-outline:user-group" /></span>
                <span>3 centers</span>
              </span>
            </div>
          </div>
        </router-link>
      </Card>
    </div>
  </div>
  <Modal
    title="Delete Zone"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this zone?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          text="Delete"
          btnClass="btn-danger btn-sm"
          @click="deleteZone"
        />
      </div>
    </template>
  </Modal>
</template>
<script setup>
import EmptyGrid from "@/components/Skeleton/Project-grid.vue";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import { MenuItem } from "@headlessui/vue";
import Modal from "@/components/Modal/Modal";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

onMounted(() => {
  getZones();
});
const { dispatch, state } = useStore();
const router = useRouter();

const zones = computed(() => state.zone.zones);
const getZonesLoading = computed(() => state.zone.getZonesLoading);
const deleteZoneSuccess = computed(() => state.zone.deleteZoneSuccess);
const toast = useToast();
const modal = ref(null);
const detail = ref(null);
const actions = ref([
  {
    name: "view",
    icon: "heroicons:eye",
    doit: ({ id }) => {
      router.push(`/cih/zones/view/${id}`);
    },
  },
  {
    name: "Edit",
    icon: "heroicons-outline:pencil-alt",
    doit: (data) => {
      dispatch("openEditModal", data);
    },
  },
  {
    name: "Delete",
    icon: "heroicons-outline:trash",
    doit: (data) => {
      detail.value = data;
      modal.value.openModal();
    },
  },
]);

const getZones = () => {
  dispatch("getZones");
};

const deleteZone = () => {
  dispatch("deleteZone", detail.value.id);
};

watch(deleteZoneSuccess, () => {
  if (deleteZoneSuccess.value) {
    toast.success("Successfully Deleted");
    dispatch("getZones");
    modal.value.closeModal();
  } else {
    modal.value.closeModal();
  }

  // getAllZones();
});

// eslint-disable-next-line no-unused-vars
function handleDelete() {
  dispatch("removeZone", detail.value);
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
