<template>
  <div>
    <Breadcrumb />
    <div class="card-auto space-y-5">
      <div class="grid grid-cols-12 gap-5">
        <div class="lg:col-span-8 col-span-12 space-y-5">
          <Card>
            <div class="grid xl:grid-cols-4 lg:grid-cols-2 col-span-1 gap-3">
              <div
                v-for="(item, i) in statistics"
                :key="i"
                :class="item.bg"
                class="rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-25 relative z-[1]"
              >
                <div class="overlay absolute left-0 top-0 w-full h-full z-[-1]">
                  <img
                    :src="item.img"
                    alt=""
                    draggable="false"
                    class="w-full h-full object-contain"
                  />
                </div>
                <span
                  class="block mb-6 text-sm text-slate-900 dark:text-white font-medium"
                  >{{ item.title }}</span
                >
                <span
                  class="block mb- text-2xl text-slate-900 dark:text-white font-medium mb-6"
                  >{{ item.count }}</span
                >
                <div class="flex space-x-2">
                  <div class="flex-none text-xl" :class="item.text">
                    <Icon :icon="item.icon" />
                  </div>
                  <div class="flex-1 text-sm">
                    <span class="block mb-[2px]" :class="item.percentClass">{{
                      item.percent
                    }}</span>
                    <span class="block mb-1 text-slate-600 dark:text-slate-300"
                      >From last week</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <header class="md:flex md:space-y-0 space-y-4">
              <h6 class="flex-1 text-slate-900 dark:text-white capitalize">
                Members distribution by venue
              </h6>
              <div class="flex-none">
                <FormGroup>
                  <flat-pickr
                    class="form-control bg-white"
                    placeholder="Select date range"
                    v-model="rangeDate"
                    :config="{ mode: 'range' }"
                  />
                </FormGroup>
              </div>
            </header>

            <div class="legend-ring">
              <apexchart
                type="bar"
                height="410"
                :options="
                  this.$store.state.isDark
                    ? stackedDark.chartOptions
                    : stacked.chartOptions
                "
                :series="stacked.series"
              />
            </div>
          </Card>
          <Card title="Departments Overview" noborder>
            <template #header>
              <DropEvent />
            </template>
            <div class="-mx-6">
              <CrmTable />
            </div>
          </Card>
        </div>
        <div class="flex flex-col lg:col-span-4 col-span-12 space-y-5">
          <Card title="Goals">
            <template #header>
              <DropEvent />
            </template>
            <div class="grid grid-cols-1 gap-y-6">
              <div v-for="(item, i) in progressBackground" :key="i">
                <p class="text-sm mb-1">Goal Title</p>
                <ProgressBar
                  :value="item.value"
                  :barColor="item.barColor"
                  showValue
                  height="h-3"
                />
              </div>
            </div>
          </Card>
          <Card title="Appointments">
            <template #header>
              <button type="button" class="btn btn-dark btn-sm">
                Add More
              </button>
            </template>
            <div class="-mx-6 custom-calender">
              <v-calendar
                is-expanded
                :attributes="attributes"
                :is-dark="this.$store.state.isDark"
              />
            </div>
            <ul class="divide-y divide-slate-100 dark:divide-slate-700">
              <li v-for="(item, i) in meets" :key="i" class="block py-[10px]">
                <div class="flex space-x-2">
                  <div class="flex-1 flex space-x-2">
                    <div class="flex-none">
                      <div class="h-8 w-8">
                        <img
                          :src="item.img"
                          alt=""
                          class="block w-full h-full object-cover rounded-full border hover:border-white border-transparent"
                        />
                      </div>
                    </div>
                    <div class="flex-1">
                      <span
                        class="block text-slate-600 text-sm dark:text-slate-300 mb-1 font-medium"
                        >{{ item.title }}</span
                      >
                      <span
                        class="flex font-normal text-xs dark:text-slate-400 text-slate-500"
                      >
                        <span class="text-base inline-block mr-1"
                          ><Icon icon="heroicons-outline:video-camera"
                        /></span>
                        {{ item.meet }}
                      </span>
                    </div>
                  </div>
                  <div class="flex-none">
                    <span
                      class="block text-xs text-slate-600 dark:text-slate-400"
                      >{{ item.date }}</span
                    >
                  </div>
                </div>
              </li>
            </ul>
          </Card>

          <Card title="Events">
            <template #header>
              <DropEvent />
            </template>
            <ul class="relative pl-2">
              <li
                v-for="(item, i) in trackingParcel.slice(0, 5)"
                :key="i"
                :class="
                  item.status === 'ok'
                    ? 'before:opacity-100'
                    : ' before:opacity-50'
                "
                class="border-l-2 border-slate-100 dark:border-slate-700 pb-4 last:border-none pl-[22px] relative before:absolute before:left-[-8px] before:top-[0px] before:rounded-full before:w-4 before:h-4 before:bg-slate-900 dark:before:bg-slate-600 before:leading-[2px] before:content-[url('@/assets/images/all-img/ck.svg')]"
              >
                <div class="p-[10px] relative top-[-20px]">
                  <h2
                    class="text-sm font-medium dark:text-slate-400-900 mb-1 text-slate-600"
                  >
                    {{ item.title }}
                  </h2>
                  <p class="text-xs capitalize dark:text-slate-400">
                    {{ item.date }}
                  </p>
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from "./Analytics-Component/Breadcrumbs";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Icon from "@/components/Icon";
import CrmTable from "./Analytics-Component/CrmTable";
import ProgressBar from "@/components/ProgressBar";

