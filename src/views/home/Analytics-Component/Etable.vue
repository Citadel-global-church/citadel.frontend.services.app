<template>
  <div>
    <vue-good-table
      :columns="columns"
      styleClass=" vgt-table   table-head lesspadding2   v-middle"
      :rows="recetOrder"
      :pagination-options="{
        enabled: true,
        perPage: perpage,
      }"
      :sort-options="{
        enabled: false,
      }"
    >
      <template v-slot:table-row="props">
        <div v-if="props.column.field == 'user'" class="flex items-center">
          <div class="flex-none">
            <div class="w-8 h-8 rounded-[100%] mr-2">
              <img
                :src="props.row.user.image"
                alt=""
                class="w-full h-full rounded-[100%] object-cover"
              />
            </div>
          </div>
          <div class="flex-1 text-start">
            <h4 class="text-sm font-medium text-slate-600">
              {{ props.row.user.name }}
            </h4>
          </div>
        </div>
        <span v-if="props.column.field == 'status'" class="block w-full">
          <span
            class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
            :class="`${
              props.row.status === 'paid'
                ? 'text-success-500 bg-success-500'
                : ''
            } 
            ${
              props.row.status === 'due'
                ? 'text-warning-500 bg-warning-500'
                : ''
            }
            ${
              props.row.status === 'pending'
                ? 'text-danger-500 bg-danger-500'
                : ''
            }
            ${
              props.row.status === 'cancled'
                ? 'text-danger-500 bg-danger-500'
                : ''
            }
            ${
              props.row.status === 'shipped'
                ? 'text-primary-500 bg-primary-500'
                : ''
            }
            
             `"
          >
            {{ props.row.status }}
          </span>
        </span>
      </template>
      <template #pagination-bottom="props">
        <div class="py-4 px-3 flex justify-center">
          <Pagination
            :total="24"
            :current="current"
            :per-page="perpage"
            :pageRange="pageRange"
            @page-changed="current = $event"
            :pageChanged="props.pageChanged"
            :perPageChanged="props.perPageChanged"
            :options="options"
          >
            >
          </Pagination>
        </div>
      </template>
    </vue-good-table>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";

import { recetOrder } from "../../../constant/basic-tablle-data";

export default {
  components: {
    Pagination,
  },

  data() {
    return {
      recetOrder,
      current: 1,
      perpage: 6,
      pageRange: 5,
      searchTerm: "",
      actions: [
        {
          name: "view",
          icon: "heroicons-outline:eye",
        },
        {
          name: "edit",
          icon: "heroicons:pencil-square",
        },
        {
          name: "delete",
          icon: "heroicons-outline:trash",
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
          label: "User",
          field: "user",
        },
        {
          label: "Product",
          field: "product",
        },

        {
          label: "invoice",
          field: "invoice",
        },

        {
          label: "price",
          field: "price",
        },
        {
          label: "Status",
          field: "status",
        },
      ],
    };
  },
};
</script>
<style lang="scss"></style>
