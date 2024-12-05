<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="OTP"
      type="text"
      placeholder="Type your otp code"
      name="otp"
      v-model="otp"
      :error="otpError"
      classInput="h-[48px]"
    />
    <Textinput
      label="New Password"
      type="password"
      placeholder="Type your new password"
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />
    <Textinput
      label="Confirm Password"
      type="password"
      placeholder="Type your password"
      name="confirmPassword"
      v-model="confirmPassword"
      :error="confirmPasswordError"
      hasicon
      classInput="h-[48px]"
    />

    <button
      type="submit"
      :disabled="isOtpLoading"
      class="btn btn-primary block w-full text-center disabled:opacity-50"
    >
      Submit
    </button>
    <button
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
<script>
import { computed, watch, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

export default {
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    const toast = useToast();
    const router = useRouter();
    const { state, dispatch } = useStore();
    const route = useRoute();

    const isOtpLoading = computed(() => state.auth.loading);
    const isSuccess = computed(() => state.auth.resetsuccess);
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
    const handleOtp = () => {
      dispatch("forgotPassword", {
        emailAddress: route.params.email,
        grantType: "password",
      });
    };
    // Define a validation schema
    const schema = yup.object({
      password: yup.string().required("Password is required"),
      confirmPassword: yup.string().required("Confirm your password"),
      otp: yup.string().required("Provide your otp"),
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: confirmPassword, errorMessage: confirmPasswordError } =
      useField("confirmPassword");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const { value: otp, errorMessage: otpError } = useField("otp");

    const onSubmit = handleSubmit((values) => {
      const val = {
        ...values,
        username: route.params.email,
        token: values.otp,
        newPassword: values.password,
      };

      dispatch("resetPassword", val);
    });

    onMounted(() => {
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
      toast.success("Password changed");
      router.push("/");
    });
    return {
      otp,
      otpError,
      password,
      confirmPasswordError,
      confirmPassword,
      passwordError,
      onSubmit,
      resendDisabled,
      isOtpLoading,
      handleOtp,
      resendCountdown,
    };
  },
};
</script>
<style lang="scss"></style>