import {
  pieChart,
  pieChartDark,
  stacked,
  stackedDark,
} from "./Analytics-Component/data";
import DropEvent from "./Analytics-Component/DropEvent";
import { trackingParcel } from "../../constant/data";

export default {
  components: {
    Card,
    Icon,
    CrmTable,
    DropEvent,
    FormGroup,
    Breadcrumb,
    ProgressBar,
  },
  data() {
    return {
      stacked,
      stackedDark,
      rangeDate: null,
      pieChart,
      pieChartDark,
      trackingParcel,
      statistics: [
        {
          title: "Members",
          count: "354",
          bg: "bg-warning-500",
          text: "text-primary-500",
          percent: "25.67% ",
          icon: "heroicons:arrow-trending-up",
          img: require("@/assets/images/all-img/shade-1.png"),
          percentClass: "text-primary-500",
        },
        {
          title: "Venues ",
          count: "$86,954",

          bg: "bg-info-500",
          text: "text-primary-500",
          percent: "8.67%",
          icon: "heroicons:arrow-trending-up",
          img: require("@/assets/images/all-img/shade-2.png"),
          percentClass: "text-primary-500",
        },
        {
          title: "Outreaches",
          count: "15%",
          bg: "bg-primary-500",
          text: "text-danger-500",
          percent: "1.67%  ",
          icon: "heroicons:arrow-trending-down",
          img: require("@/assets/images/all-img/shade-3.png"),
          percentClass: "text-danger-500",
        },
        {
          title: "Events",
          count: "654",
          bg: "bg-success-500",
          text: "text-primary-500",
          percent: "11.67%  ",
          icon: "heroicons:arrow-trending-up",
          img: require("@/assets/images/all-img/shade-4.png"),
          percentClass: "text-primary-500",
        },
      ],
      Campaigns: [
        {
          name: "Channel",
          value: "roi",
        },
        {
          name: "Email",
          value: "40%",
        },
        {
          name: "Website",
          value: "28%",
        },
        {
          name: "Facebook",
          value: "34%",
        },
        {
          name: "Offline",
          value: "17%",
        },
      ],
      progressDefault: [
        {
          value: 50,
        },
        {
          value: 70,
        },
        {
          value: 80,
        },
      ],
      progressBackground: [
        {
          value: 50,
          barColor: "bg-primary-500",
        },
        {
          value: 70,
          barColor: "bg-success-500",
        },
        {
          value: 80,
          barColor: "bg-info-500",
        },
      ],
      progressHeight: [
        {
          value: 50,
          title: "Progress sm",
          barColor: "bg-primary-500",
          height: "h-1",
        },
        {
          value: 70,
          title: "Progress md",
          barColor: "bg-success-500",
          height: "h-[6px]",
        },
        {
          value: 80,
          title: "Progress lg",
          barColor: "bg-warning-500",
          height: "h-[10px]",
        },

        {
          value: 100,
          title: "Progress xl",
          barColor: "bg-danger-500",
          height: "h-4",
        },
      ],
      attributes: [
        {
          key: "today",
          highlight: {
            color: "gray-500",
            fillMode: "solid",
          },

          dates: new Date(),
        },
        {},
      ],
      meets: [
        {
          img: require("@/assets/images/svg/dc.svg"),
          title: "Meeting with client",
          date: "01 Nov 2021",
          meet: "Zoom meeting",
        },
        {
          img: require("@/assets/images/svg/dc.svg"),
          title: "Design meeting (team)",
          date: "01 Nov 2021",
          meet: "Skyp meeting",
        },
        {
          img: require("@/assets/images/svg/dc.svg"),
          title: "Background research",
          date: "01 Nov 2021",
          meet: "Google meeting",
        },
        {
          img: require("@/assets/images/svg/dc.svg"),
          title: "Meeting with client",
          date: "01 Nov 2021",
          meet: "Zoom meeting",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.custom-calender {
  .vc-pane-container,
  .vc-pane-layout,
  .vc-container,
  .vc-container * {
    border: none !important;
    font-family: "Inter", sans-serif !important;
    //background: #fafbff !important;
    font-weight: 400;
  }
  .vc-title {
    color: #0f172a !important;
    font-size: 24px !important;
    font-weight: 500 !important;
    margin-bottom: 15px !important;
  }
  .vc-arrow {
    margin-left: 10px !important;
    margin-right: 10px !important;
    color: #0f172a !important;
  }
  .vc-weekday {
    @apply font-normal dark:text-slate-400 text-sm text-slate-600;
  }
  .vc-day {
    @apply text-slate-900 dark:text-white;
  }
  .vc-highlight {
    background-color: #0f172a !important;
  }
}
.dark {
  .custom-calender {
    .vc-title {
      color: #fff !important;
    }
    .vc-arrow {
      color: #fff !important;
    }
  }
  .vc-container,
  .vc-container {
    @apply bg-slate-800;
  }
}
</style>
