<template>
  <Card>
    <form @submit.prevent="onSubmit" class="space-y-4 max-w-[700px]">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Textinput
          label="Purpose of Appointment"
          type="text"
          placeholder="Type your purpose"
          name="purpose"
          v-model="purpose"
          :error="purposeError"
          classInput="h-[40px]"
        />
        <Textinput
          label="Who to See"
          type="text"
          placeholder="Type who to see"
          name="whoToSee"
          v-model="whoToSee"
          :error="whoToSeeError"
          classInput="h-[40px]"
        />

        <FormGroup label="Date of Appointment" name="d1">
          <flat-pickr
            v-model="DOA"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>

        <!-- <FormGroup label="Time of Appointment" name="d2">
          <flat-pickr
            v-model="timeOfAppointment"
            class="form-control"
            id="d2"
            placeholder="yyyy, dd M"
          />
        </FormGroup> -->

        <FormGroup label="Time of Appointment" name="d3">
          <flat-pickr
            class="form-control"
            id="d3"
            placeholder="hh mm"
            v-model="timeOfAppointment"
            :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
          />
        </FormGroup>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
        <div class="hidden sm:block"></div>
        <button type="submit" class="btn btn-dark block w-full text-center">
          Save Changes
        </button>
      </div>
    </form>
  </Card>
</template>

<script setup>
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
// import { useRouter } from "vue-router";
// Define a validation schema
const schema = yup.object({
  purpose: yup.string(),
  whoToSee: yup.string(),
  DOA: yup.string(),
  timeOfAppointment: yup.string(),
});

// const router = useRouter();

const formValues = {
  purpose: "",
  whoToSee: "",
  DOA: "",
  timeOfAppointment: "",
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: purpose, errorMessage: purposeError } = useField("purpose");
const { value: whoToSee, errorMessage: whoToSeeError } = useField("whoToSee");
const { value: DOA } = useField("DOA");
const { value: timeOfAppointment } = useField("timeOfAppointment");

// const { value: email, errorMessage: emailError } = useField("email");

const onSubmit = handleSubmit((values) => {
  console.log("Appointment Details: " + JSON.stringify(values));
});
</script>

<style lang="scss" scoped></style>
