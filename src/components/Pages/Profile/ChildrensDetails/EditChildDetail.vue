<template>
  <div v-if="state.profile.editModal">
    <Modal
      :activeModal="state.profile.editModal"
      @close="closeEditModal"
      title="Update Child Details"
      centered
    >
      <form @submit.prevent="updateChildDetail" :validation-schema="schema">
        <div class="flex gap-x-8 mb-12">
          <div class="w-full lg:grid-cols-2 grid-cols-1 grid gap-5 last:mb-0">
            <Textinput
              :id="firstName"
              label="First Name"
              type="text"
              v-model="firstName"
              placeholder="Type your first name"
              :name="firstName"
              :error="firstNameError"
              classInput="h-[40px]"
            />

            <Textinput
              :id="surName"
              label="Last Name"
              type="text"
              v-model="surName"
              placeholder="Type your last name"
              :name="surName"
              :error="surNameError"
              classInput="h-[40px]"
            />

            <Textinput
              :id="middleName"
              label="Middle Name"
              type="text"
              v-model="middleName"
              placeholder="Type your middle name"
              :name="middleName"
              :error="middleNameError"
              classInput="h-[40px]"
            />

            <Textinput
              :id="email"
              label="Email Address"
              type="text"
              v-model="email"
              placeholder="Type your email address"
              :name="email"
              :error="emailError"
              classInput="h-[40px]"
            />

            <Textinput
              :id="mobile1"
              label="Mobile 1"
              type="text"
              v-model="mobile1"
              placeholder="Type your mobile number"
              :name="mobile1"
              :error="mobile1Error"
              classInput="h-[40px]"
            />

            <Textinput
              :id="mobile2"
              label="Mobile 2"
              type="text"
              v-model="mobile2"
              placeholder="Type your mobile 2"
              :name="mobile2"
              :error="mobile2Error"
              classInput="h-[40px]"
            />

            <Select
              label="Title"
              :options="titleMenu"
              v-model.value="title"
              :modelValue="title"
              :error="titleError"
              classInput="!h-[40px]"
            />

            <Select
              label="Gender"
              :options="genderMenu"
              v-model.value="gender"
              :modelValue="gender"
              :error="genderError"
              classInput="!h-[40px]"
            />

            <FormGroup label="DOB" name="d1">
              <flat-pickr
                v-model="dateOfBirth"
                class="form-control"
                id="d1"
                placeholder="yyyy, dd M"
                :error="dateOfBirthError"
              />
            </FormGroup>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="submit"
            class="btn btn-primary block w-full text-center"
          >
            Save Changes
          </button>
          <div class="hidden sm:block"></div>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
// import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import { titleMenu, genderMenu } from "@/constant/data";
import Select from "@/components/Select";
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { computed, watch, inject } from "vue";
import { useStore } from "vuex";

import Modal from "@/components/Modal";

let { dispatch, state } = useStore();

const toast = useToast();
const details = computed(() => state.profile.childDetails);
const id = inject("id");

const success = computed(() => state.profile.updateChildrenDataSuccess);
// const loading = computed(() => false);
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  surName: yup.string().required("Last name is required"),
  middleName: yup.string(),
  email: yup.string().required("Email is required").email(),
  mobile1: yup.string(),
  mobile2: yup.string(),

  title: yup.string(),

  gender: yup.string(),
  dateOfBirth: yup.string(),
});

const formValues = {
  userId: "",
  firstName: "",
  surName: "",
  middleName: "",
  email: "",
  title: "",
  mobile1: "",
  mobile2: "",
  gender: "",
  dateOfBirth: "",
};

const { handleSubmit, values, setValues } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
const { value: firstName, errorMessage: firstNameError } =
  useField("firstName");
const { value: surName, errorMessage: surNameError } = useField("surName");
const { value: middleName, errorMessage: middleNameError } =
  useField("middleName");
const { value: email, errorMessage: emailError } = useField("email");
const { value: mobile1, errorMessage: mobile1Error } = useField("mobile1");
const { value: mobile2, errorMessage: mobile2Error } = useField("mobile2");

const { value: title, errorMessage: titleError } = useField("title");

const { value: gender, errorMessage: genderError } = useField("gender");

const { value: dateOfBirth, errorMessage: dateOfBirthError } =
  useField("dateOfBirth");

const prepareDetails = (values) => {
  const updateObj = {
    userId: id.value,
    firstName: values.firstName,
    surName: values.surName,
    middleName: values.middleName,
    email: values.email,
    title: values.title,
    mobile1: values.mobile1,
    mobile2: values.mobile2,
    gender: values.gender,
    dateOfBirth: values.dateOfBirth,
    id: values.id,
  };
  return updateObj;
};

const updateChildDetail = handleSubmit(() => {
  dispatch("updateChildren", prepareDetails(values));
});

watch(details, () => {
  setValues(details.value);
});
watch(success, () => {
  if (success.value) {
    toast.success("Details updated");

    dispatch("getChildrenDetailByUserId", id.value);
    closeEditModal();
  }
});
const closeEditModal = () => {
  dispatch("closeEditModal");
};
</script>
<style lang=""></style>
