<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 justify-between items-center">
        <div class="md:flex md:space-x-3 items-center flex-none">
          <InputGroup
            v-model="query.searchParameter"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
            classInput="min-w-[220px] !h-9"
          />

          <VueTailwindDatePicker
            v-model="dateValue"
            :formatter="formatter"
            input-classes="form-control h-[36px]"
            placeholder="Select date"
            as-single
          />
        </div>
        <div class="md:flex md:space-x-3 items-center flex-none">
          <Button
            icon="ri:user-add-line"
            text="Add Member"
            btnClass="btn-primary font-normal btn-sm"
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                modalChange.openModal();
              }
            "
          />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
          styleClass="vgt-table"
          :isLoading="loading"
          :rows="members || []"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: query.pageSize,
          }"
        >
          <template v-slot:table-row="props">
            <span
              v-if="props.column.field == 'customer'"
              class="flex items-center"
            >
              <span class="w-7 h-7 rounded-full mr-3 flex-none">
                <img
                  :src="
                    require('@/assets/images/all-img/' +
                      props.row.customer.image)
                  "
                  :alt="props.row.customer.name"
                  class="object-cover w-full h-full rounded-full"
                />
              </span>
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium"
              >
                {{ props.row.customer.name }}
              </span>
            </span>
            <span v-if="props.column.field == 'order'" class="font-medium">
              {{ "#" + props.row.order }}
            </span>
            <span
              v-if="props.column.field == 'date'"
              class="text-slate-500 dark:text-slate-400"
            >
              {{ props.row.date }}
            </span>
            <span v-if="props.column.field == 'status'" class="block w-full">
              <span
                class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                :class="{
                  'text-success-500 bg-success-500':
                    props.row.status === 'active',
                  'text-warning-500 bg-warning-500':
                    props.row.status === 'inactive',
                  'text-blue-500 bg-blue-500': props.row.status === 'pending',
                }"
              >
                {{ props.row.status }}
              </span>
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems="w-[140px]">
                <span class="text-xl">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
                <template v-slot:menus>
                  <MenuItem v-for="(item, i) in actions" :key="i">
                    <div
                      @click="item.doit(item.name, props.row)"
                      :class="{
                        'bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white':
                          item.name === 'delete',
                        'hover:bg-slate-900 hover:text-white':
                          item.name !== 'delete',
                      }"
                      class="w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center"
                    >
                      <span class="text-base">
                        <Icon :icon="item.icon" />
                      </span>
                      <span>{{ item.name }}</span>
                    </div>
                  </MenuItem>
                </template>
              </Dropdown>
            </span>
          </template>
          <template #pagination-bottom="props">
            <div class="py-4 px-3">
              <Pagination
                :total="total"
                :current="query.pageNumber"
                :per-page="query.pageSize"
                :pageRange="pageRange"
                @page-changed="query.pageNumber = $event"
                :pageChanged="perPage"
                :perPageChanged="props.perPageChanged"
                enableSearch
                enableSelect
                :options="options"
              >
                >
              </Pagination>
            </div>
          </template>
        </vue-good-table>
      </div>
    </Card>
  </div>
  <Modal
    title="Delete First Timer"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this first timer?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="modal.closeModal()"
        />
        <Button
          text="Delete"
          btnClass="btn-danger btn-sm"
          @click="handleDelete"
        />
      </div>
    </template>
  </Modal>
  <Modal
    :title="
      type === 'add'
        ? 'Add record'
        : type === 'edit'
        ? 'Edit Record'
        : 'View record'
    "
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-3xl"
  >
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" />
    <ViewRecord v-if="type === 'view'" />
  </Modal>
</template>

<script setup>
import { useToast } from "vue-toastification";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal/Modal";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import { MenuItem } from "@headlessui/vue";
import AddRecord from "../member-add.vue";
import EditRecord from "../member-edit.vue";
import ViewRecord from "../member-preview.vue";
import moment from "moment";
import { useStore } from "vuex";
import { debounce } from "lodash";
import { useRoute } from "vue-router";
import { computed, onMounted, watch, reactive, ref } from "vue";

const router = useRoute();
const pageRange = ref(5);

const timerid = ref(null);
const type = ref("");

const dateValue = ref(null);

const formatter = ref({
  date: "DD MMM YYYY",
  month: "MMM",
});
const actions = ref([
  {
    name: "view",
    icon: "heroicons-outline:eye",
    doit: (name, { userId }) => {
      type.value = name;
      router.push("/profile/" + userId);
    },
  },
  {
    name: "edit",
    icon: "heroicons:pencil-square",
    doit: (name, { userId }) => {
      type.value = name;
      router.push("/profile/" + userId);
    },
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
    doit: (name, { id }) => {
      console.log("🚀 ~ file: table.vue:273 ~ data ~ id:", id);
      type.value = name;
      timerid.value = id;
      modal.value.openModal();
    },
  },
]);

const options = ref([
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
]);

const columns = ref([
  {
    label: "Name",
    field: "fullName",
  },
  {
    label: "Email",
    field: "email",
  },

  {
    label: "Phone",
    field: "mobile1",
  },
  {
    label: "Gender",
    field: "gender",
  },

  {
    label: "DOB",
    field: "dateOfBirth",
  },

  {
    label: "Action",
    field: "action",
  },
]);
const toast = useToast();
const modal = ref(null);
const modalChange = ref(null);
const query = reactive({
  pageNumber: 1,
  pageSize: 10,
  searchParameter: "",
  sortOrder: "",
  isFirstTimer: true,
});
const { state, dispatch } = useStore();
const profileCreated = computed(() => state.profile.profileCreated);
onMounted(() => {
  dispatch("getAllBiodata", query);
  dispatch("getRoles");
});
// function fetchRecords(page) {
//   dispatch("getAllBiodata", { ...query, pageNumber: page });
// }

const loading = computed(() => state.profile.loading);
const members = computed(() => {
  if (state?.profile?.allbiodata) {
    return state?.profile?.allbiodata.map((item) => {
      item.fullName = `${item.firstName} ${item.surName}`;
      item.dateOfBirth = item?.dateOfBirth
        ? moment(item?.dateOfBirth).format("ll")
        : "-";

      item.phone = item.phone ? item.phone : "-";

      return item;
    });
  }
  return [];
});
const total = computed(() => state.profile.total);
const addsuccess = computed(() => state.profile.addsuccess);
// const deleteloading = computed(() => state.profile.deleteloading);
const deletesuccess = computed(() => state.profile.deletesuccess);

function handleDelete() {
  dispatch("deleteBiodata", timerid.value);
}
function perPage({ currentPage }) {
  query.pageNumber = currentPage;
}
// Define a debounce delay (e.g., 500 milliseconds)
const debounceDelay = 800;
const debouncedSearch = debounce((searchValue) => {
  dispatch("getAllBiodata", { ...query, name: searchValue });
}, debounceDelay);
watch(addsuccess, () => {
  addsuccess.value && dispatch("getAllBiodata", query);
  modalChange.value.closeModal();
});
watch(profileCreated, () => {
  if (profileCreated.value) {
    dispatch("getAllBiodata", query);
    modalChange.value.closeModal();
  }
});
watch(deletesuccess, () => {
  if (deletesuccess.value) {
    toast.success("Firstimer deleted ");
    dispatch("getAllBiodata", query);
    modal.value.closeModal();
  }
});

watch(
  () => query.searchParameter,
  () => {
    debouncedSearch(query.searchParameter);
  }
);
watch(
  () => query.pageNumber,
  () => {
    dispatch("getAllBiodata", query);
  }
);
</script>
<style lang="scss"></style>
