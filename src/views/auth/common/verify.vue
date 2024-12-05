<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      :label="`${
        route.params.type.toLowerCase() === 'otp' ? 'OTP password' : 'Password'
      }`"
      type="password"
      :placeholder="`Type your ${
        route.params.type.toLowerCase() === 'otp' ? 'otp' : 'password'
      }`"
      name="password"
      v-model="password"
      hasicon
      classInput="h-[48px]"
      required
      :error="passwordError"
    />

    <button
      :disabled="isLoading"
      type="submit"
      class="btn btn-primary block w-full text-center disabled:opacity-60"
    >
      Verify
    </button>

    <button
      v-if="route.params.type.toLowerCase() === 'otp'"
      type="button"
      class="btn btn-light block w-full text-center"
      @click="handleOtp"
      :disabled="resendDisabled || isOtpLoading"
    >
      Resend OTP
      <span v-if="resendDisabled">
        (Resend in {{ resendCountdown }} seconds)</span
      >
    </button>
  </form>
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useRoute } from "vue-router";
import { ref, watch, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import Textinput from "@/components/Textinput";

const route = useRoute();
const { state, dispatch } = useStore();
const toast = useToast();
const isLoading = computed(() => state.auth.loading);
const isOtpLoading = computed(() => state.auth.loading);
const isSuccess = computed(() => state.auth.loginsuccess);
const isOtpSuccess = computed(() => state.auth.requestsuccess);
const resendCountdown = ref(20);
const resendDisabled = ref(true);

const resendOTP = () => {
  // Implement your OTP resend logic here
  // Disable the button and start the countdown
  resendDisabled.value = true;
  let countdown = 20; // 2 minutes
  resendCountdown.value = countdown;

  const interval = setInterval(() => {
    countdown--;
    resendCountdown.value = countdown;
    if (countdown <= 0) {
      clearInterval(interval);
      resendDisabled.value = false;
    }
  }, 1000);
};

const formValues = {
  password: "",
};
// Define a validation schema
const schema = yup.object({
  password: yup.string().required("Password is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: password, errorMessage: passwordError } = useField("password");

const handleOtp = () => {
  dispatch("requestOtp", {
    emailAddress: route.params.email,
    grantType: "password",
  });
};
const onSubmit = handleSubmit((values) => {
  dispatch("login", {
    ...values,
    username: route.params.email,
    grantType: "password",
  });
});

// Automatically start the countdown on component mount
onMounted(() => {
  if (route.params.type.toLowerCase() === "otp") {
    handleOtp();
  }
  watch(
    resendDisabled,
    (newValue) => {
      if (newValue) {
        const interval = setInterval(() => {
          resendCountdown.value--;
          if (resendCountdown.value <= 0) {
            clearInterval(interval);
            resendDisabled.value = false;
          }
        }, 1000);
      }
    },
    { immediate: true }
  );
});

watch(isOtpSuccess, () => {
  if (isOtpSuccess.value) {
    toast.success("Otp sent");
    resendOTP();
  }
});
watch(isSuccess, () => {
  toast.success("Login successful");
  if (route.query.redirect_from) {
    window.location.replace(route.query.redirect_from);
  } else {
    window.location.replace("/overview");
  }
});
</script>

<style lang="scss"></style>
