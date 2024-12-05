<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="First name"
      type="text"
      placeholder="Enter your first Name"
      name="firstName"
      v-model="firstName"
      :error="firstNameError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Last name"
      type="text"
      placeholder="Enter your last name"
      name="lastName"
      v-model="lastName"
      :error="lastNameError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="emailAddress"
      v-model="emailAddress"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Phone Number"
      type="text"
      placeholder="Provide your phone number"
      name="phoneNumber"
      v-model="phoneNumber"
      :error="phoneNumberError"
      classInput="h-[48px]"
    />
    <!-- <Textinput
      label="Password"
      type="password"
      placeholder="8+ chars, 1 capital or lower letter,1 number, 1 special char "
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    /> -->

    <div class="flex items-start">
      <label class="cursor-pointer flex items-start">
        <input
          type="checkbox"
          class="hidden"
          @change="() => (checkbox = !checkbox)"
        />
        <span
          class="h-4 w-4 border rounded inline-flex mr-3 relative flex-none top-1 transition-all duration-150"
          :class="
            checkbox
              ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
              : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
          "
        >
          <img
            src="@/assets/images/icon/ck-white.svg"
            alt=""
            class="h-[10px] w-[10px] block m-auto"
            v-if="checkbox"
          />
        </span>
      </label>
      <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
        >You accept our
        <router-link class="font-medium" to="/terms"
          >Terms and Conditions</router-link
        >
        and
        <router-link class="font-medium" to="/privacy"
          >Privacy Policy</router-link
        ></span
      >
    </div>

    <button
      type="submit"
      class="btn btn-primary block w-full text-center disabled:opacity-60"
      :disabled="!checkbox || isLoading"
    >
      Create an account
    </button>
  </form>
</template>
<script setup>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useToast } from "vue-toastification";

// eslint-disable-next-line no-unused-vars
const { state, dispatch } = useStore();
const isLoading = computed(() => state.auth.loading);
const isSuccess = computed(() => state.auth.signupsuccess);
// const initialValues = {
//   firstName: "string",
//   middleName: "string",
//   lastName: "string",
//   gender: "string",
//   avatarUrl: "string",
//   emailAddress: "string",
//   phoneNumber: "string",
//   userRole: "administrator",
//   status: "",
//   dateOfBirth: "2023-10-24T15:14:35.483Z",
//   password: "string",
// };
const checkbox = ref(false);
// Define a validation schema
const schema = yup.object({
  emailAddress: yup.string().required("Email is required").email(),
  // password: yup
  //   .string()
  //   .required("Password is required")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //     "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character (@, $, !, %, *, ?, or &)"
  //   ),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{11}$/, "Phone number must be a 11-digit number")
    .required("Phone number is required"),
});

// eslint-disable-next-line no-unused-vars
const toast = useToast();
const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: schema,
});
// No need to define rules for fields

const { value: emailAddress, errorMessage: emailError } =
  useField("emailAddress");
const { value: firstName, errorMessage: firstNameError } =
  useField("firstName");
const { value: lastName, errorMessage: lastNameError } = useField("lastName");
const { value: phoneNumber, errorMessage: phoneNumberError } =
  useField("phoneNumber");
// const { value: password, errorMessage: passwordError } = useField("password");

// eslint-disable-next-line no-unused-vars
const onSubmit = handleSubmit((values) => {
  dispatch("signup", values);
});

watch(isSuccess, () => {
  // toast.success("Sign up successful")
  isSuccess.value &&
    router.push(`/email-verify/${encodeURIComponent(emailAddress.value)}`);
});
</script>
<style lang="scss"></style>
