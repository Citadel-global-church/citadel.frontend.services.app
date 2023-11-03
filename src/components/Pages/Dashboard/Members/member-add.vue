<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="flex flex-col gap-y-5">
        <Textinput
          label="First Name"
          type="text"
          v-model="firstname"
          :error="firstnameError"
          placeholder="Provide a first name"
        />
        <Textinput
          label="Middle name"
          type="text"
          v-model="middlename"
          :error="middlenameError"
          placeholder="Provide a middle name"
        />
        <Textinput
          label="Last name"
          type="text"
          v-model="lastName"
          :error="lastNameError"
          placeholder="Provide a surnanme"
        />
        <div class="">
          <Textinput
            label="Email"
            type="email"
            v-model="emailAddress"
            :error="emailAddressError"
            placeholder="Provide an email address"
          />
        </div>
        <Textinput
          label="Phone"
          type="text"
          v-model="phoneNumber"
          :error="phoneNumberError"
          placeholder="Provide a phone number"
        />
        <Select
          label="Role"
          :options="roles"
          v-model="role"
          :error="roleError"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          type="submit"
          text="Add member"
          btnClass="btn-dark w-full disabled:opacity-50"
          :disabled="loading"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { reactive, computed, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Select from "@/components/Select";
import { useStore } from "vuex";

const { state, dispatch } = useStore();
onMounted(() => {
  dispatch("getRoles");
});
const loading = computed(() => state.member.addloading);
const roles = computed(() =>
  state.member.roles.map((i) => {
    return { value: i, label: i };
  })
);
const formData = reactive({
  lastName: "",
  firstname: "",
  middlename: "",
  role: "",
  phoneNumber: "",
  emailAddress: "",
});
const formDataSchema = yup.object().shape({
  lastName: yup.string().required("lastName is required"),
  firstname: yup.string().required("Firstname is required"),
  middlename: yup.string(),
  role: yup.string().required("Please select a role"),
  phoneNumber: yup.string().required("Phone Number is required"),
  emailAddress: yup
    .string()
    .email("Invalid email format")
    .required("Email Address is required"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: emailAddress, errorMessage: emailAddressError } =
  useField("emailAddress");

const { value: lastName, errorMessage: lastNameError } = useField("lastName");
const { value: firstname, errorMessage: firstnameError } =
  useField("firstname");
const { value: middlename, errorMessage: middlenameError } =
  useField("middlename");
const { value: role, errorMessage: roleError } = useField("role");

const { value: phoneNumber, errorMessage: phoneNumberError } =
  useField("phoneNumber");

const onSubmit = handleSubmit((values) => {
  dispatch("addUser", {
    ...values,
    password: "Password@1234",
  });
});
</script>
<style lang=""></style>
