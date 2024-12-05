<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <ProfileInputSkeleton v-if="churchAffiliationsDataLoading" />

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Select
        label="Level Of ATS"
        :options="levelOfATSMenu"
        v-model.value="levelOfATS"
        :modelValue="levelOfATS"
        :error="levelOfATSError"
        classInput="!h-[40px]"
      />

      <Select
        label="Charter Member"
        :options="isCharterMemberMenu"
        v-model.value="charteredMember"
        :modelValue="charteredMember"
        :error="charteredMemberError"
        classInput="!h-[40px]"
      />

      <Textinput
        v-if="
          (Number(levelOfATS) >= 2 && charteredMember == true) ||
          charteredMember == 'true'
        "
        label="Charter Member Number"
        type="number"
        placeholder="Type your charter number"
        name="charteredMemberNumber"
        v-model="charteredMemberNumber"
        :error="charteredMemberNumberError"
        classInput="h-[40px]"
      />

      <Select
        label="CIH Zone"
        :options="CIHZoneMenu"
        v-model.value="cihZone"
        :modelValue="cihZone"
        :error="cihZoneError"
        classInput="!h-[40px]"
      />

      <Textinput
        label="Mountain of Evidence"
        type="text"
        placeholder="Type your charter number"
        name="mountainOfInfluence"
        v-model="mountainOfInfluence"
        :error="mountainOfInfluenceError"
        classInput="h-[40px]"
      />

      <Select
        label="Affinity Group"
        :options="affinityGroupMenu"
        v-model.value="affinityGroup"
        :modelValue="affinityGroup"
        :error="affinityGroupError"
        classInput="!h-[40px]"
      />

      <!-- <CustomVueSelect
        name="affinityGroup"
        v-model="affinityGroup"
        :modelValue="affinityGroup"
        :error="affinityGroupError"
        :options="affinityGroupMenu"
        label="Affinity Group"
        @update:modelValue="defaultSelectedValue = $event"
      /> -->

      <Select
        label="Department"
        :options="departmentMenu"
        v-model.value="department"
        :modelValue="department"
        :error="departmentError"
        classInput="!h-[40px]"
      />
      <!-- <CustomVueSelect
        name="department"
        v-model="department"
        :modelValue="department"
        :error="departmentError"
        :options="departmentMenu"
        label="Department"
        @update:modelValue="defaultSelectedValue = $event"
      /> -->

      <Select
        label="CIH Address"
        :options="CIHAddressMenu"
        v-model.value="cihAddress"
        :modelValue="cihAddress"
        :error="cihAddressError"
        classInput="!h-[40px]"
      />
      <!-- <CustomVueSelect
        name="cihAddress"
        v-model="cihAddress"
        :modelValue="cihAddress"
        :error="cihAddressError"
        :options="cihAddressMenu"
        label="CIH Address"
        @update:modelValue="defaultSelectedValue = $event"
      /> -->
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
      <button type="submit" class="btn btn-primary block w-full text-center">
        Save Changes
      </button>
      <div class="hidden sm:block"></div>
    </div>
  </form>
</template>

<script setup>
import Select from "@/components/Select";
import { computed, watch } from "vue";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
// import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";

// import { useRouter } from "vue-router";
import {
  levelOfATSMenu,
  isCharterMemberMenu,
  CIHZoneMenu,
  affinityGroupMenu,
  departmentMenu,
  CIHAddressMenu,
} from "@/constant/data";

import { inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

onMounted(() => {
  getChurchAffiliationsData();
});
const id = inject("id");
const store = useStore();
const toast = useToast();
const getChurchAffiliationsData = () => {
  store.dispatch("getChurchAffiliationsById", id.value);
};
const churchAffiliationsDataLoading = computed(
  () => store.state.profile.getChurchAffiliationsDataloading
);

const churchAffiliationsData = computed(
  () => store.state.profile.churchAffiliationsData
);

const success = computed(
  () => store.state.profile.updateChurchAffiliationDataSuccess
);

const schema = yup.object({
  levelOfATS: yup.string(),
  charteredMember: yup.bool(),
  charteredMemberNumber: yup.number().nullable(),
  cihZone: yup.string(),
  mountainOfInfluence: yup.string(),
  affinityGroup: yup.string(),
  department: yup.string(),
  cihAddress: yup.string(),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: churchAffiliationsData.value,
});
// No need to define rules for fields

const { value: levelOfATS, errorMessage: levelOfATSError } =
  useField("levelOfATS");
const { value: charteredMember, errorMessage: charteredMemberError } =
  useField("charteredMember");
const {
  value: charteredMemberNumber,
  errorMessage: charteredMemberNumberError,
} = useField("charteredMemberNumber");
const { value: cihZone, errorMessage: cihZoneError } = useField("cihZone");
const { value: mountainOfInfluence, errorMessage: mountainOfInfluenceError } =
  useField("mountainOfInfluence");
const { value: affinityGroup, errorMessage: affinityGroupError } =
  useField("affinityGroup");

const { value: department, errorMessage: departmentError } =
  useField("department");

const { value: cihAddress, errorMessage: cihAddressError } =
  useField("cihAddress");

const prepareDetails = (values, type) => {
  const updateObj = {
    id: churchAffiliationsData.value?.id,
    userId: id.value,
    levelOfATS: String(values.levelOfATS),
    charteredMember:
      values.charteredMember == true || values.charteredMember == "true"
        ? true
        : false,
    charteredMemberNumber: String(values.charteredMemberNumber),
    cihZone: values.cihZone,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup,
    department: values.department,
    cihAddress: values.cihAddress,
  };
  const createObj = {
    userId: id.value,
    levelOfATS: String(values.levelOfATS),
    charteredMember:
      values.charteredMember == true || values.charteredMember == "true"
        ? true
        : false,
    charteredMemberNumber: String(values.charteredMemberNumber),
    cihZone: values.cihZone,
    mountainOfInfluence: values.mountainOfInfluence,
    affinityGroup: values.affinityGroup,
    department: values.department,
    cihAddress: values.cihAddress,
  };
  const obj = type == "create" ? createObj : updateObj;
  return obj;
};
const onSubmit = handleSubmit((values) => {
  // console.log("PersonalDetails: " + JSON.stringify(prepareDetails(values)));
  const hasDataError = churchAffiliationsData.value == null;
  if (hasDataError) {
    store.dispatch("createChurchAffiliation", prepareDetails(values, "create"));
  }
  if (!hasDataError) {
    store.dispatch("updateChurchAffiliation", prepareDetails(values, "edit"));
  }
});

watch(churchAffiliationsData, () => {
  // setValues({
  //   charteredMember:
  //     churchAffiliationsData.value.charteredMember == true ? "true" : "false",
  //   ...churchAffiliationsData.value,
  // });
  setValues(churchAffiliationsData.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
});
</script>

<style lang="scss" scoped></style>
