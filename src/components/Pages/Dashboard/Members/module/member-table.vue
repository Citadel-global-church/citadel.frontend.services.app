<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div class="flex rounded-[6px] text-sm overflow-hidden gap-x-4">
          <InputGroup
            v-model="search"
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
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <Button
            icon="ri:user-add-line"
            text="Add Member"
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
            <span v-if="props.column.field == 'statusText'">
              <span
                :class="`whitespace-nowrap text-[12.5px] rounded-full px-3 py-1 ${
                  props.row.statusText.toLowerCase() === 'pendingactivation'
                    ? 'text-gray-700 bg-gray-100'
                    : props.row.statusText.toLowerCase() === 'active'
                    ? 'text-green-700 bg-green-100'
                    : 'text-red-700 bg-red-100'
                }`"
                >{{
                  props.row.statusText.toLowerCase() === "pendingactivation"
                    ? "Pending"
                    : props.row.statusText
                }}</span
              >
            </span>
            <span v-if="props.column.field == 'action'">
              <Dropdown classMenuItems=" w-[140px]">
                <span class="text-xl"
                  ><Icon icon="heroicons-outline:dots-vertical"
                /></span>
                <template v-slot:menus>
                  <MenuItem
                    v-for="(item, i) in handleActions(
                      props.row.statusText.toLowerCase()
                    )"
                    :key="i"
                  >
                    <div
                      @click="
                        generateAction(
                          item.name.toLowerCase(),
                          props.row.userId
                        ).doit
                      "
                      :class="`
                
                  ${
                    item.name === 'delist'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30  hover:bg-opacity-100 hover:text-white'
                      : 'hover:bg-slate-900 hover:text-white'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
                    >
                      <span class="text-base"
                        ><Icon
                          :icon="
                            generateAction(item.name, props.row.userId).icon
                          "
                      /></span>
                      <span>{{
                        generateAction(item.name, props.row.userId).name
                      }}</span>
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
    title="Confirm action"
    label="Small modal"
    labelClass="btn-outline-dark"
    ref="modalStatus"
    sizeClass="max-w-md"
    :themeClass="`${type === 'approve' ? 'bg-green-500' : 'bg-danger-500'}`"
  >
    <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
      Are you sure you want to {{ type.toLowerCase() }} this member?
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
    :title="
      type === 'add'
        ? 'Add member'
        : type === 'edit'
        ? 'Edit member'
        : 'View member'
    "
    labelClass="btn-outline-dark"
    ref="modalChange"
    sizeClass="max-w-md"
  >
    <AddRecord v-if="type === 'add'" />
    <EditRecord v-if="type === 'edit'" />
    <ViewRecord v-if="type === 'view'" />
  </Modal>
</template>
<script>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
import Modal from "@/components/Modal/Modal";
import { MenuItem } from "@headlessui/vue";
import { membersTable } from "@/constant/basic-tablle-data";
import AddRecord from "../member-add.vue";
import EditRecord from "../member-edit.vue";
import ViewRecord from "../member-preview.vue";
import moment from "moment";
import { useStore } from "vuex";
import { debounce } from "lodash";
import {
  computed,
  onMounted,
  watch,
  reactive,
  ref,
  getCurrentInstance,
} from "vue";
import window from "@/mixins/window";
// import store from "@/store";

export default {
  mixins: [window],
  components: {
    AddRecord,
    EditRecord,
    ViewRecord,
    Pagination,
    InputGroup,
    Modal,
    Dropdown,
    Icon,
    Card,
    MenuItem,
    Button,
    VueTailwindDatePicker,
  },

  data() {
    return {
      membersTable,
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",
      type: "",
      id: null,
      filters: ["all", "pending"],
      activeFilter: "",
      dateValue: null,
      reason: "",
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      actions: [
        {
          name: "view",
        },
        {
          name: "edit",
        },
        // {
        //   name: "delete",
        // },
        {
          name: "approve",
        },
        {
          name: "delist",
        },
      ],
      options: [
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
      ],
      columns: [
        {
          label: "Name",
          field: "fullName",
        },
        {
          label: "Email",
          field: "emailAddress",
        },

        {
          label: "Phone",
          field: "mobileNo",
        },
        {
          label: "Gender",
          field: "gender",
        },
        {
          label: "Role",
          field: "role",
        },
        {
          label: "DOB",
          field: "dob",
        },

        {
          label: "Department",
          field: "department",
        },
        {
          label: "Status",
          field: "statusText",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  methods: {
    generateAction(name, id) {
      this.id = id;

      const actions = {
        approve: {
          name: "Approve",
          icon: "ph:check",
          doit: () => {
            this.type = name;
            this.$refs.modalStatus.openModal();
          },
        },
        delist: {
          name: "Delist",
          icon: "ph:x-light",
          doit: () => {
            this.type = name;
            this.$refs.modalStatus.openModal();
          },
        },
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: () => {
            // store.dispatch("getUserById", id);
            this.$router.push("/profile/" + id);
          },
        },
        edit: {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: () => {
            // store.dispatch("getUserById", id);
            this.$router.push("/profile/" + id);
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
    handleStatus() {
      if (this.type === "approve") {
        this.$store.dispatch("enableUser", this.id);
      } else {
        this.$store.dispatch("disableUser", this.id);
      }
    },
    handleActions(value) {
      if (value === "active") {
        return this.actions.filter((i) => i.name !== "approve");
      }
      if (value === "delist") {
        return this.actions.filter((i) => i.name !== "delist");
      }
      if (value === "pendingactivation") {
        return this.actions.filter(
          (i) => i.name !== "delist" && i.name !== "approve"
        );
      }
      return value;
    },
  },
  setup() {
    const id = ref(null);
    const modal = ref(null);
    const modalChange = ref(null);
    const modalStatus = ref(null);
    const query = reactive({
      pageNumber: 1,
      pageSize: 10,
      name: "",
      email: "",
      mobileNo: "",
    });
    const { state, dispatch } = useStore();
    onMounted(() => {
      dispatch("getUsers", query);
      dispatch("getRoles");
      id.value = getCurrentInstance().data.id;
    });
    function fetchRecords(page) {
      dispatch("getUsers", { ...query, pageNumber: page });
    }

    function perPage({ currentPage }) {
      query.pageNumber = currentPage;
    }
    const search = ref("");
    const loading = computed(() => state.member.loading);
    const members = computed(() => {
      if (state?.member?.data) {
        return state?.member?.data.map((item) => {
          item.dob = item?.dob ? moment(item?.dob).format("ll") : "-";
          item.department = item?.department ? item?.department : "-";

          return item;
        });
      }
      return [];
    });
    const total = computed(() => state.member.total);
    const roles = computed(() => state.member.roles);
    const addsuccess = computed(() => state.member.addsuccess);
    const deleteloading = computed(() => state.member.deleteloading);
    const deletesuccess = computed(() => state.member.deletesuccess);

    function handleDelete() {
      dispatch("disableUser", id.value);
    }

    // Define a debounce delay (e.g., 500 milliseconds)
    const debounceDelay = 800;
    const debouncedSearch = debounce((searchValue) => {
      dispatch("getUsers", { ...query, name: searchValue });
    }, debounceDelay);
    watch(addsuccess, () => {
      addsuccess.value && dispatch("getUsers", query);
      modalChange.value.closeModal();
    });

    watch(deletesuccess, () => {
      if (deletesuccess.value) {
        dispatch("getUsers", query);
        modalStatus.value.closeModal();
      }
    });

    watch(search, () => {
      debouncedSearch(search.value);
    });
    watch(
      () => query.pageNumber,
      () => {
        dispatch("getUsers", query);
      }
    );
    return {
      query,
      total,
      fetchRecords,
      loading,
      deleteloading,
      members,
      roles,
      search,
      handleDelete,
      modal,
      modalChange,
      modalStatus,
      perPage,
    };
  },
};
</script>
<style lang="scss"></style>
