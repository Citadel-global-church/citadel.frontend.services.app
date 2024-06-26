<template>
  <div>
    <Card noborder>
      <div class="md:flex pb-6 items-center justify-between">
        <div
          class="flex md:mb-0 mb-3 border border-gray-200 rounded-[6px] text-sm overflow-hidden"
        ></div>
        <div
          class="md:flex md:space-x-3 items-center flex-none"
          :class="window.width < 768 ? 'space-x-rb' : ''"
        >
          <InputGroup
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            prependIcon="heroicons-outline:search"
            merged
            classInput="min-w-[220px] !h-9"
          />
        </div>
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
          styleClass=" vgt-table  centered "
          :rows="advancedTable"
          :sort-options="{
            enabled: false,
          }"
          :pagination-options="{
            enabled: true,
            perPage: perpage,
          }"
          :search-options="{
            enabled: true,
            externalQuery: searchTerm,
          }"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
            selectioninfoClass: 'table-input-checkbox',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectinfo: true, // disable the select info-500 panel on top
            selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
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
                      @click="generateAction(item.name, props.row.id).doit"
                      :class="`
                
                  ${
                    generateAction(item.name, props.row.id).name === 'delete'
                      ? 'bg-danger-500 text-danger-500 bg-opacity-30  hover:bg-opacity-100 hover:text-white'
                      : 'hover:bg-slate-900 hover:text-white'
                  }
                   w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
                    >
                      <span class="text-base"
                        ><Icon
                          :icon="generateAction(item.name, props.row.id).icon"
                      /></span>
                      <span>{{
                        generateAction(item.name, props.row.id).name
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
                :total="50"
                :current="current"
                :per-page="perpage"
                :pageRange="pageRange"
                @page-changed="current = $event"
                :pageChanged="props.pageChanged"
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
</template>
<script>
import Dropdown from "@/components/Dropdown";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";

import { MenuItem } from "@headlessui/vue";
import { advancedTable } from "@/constant/basic-tablle-data";

import window from "@/mixins/window";
export default {
  mixins: [window],
  components: {
    Pagination,
    InputGroup,

    Dropdown,
    Icon,
    Card,
    MenuItem,
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
      filters: ["all", "pending"],
      activeFilter: "",
      dateValue: null,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      actions: [
        {
          name: "Approve",
        },
        {
          name: "Delist",
        },
        {
          name: "view",
        },

        {
          name: "delete",
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
          label: "Name",
          field: "name",
        },
        {
          label: "Role",
          field: "role",
        },
        {
          label: "Email",
          field: "email",
        },

        {
          label: "Phone",
          field: "phone",
        },
        {
          label: "Gender",
          field: "gender",
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
        view: {
          name: "view",
          icon: "heroicons-outline:eye",
          doit: () => {
            this.$router.push("/members-management/preview/" + id);
          },
        },
        edit: {
          name: "edit",
          icon: "heroicons:pencil-square",
          doit: () => {
            this.$router.push("/members-management/edit/" + id);
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
};
</script>
<style lang="scss"></style>
