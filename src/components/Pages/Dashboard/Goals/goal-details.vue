<template>
  <div>
    <div class="lg:flex justify-between flex-wrap items-center mb-6">
      <h1 class="text-slate-900 font-semibold text-lg">GOAL TITLE</h1>
      <div class="flex lg:justify-end items-center flex-wrap gap-x-3">
        <!-- <button
          @click="handleModal('reportadd')"
          class="outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
        >
          <span class="text-lg"><Icon icon="iconamoon:sign-plus-thin" /></span>
          <span>Add Report</span>
        </button> -->
      </div>
    </div>
    <Card bodyClass="p-6">
      <div class="max-w-[980px] mx-auto my-6 rounded-md overflow-x-auto">
        <div class="flex flex-col gap-y-6">
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0 md:gap-x-6"
          >
            <div>
              <h6 class="text-xs font-semibold text-slate-400">Date</h6>
              <p class="text-base font-semibold text-slate-900">John Doe</p>
            </div>

            <div>
              <h6 class="text-xs font-semibold text-slate-400">
                Achievement Date
              </h6>
              <p class="text-base font-semibold text-slate-900">John Doe</p>
            </div>
          </div>
          <div class="col-span-2">
            <h6 class="text-xs font-semibold text-slate-400">Goal KPI</h6>
            <p class="text-base font-semibold text-slate-900">John Doe</p>
          </div>

          <div>
            <h6 class="text-xs font-semibold text-slate-400">Status</h6>
            <p class="text-base font-semibold text-slate-900">John Doe</p>
          </div>
        </div>
      </div>
    </Card>

    <div class="flex lg:justify-end items-center flex-wrap my-6 gap-x-3">
      <button
        type="button"
        @click="handleModal('approve')"
        class="border outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
      >
        <span class="text-lg"><Icon icon="codicon:check-all" /></span>
        <span>Approve</span>
      </button>
      <button
        @click="handleModal('decline')"
        class="border outreach-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900"
      >
        <span class="text-lg"><Icon icon="iconamoon:sign-times-thin" /></span>
        <span>Decline</span>
      </button>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";

export default {
  components: {
    Card,
    Icon,
  },
  inject: {
    handleModal: {
      default: null, // You can specify a default value or set it to null
    },
  },
  methods: {
    print() {
      window.print();
    },
  },
};
</script>
<style lang="scss">
.vgt-wrap__actions-footer {
  border: none !important;
}
.outreach-btn {
  @apply hover:bg-slate-900 hover:text-slate-100 dark:hover:bg-slate-600;
}
@media print {
  .outreach-btn {
    display: none;
  }
  .sidebar-wrapper,
  .app-header,
  .site-footer,
  .shadow-deep {
    @apply hidden;
  }
  .content-wrapper {
    @apply w-full ml-0;
  }
}
</style>
