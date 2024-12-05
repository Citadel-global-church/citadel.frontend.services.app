<template>
  <div>
    <ProfileInputSkeleton v-if="qualificationDataLoading" />

    <Card v-else bodyClass="p-0">
      <header
        class="border-b px-4 border-slate-100 dark:border-slate-700 pt-4 pb-3 flex justify-end items-center"
      >
        <div>
          <Button
            text="Add new"
            icon="heroicons-outline:plus"
            btnClass="btn btn-primary "
            @click="push(formValues)"
          />
        </div>
      </header>

      <!-- <Test /> -->
      <div class="p-6">
        {{ values }}
        <form @submit="onSubmit" novalidate>
          <div
            v-for="(field, idx) in fields"
            :key="field.idx"
            class="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
          >
            <Textinput
              :key="field.idx"
              :id="`highestQualification_${idx}`"
              label="Highest Qualification"
              v-model="values.qualifications[idx].highestQualification"
              type="text"
              :name="`qualifications[${idx}].highestQualification`"
              placeholder="Type your highest qualification"
              :error="firstNameError"
            />
            <Textinput
              :key="field.idx"
              :id="`lowestQualification_${idx}`"
              label="Lowest Qualification"
              type="text"
              v-model="values.qualifications[idx].lowestQualification"
              :name="`qualifications[${idx}].lowestQualification`"
              placeholder="Type your lowest qualification"
            />

            <div class="flex justify-between items-end space-x-5">
              <div class="flex-none relative">
                <button
                  type="button"
                  class="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  @click="remove(idx)"
                >
                  <Icon icon="heroicons-outline:trash" />
                </button>
              </div>
            </div>
          </div>

          <div class="ltr:text-right rtl:text-left">
            <Button
              text="Submit"
              btnClass="btn btn-primary "
              :isDisabled="fields.length === 0"
            />
          </div>
        </form>
      </div>
    </Card>
  </div>
</template>
<script setup>
// import Test from "./test.vue";
import { useForm, useFieldArray } from "vee-validate";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Icon from "@/components/Icon";
import { useToast } from "vue-toastification";
import { inject, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";

onMounted(() => {
  getQualificationData();
  // setValues({
  //   qualifications: [
  //     {
  //       highestQualification: "11",
  //       lowestQualification: "11",
  //     },
  //   ],
  // });
});
const id = inject("id");
const store = useStore();
const getQualificationData = () => {
  store.dispatch("getQualificationsById", id.value);
};
const success = computed(
  () => store.state.profile.updateQualificationDataSuccess
);

const qualificationDataLoading = computed(
  () => store.state.profile.getQualificationDataloading
);

const toast = useToast();
const formValues = {
  userId: id.value,
  highestQualification: "",
  lowestQualification: "",
};

const { handleSubmit, values } = useForm({
  initialValues: {
    qualifications: [formValues],
  },
});

const { remove, push, fields } = useFieldArray("qualifications");
const onSubmit = handleSubmit(() => {
  // console.log(
  //   "Qualifications: " + JSON.stringify(values.qualifications, null, 2)
  // );
  const hasDataError = getQualificationData.value == null;
  if (hasDataError) {
    store.dispatch("createQualification", values.qualifications[0]);
  }
  if (!hasDataError) {
    console.log("PersonalDetails: " + JSON.stringify(values.qualification));

    store.dispatch("updateQualification", values.qualifications[0]);
  }
});

watch();

watch(success, () => {
  if (success.value) {
    toast.success("Successful");
  }
});
</script>
