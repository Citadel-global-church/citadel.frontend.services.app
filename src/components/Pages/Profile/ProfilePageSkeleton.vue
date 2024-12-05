<template>
  <div class="space-y-5 profile-page animate-pulse">
    <div
      class="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]"
    >
      <div
        class="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"
      ></div>
      <div class="profile-box flex-none md:text-start text-center">
        <div class="md:flex items-end md:space-x-6 rtl:space-x-reverse">
          <div class="flex-none">
            <div
              class="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative"
            >
              <span
                class="inline-block h-1full w-full overflow-hidden rounded-full bg-gray-100"
              >
                <svg
                  class="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
              <div
                class="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
              >
                <Icon icon="heroicons:pencil-square" />
              </div>
            </div>
          </div>
          <div class="flex-1">
            <!-- <div
                class="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]"
              >
                {{ profileData?.fullName }}
              </div>
              <div class="text-sm font-light text-slate-600 dark:text-slate-400">
                {{ profileData?.userRole }}
              </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <div class="lg:col-span-4 col-span-12">
        <Card title=" " className="!h-auto">
          <ul class="list space-y-8">
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:map" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase h-[12px] text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                ></div>
                <div
                  class="h-[16px] text-base bg-slate-600 dark:text-slate-50"
                ></div>
              </div>
            </li>
            <!-- end single list -->
          </ul>
        </Card>
      </div>
      <div class="lg:col-span-8 col-span-12">
        <Card title="" className="min-h-[400px]"> </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
</script>

<style lang="scss" scoped></style>
