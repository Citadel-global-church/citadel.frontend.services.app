<!-- eslint-disable no-unused-vars -->
<template>
  <div>
    <!-- {{ query }}{{ zoneObj }} -->
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="flex gap-x-4 rounded text-sm">
          <InputGroup
            v-model="query.searchTerm"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
            classInput="min-w-[220px] !h-9"
          />

          <VueSelect
            class="min-w-[200px] w-full md:w-auto h-9"
            v-model.value="zoneObj"
            :options="zoneOptions"
            placeholder="Select zone"
            name="zone"
          />
        </div>
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <Button
            icon="mdi:house-group-add"
            text="Add center"
            btnClass=" btn-primary font-normal btn-sm "
            iconClass="text-lg"
            @click="
              () => {
                type = 'add';
                $refs.modalChange.openModal();
              }
            "
          />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
          styleClass=" vgt-table  centered "
          :rows="centers"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: perpage,
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
                >{{ props.row.customer.name }}</span
              >
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
                :class="`${
                  props.row.status === 'active'
                    ? 'text-success-500 bg-success-500'
                    : ''
                } 
            ${
              props.row.status === 'inactive'
                ? 'text-warning-500 bg-warning-500'
                : ''
            }
            ${props.row.status === 'pending' ? 'text-blue-500 bg-blue-500' : ''}
            
             `"
              >
                {{ props.row.status }}
              </span>
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl"
                  ><Icon icon="heroicons-outline:dots-vertical"
                /></span>
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
    title="Delete Member"
    label="Small modal"
    labelClass="btn-outline-danger"
    ref="modal"
    sizeClass="max-w-md"
    themeClass="bg-danger-500"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to delete this member?
    </div>

    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          :disabled="deleteloading"
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm"
          @click="$refs.modal.closeModal()"
        />
        <Button
          text="Delete"
          :disabled="deleteloading"
          btnClass="btn-danger btn-sm"
          @click="handleDelete"
        />
      </div>
    </template>
  </Modal>
  <Modal
    title="Confirm action"
    label="Small modal"
    labelClass="btn-outline-dark"
    ref="modalStatus"
    sizeClass="max-w-md"
    :themeClass="`${type === 'approve' ? 'bg-green-500' : 'bg-danger-500'}`"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to {{ type.toLowerCase() }} this center?
    </div>
    <div v-if="type.toLowerCase() === 'delist'">
      <textarea
        resize="none"
        class="px-3 py-3 border border-gray-200 rounded-lg w-full"
        rows="4"
        placeholder="Provide reason"
        v-model="reason"
      ></textarea>
    </div>
    <template v-slot:footer>
      <div class="flex gap-x-5">
        <Button
          :disabled="deleteloading"
          text="Cancel"
          btnClass="btn-outline-secondary btn-sm "
          @click="$refs.modalStatus.closeModal()"
        />
        <Button
          :disabled="deleteloading"
          text="Proceed"
          :btnClass="` btn-sm ${
            type === 'approve' ? 'btn-success' : 'btn-danger'
          }`"
          @click="handleStatus"
        />
      </div>
    </template>
  </Modal>

  <Modal
    :title="
      type === 'add'
        ? 'Add center'
        : type === 'edit'
        ? 'Edit center'
        : 'View center'
    "
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-md"
  >
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" />
  </Modal>
</template>
<script>
import VueSelect from "@/components/Select/VueSelect";
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal/Modal";
import { MenuItem } from "@headlessui/vue";
import { advancedTable } from "@/constant/basic-tablle-data";
import AddRecord from "../center-add.vue";
import EditRecord from "../edit-center.vue";
import window from "@/mixins/window";
import { useStore } from "vuex";
import { debounce } from "lodash";
import moment from "moment";
import { useToast } from "vue-toastification";

import {
  provide,
  ref,
  computed,
  watch,
  reactive,
  getCurrentInstance,
  onMounted,
} from "vue";

export default {
  mixins: [window],
  components: {
    AddRecord,
    EditRecord,
    VueSelect,
    Pagination,
    InputGroup,
    Modal,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
    // eslint-disable-next-line vue/no-unused-components
    VueTailwindDatePicker,
  },

  setup() {
    // onMounted(() => {
    //   dispatch("getAllCenters", query);
    //   dispatch("getZones");
    //   id.value = getCurrentInstance().data.id;
    // });

    onMounted(() => {
      dispatch("getAllCenters", query);
      dispatch("getZones", { pageNumber: 1, pageSize: 10000 });
      id.value = getCurrentInstance().data.id;
    });

    const { state, dispatch } = useStore();
    const toast = useToast();
    const deleteCenterSuccess = computed(
      () => state.center.deleteCenterSuccess
    );
    const zoneObj = ref({
      label: "",
      zoneId: "",
    });
    const zone = ref("");

    const initialValue = {
      pageNumber: 1,
      pageSize: 10,
      name: "",
      searchTerm: "",
      zoneId: "",
    };
    // const zoneId = computed(() => zone.value.zoneId);
    const query = reactive({
      ...initialValue,
    });

    const id = ref(null);

    const zoneOptions = computed(() =>
      state?.zone?.zones.map((i) => {
        return {
          label: i.zoneName,
          zoneId: i.id,
        };
      })
    );
    const modal = ref(null);
    const modalChange = ref(null);
    const closeModal = () => modalChange.value.closeModal();
    const closeDeleteModal = () => modal.value.closeModal();

    const loading = computed(() => state.center.loading);
    const centers = computed(() =>
      state.center.centers.map((i) => {
        i.createdAt = moment(i.createdAt).format("ll");
        i.location = i.location ? i.location : "-";
        i.total = i.total ? i.total : 0;
        return i;
      })
    );
    const total = computed(() => state.center.total);
    const addsuccess = computed(() => state.center.addsuccess);
    const deleteloading = computed(() => state.center.deleteloading);
    const deletesuccess = computed(() => state.center.deletesuccess);

    provide("closeModal", closeModal);
    // eslint-disable-next-line no-unused-vars
    function handleDelete() {
      dispatch("deleteCenter", state.center.deleteId);
    }

    watch(deleteCenterSuccess, () => {
      if (deleteCenterSuccess.value) {
        console.log("SuccessfullyDeleted");
        closeDeleteModal();
        toast.success("Successfully Deleted");
        dispatch("getAllCenters", query);
      }
    });
    function perPage({ currentPage }) {
      query.pageNumber = currentPage;
    }
    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getAllCenters", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getAllCenters", query);
      modalChange.value.closeModal();
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getAllCenters", query);
        modal.value.closeModal();
      }
    });

    watch(
      () => query.searchTerm,
      () => {
        debouncedSearch(query.searchTerm);
      }
    );
    watch(
      () => query.pageNumber,
      () => {
        dispatch("getAllCenters", query);
      }
    );
    watch(zoneObj, (newValue) => {
      query.zoneId = newValue.zoneId;
    });
    watch(
      () => query.zoneId,
      () => {
        dispatch("getAllCenters", query);
      }
    );
    provide("closeModal", closeModal);
    provide("zoneOptions", zoneOptions);
    provide("initialValue", initialValue);
    provide("query", query);

    return {
      // zoneId,

      zone,
      zoneObj,
      zoneOptions,
      modal,
      modalChange,
      centers,
      loading,
      total,
      query,
      perPage,
      deleteloading,
      handleDelete,
    };
  },

  data() {
    return {
      advancedTable,
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      type: "",
      id: null,
      reason: "",
      filters: ["all", "pending"],
      activeFilter: "all",
      dateValue: null,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      // zone: "",
      // zoneOptions: [
      //   {
      //     value: "option2",
      //     label: "Zone 1",
      //   },
      //   {
      //     value: "option3",
      //     label: "Zone 2",
      //   },
      // ],
      center: "",
      centerOptions: [
        {
          value: "option2",
          label: "Center 1",
        },
        {
          value: "option3",
          label: "Center 2",
        },
      ],
      // provide: {
      //   // Provide a method
      //   closeModal: () => this.$refs.Modal.closeModal(),
      // },
      actions: [
        {
          name: "approve",
          icon: "ph:check",
          doit: (name) => {
            this.type = name;
            this.$refs.modalStatus.openModal();
          },
        },
        {
          name: "delist",
          icon: "ph:x-light",
          doit: (name) => {
            this.type = name;
            this.$refs.modalStatus.openModal();
          },
        },
        {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: (name) => {
            this.type = name;
            this.$refs.modalChange.openModal();
          },
        },
        {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: (name, data) => {
            this.type = name;
            this.$refs.modalChange.openModal();
            this.$store.dispatch("setCenterToUpdate", data);
          },
        },

        {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: (name, { id }) => {
            this.type = name;
            this.$refs.modal.openModal();
            this.$store.dispatch("setDeleteId", id);
          },
        },
      ],

      options: [
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
      ],
      columns: [
        {
          label: "Date created",
          field: "createdAt",
        },
        {
          label: "Name",
          field: "centerName",
        },

        {
          label: "Total members",
          field: "total",
        },

        {
          label: "Location",
          field: "location",
        },

        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  methods: {
    handleStatus() {
      if (this.type === "approve") {
        this.$store.dispatch("enableUser", this.id);
      } else {
        this.$store.dispatch("disableUser", this.id);
      }
    },
    handleActions(value) {
      if (value === "active") {
        return this.actions.filter((i) => i.name.toLowerCase() !== "approve");
      }
      if (value === "delist") {
        return this.actions.filter((i) => i.name.toLowerCase() !== "delist");
      }
      if (value === "pendingactivation") {
        return this.actions.filter(
          (i) =>
            i.name.toLowerCase() !== "delist" &&
            i.name.toLowerCase() !== "approve"
        );
      }
      return value;
    },
    generateAction(name, id) {
      this.id = id;

      const actions = {
        Approve: {
          name: "Approve",
          icon: "ph:check",
          doit: () => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
        Delist: {
          name: "Delist",
          icon: "ph:x-light",
          doit: () => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: () => {
            this.$router.push("/centers-management/preview/" + id);
          },
        },
        edit: {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: () => {
            this.$router.push("/centers-management/edit/" + id);
          },
        },
        delete: {
          name: "delete",
          icon: "heroicons-outline:trash",
          doit: () => {
            this.type = name;
            this.$refs.modal.openModal();
          },
        },
      };

      return actions[name] || null;
    },
  },
  computed: {
    filteredActions() {
      return this.activeFilter === "all"
        ? this.actions.filter(
            (i) =>
              i.name.toLowerCase() !== "approve" &&
              i.name.toLowerCase() !== "delist"
          )
        : this.actions;
    },
  },
};
</script>
<style lang="scss"></style>
