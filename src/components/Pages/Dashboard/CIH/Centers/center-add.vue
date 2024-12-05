<template>
  <form @submit.prevent="onSubmit">
    <!-- {{ values }}{{ zoneId }} -->
    {{ initialValue }}
    <Card>
      <div class="flex flex-col gap-y-6">
        <Textinput
          label="Name"
          type="text"
          v-model="centerName"
          :error="centerNameError"
          placeholder="Enter a name"
        />
        <!-- <Select
          label="Zone"
          class="min-w-[200px] w-full md:w-auto"
          v-model.value="zone"
          :options="zoneOptions"
          placeholder="Select zone"
          name="zone"
          :error="zoneError"
        /> -->

        <VueSelect
          label="Zone"
          class="min-w-[200px] w-full md:w-auto"
          v-model.value="zone"
          :options="zoneOptions"
          placeholder="Select zone"
          name="zone"
          :error="zoneIdError"
        />

        <div class="assagin space-y-4">
          <Textarea
            label="Description"
            placeholder="Zone description"
            v-model="description"
            :error="descriptionError"
          />
        </div>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button type="submit" text="Add center" btnClass="btn-dark w-full" />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
// import Select from "@/components/Select";
import VueSelect from "@/components/Select/VueSelect";

import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import { useStore } from "vuex";
import { computed, watch, inject } from "vue";
import { useToast } from "vue-toastification";
import Textarea from "@/components/Textarea";
import { ref } from "vue";
const { state, dispatch } = useStore();
const success = computed(() => state.center.addCenterSuccess);
const toast = useToast();
const closeModal = inject("closeModal");
const initialQueryValue = inject("initialValue");
const zoneOptions = inject("zoneOptions");
const zone = ref({
  id: "",
  zoneName: "",
});
// const zoneId = computed(() => zone.value.id);
const formData = reactive({
  centerName: "",
  zoneId: "",
  description: "",
});
const schema = yup.object().shape({
  centerName: yup.string().required("Name is required"),
  zoneId: yup.string().required("Select a zone"),
  description: yup.string().required("Please provide a short description"),
});

const { handleSubmit, values, setValues } = useForm({
  validationSchema: schema,
  initialValues: formData,
});

const { value: centerName, errorMessage: centerNameError } =
  useField("centerName");
const { errorMessage: zoneIdError } = useField("zoneId");

const { value: description, errorMessage: descriptionError } =
  useField("description");

const onSubmit = handleSubmit((values) => {
  // console.log(values);
  // console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
  dispatch("addCenter", values);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
    dispatch("resetSuccess");
    dispatch("getAllCenters", initialQueryValue);
    closeModal();
  } else {
    closeModal();
  }

  // getAllZones();
});
watch(zone, (newValue) => {
  setValues({
    ...values,
    zoneId: newValue.zoneId,
  });
});
</script>
<style lang=""></style>
