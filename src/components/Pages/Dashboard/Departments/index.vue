<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <div class="flex gap-x-4 items-center">
        <InputGroup
          v-model="query.searchParameter"
          placeholder="Search department "
          type="text"
          prependIcon="heroicons-outline:search"
          merged
          classInput="min-w-[320px] !h-9"
        />

        <Select
          label=""
          :options="filters"
          v-model="query.sortOrder"
          placeholder="Sort by"
          classInput="bg-white !h-9 min-w-[150px] !min-h-auto"
        />
      </div>

      <Button
        icon="heroicons-outline:plus"
        text="Add Department"
        btnClass="btn-primary btn-sm dark:bg-slate-800  h-min text-sm font-normal"
        iconClass="text-lg"
        @click="openDepartment"
      />
    </div>
    <GridSkletion :count="projects.length" v-if="isSkeletion" />

    <Grid v-if="fillter === 'grid' && !isSkeletion" />

    <DepartmentAddmodal />
    <UpdateModal />
  </div>
</template>

<script setup>
import Button from "@/components/Button";
import Select from "@/components/Select";
import GridSkletion from "@/components/Skeleton/Project-grid";
import InputGroup from "@/components/InputGroup";
import { computed, ref, watch, onMounted, reactive, provide } from "vue";
import DepartmentAddmodal from "./AddDepartment";
import UpdateModal from "./EditDepartment";
import Grid from "./Departments-grid";
import { useStore } from "vuex";
const store = useStore();

const filters = [
  {
    label: "Description",
    value: "description",
  },
  {
    label: "Department Code",
    value: "departmentCode",
  },
  {
    label: "Department Hod",
    value: "userId",
  },
  {
    label: "Department Name",
    value: "departmentName",
  },
];

let fillter = ref("grid");
const openDepartment = () => {
  store.dispatch("openDepartment");
};

const width = ref(0);
const handleResize = () => {
  width.value = window.innerWidth;
};
onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});
const query = reactive({
  pageNumber: 1,
  pageSize: 10,
  sortOrder: null,
  searchParameter: null,
});
const projects = computed(() => store.getters.projects);

const isSkeletion = ref(true);
const isSkeletion2 = ref(null);
setTimeout(() => {
  isSkeletion.value = false;
  isSkeletion2.value = false;
}, 1000);

// watch fillter with switch case
watch(fillter, () => {
  switch (fillter.value) {
    case "grid":
      fillter.value = "grid";
      isSkeletion.value = true;
      setTimeout(() => {
        isSkeletion.value = false;
      }, 1000);

      break;
    case "list":
      fillter.value = "list";
      isSkeletion2.value = true;
      setTimeout(() => {
        isSkeletion2.value = false;
      }, 1000);
      break;
    default:
      fillter.value = "grid";
      break;
  }
});
provide("query", query);
</script>
<style lang=""></style>
