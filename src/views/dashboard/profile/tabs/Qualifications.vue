<template>
  <div>
    <ProfileInputSkeleton v-if="qualificationDataLoading" />

    <Card v-else bodyClass="p-0">
      <div class="p-6">
        <form @submit="onSubmit" novalidate>
          <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Textinput
              label="highestQualification"
              type="text"
              placeholder="Type your highest qualification"
              name="highestQualification"
              v-model="highestQualification"
              :error="highestQualificationError"
              classInput="h-[40px]"
            />

            <Textinput
              label="professionalQualification"
              type="text"
              placeholder="Type your professional qualification"
              name="professionalQualification"
              v-model="professionalQualification"
              :error="professionalQualificationError"
              classInput="h-[40px]"
            />
          </div>
          <div class="ltr:text-right rtl:text-left">
            <Button text="Submit" btnClass="btn btn-primary " />
          </div>
        </form>
      </div>
    </Card>
  </div>
</template>
<script setup>
// import Test from "./test.vue";
import { useForm, useField } from "vee-validate";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import { useToast } from "vue-toastification";
import { inject, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";
import * as yup from "yup";

onMounted(() => {
  getQualificationData();
});
const id = inject("id");
const store = useStore();
const getQualificationData = () => {
  store.dispatch("getQualificationsById", id.value);
};
const qualificationData = computed(() => store.state.profile.qualificationData);

const success = computed(
  () => store.state.profile.updateQualificationDataSuccess
);

const qualificationDataLoading = computed(
  () => store.state.profile.getQualificationDataloading
);

const toast = useToast();

const schema = yup.object({
  highestQualification: yup.string().required("This field is required"),
  professionalQualification: yup.string().required("This field is required"),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: qualificationData.value,
});

const { value: highestQualification, errorMessage: highestQualificationError } =
  useField("highestQualification");

const {
  value: professionalQualification,
  errorMessage: professionalQualificationError,
} = useField("professionalQualification");

const prepareDetails = (values, type) => {
  const updateObj = {
    id: qualificationData.value?.id,
    userId: id.value,
    highestQualification: values.highestQualification,
    professionalQualification: values.professionalQualification,
  };
  const createObj = {
    userId: id.value,
    highestQualification: values.highestQualification,
    professionalQualification: values.professionalQualification,
  };
  const obj = type == "create" ? createObj : updateObj;
  return obj;
};

const onSubmit = handleSubmit((values) => {
  const hasDataError = qualificationData.value == null;
  if (hasDataError) {
    store.dispatch("createQualification", prepareDetails(values, "create"));
  }
  if (!hasDataError) {
    store.dispatch("updateQualification", prepareDetails(values, "edit"));
  }
});

watch(qualificationData, () => {
  setValues(qualificationData.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
});
</script>
