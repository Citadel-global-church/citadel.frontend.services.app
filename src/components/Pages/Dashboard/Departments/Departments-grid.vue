<template>
  <div>
    <div
      v-if="departments.length"
      class="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-6"
    >
      <Card bodyClass="p-6" v-for="(item, i) in departments" :key="i">
        <!-- header -->
        <header class="flex justify-between items-end mb-4">
          <router-link
            :to="`/departments/view/${item?.departmentName}/${item.id}`"
            class="flex-1"
          >
            <div class="flex space-x-4 items-center">
              <div class="flex-none">
                <div
                  class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal uppercase"
                >
                  {{
                    item?.departmentName?.charAt(0) +
                    item?.departmentName?.charAt(1)
                  }}
                </div>
              </div>
              <div class="font-medium text-base leading-6">
                <div
                  class="dark:text-slate-200 text-slate-900 max-w-[200px] truncate"
                >
                  {{ item?.departmentName }} Department
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
        <router-link
          :to="`/departments/view/${item?.departmentName}/${item.id}`"
        >
          <!-- description -->
          <div class="text-slate-600 dark:text-slate-400 text-sm mb-2">
            {{ item.description }}
          </div>
          <div
            v-if="handleHod(item.userId)"
            class="text-slate-600 dark:text-slate-400 text-xs font-medium"
          >
            <span>HOD</span>:
            <span class="font-medium">{{ handleHod(item.userId) }}</span>
          </div>

          <!-- assign and time count -->
          <div class="flex justify-start mt-6">
            <!-- assign -->

            <!-- total date -->
            <div class="text-right">
              <span
                class="inline-flex items-center space-x-1 bg-gray-500 bg-opacity-[0.16] text-gray-500 text-xs font-normal px-2 py-1 rounded-full"
              >
                <span> <Icon icon="heroicons-outline:user-group" /></span>
                <span>20 members</span>
              </span>
            </div>
          </div>
        </router-link>
      </Card>
    </div>
    <Empty v-if="!departments.length" />
    <div class="py-4">
      <Pagination
        :total="total"
        :current="query.pageNumber"
        :per-page="query.pageSize"
        :pageRange="5"
        :pageChanged="perPage"
        :perPageChanged="perPage"
        @page-changed="query.pageNumber = $event"
        enableSearch
        enableSelect
        :options="options"
      >
        >
      </Pagination>
    </div>
  </div>

  <Modal
    title="Delete Department"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this department?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          :disabled="loading"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          :disabled="loading"
          text="Delete"
          btnClass="btn-danger btn-sm"
          @click="handleDelete"
        />
      </div>
    </template>
  </Modal>
</template>
<script setup>
import Pagination from "@/components/Pagination";
import { useToast } from "vue-toastification";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import { MenuItem } from "@headlessui/vue";
import Modal from "@/components/Modal/Modal";
import Empty from "@/components/Empty";
import { debounce } from "lodash";

import { computed, ref, onMounted, inject, watch, provide } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const toast = useToast();
const { state, dispatch } = useStore();
const router = useRouter();
const total = computed(() => state.department.total);
const loading = computed(() => state.department.loading);
const success = computed(() => state.department.addsuccess);
const deletesuccess = computed(() => state.department.deletesuccess);
const updatesuccess = computed(() => state.department.updatesuccess);
const departments = computed(() => state.department.departments);
const membersOptions = computed(() =>
  state?.member?.data.map((i) => {
    return {
      label: i.fullName,
      value: i.userId,
    };
  })
);
const modal = ref(null);
const detail = ref(null);
const options = [
  {
    value: "5",
    label: "5",
  },
  {
    value: "25",
    label: "25",
  },
  {
    value: "50",
    label: "50",
  },
  {
    value: "75",
    label: "75",
  },
  {
    value: "100",
    label: "100",
  },
];
const actions = ref([
  {
    name: "view",
    icon: "heroicons:eye",
    doit: ({ departmentName, id }) => {
      router.push(`/departments/view/${departmentName}/${id}`);
    },
  },
  {
    name: "Edit",
    icon: "heroicons-outline:pencil-alt",
    doit: (data) => {
      dispatch("updateDepartment", data);
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
const query = inject("query");
onMounted(() => {
  dispatch("getDepartments", query);
  dispatch("getUsers", { pageSize: 100000, pageNumber: 1 });
});
// eslint-disable-next-line no-unused-vars
function handleDelete() {
  dispatch("removeDepartment", detail.value.id);
}

// Define a debounce delay (e.g., 500 milliseconds)
const debounceDelay = 800;
const debouncedSearch = debounce(() => {
  dispatch("getDepartments", query);
}, debounceDelay);

watch(
  () => query.searchParameter,
  () => {
    debouncedSearch();
  }
);
watch(
  () => [query.pageNumber, query.sortOrder],
  () => {
    dispatch("getDepartments", query);
  }
);
function perPage({ currentPage }) {
  query.pageNumber = currentPage;
}
function handleSuccess() {
  dispatch("getDepartments", query);

  if (deletesuccess.value) {
    modal.value.closeModal();
    toast.success("Department removed");
  }
}

function handleHod(id) {
  if (!id) return;
  const result = membersOptions.value.find((i) => i.value === id);
  return result?.label;
}
watch(updatesuccess, handleSuccess);
watch(success, handleSuccess);
watch(deletesuccess, handleSuccess);

provide("membersOptions", membersOptions);
</script>
<style lang="scss" scoped>
.date-label {
  @apply text-xs text-slate-400 dark:text-slate-400 mb-1;
}
.date-text {
  @apply text-xs text-slate-600 dark:text-slate-300 font-medium;
}
</style>
