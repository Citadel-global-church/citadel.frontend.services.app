<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="emailAddress"
      v-model="emailAddress"
      :error="emailAddressError"
      classInput="h-[48px]"
    />
    <!-- <Textinput
      label="Password"
      type="password"
      placeholder="Type your password"
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    /> -->

    <div class="flex justify-between">
      <label class="cursor-pointer flex items-start">
        <input
          type="checkbox"
          class="hidden"
          @change="() => (checkbox = !checkbox)"
        />
        <span
          class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
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
        <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
          >Keep me signed in</span
        >
      </label>
      <router-link
        to="/forgot-password"
        class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >Forgot Password?</router-link
      >
    </div>

    <button
      :disabled="isLoading"
      type="submit"
      class="btn btn-primary block w-full text-center disabled:opacity-60"
    >
      Sign in
    </button>
  </form>
</template>
<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";

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
    // eslint-disable-next-line no-unused-vars
    const { state, dispatch } = useStore();
    const isLoading = computed(() => state.auth.loading);
    const success = computed(() => state.auth.loginchecksuccess);
    const data = computed(() => state.auth.logincheckdata);
    const error = computed(() => state.auth.error);
    // Define a validation schema
    const schema = yup.object({
      emailAddress: yup.string().required("Email is required").email(),
      // password: yup.string().required("Password is required"),
    });

    const router = useRouter();

    // eslint-disable-next-line no-unused-vars
    const goToProfile = () => {
      router.push("/profile");
    };

    const formValues = {
      emailAddress: "",
      // password: "",
    };

    const { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: formValues,
    });
    // No need to define rules for fields

    const { value: emailAddress, errorMessage: emailAddressError } =
      useField("emailAddress");
    const { value: password, errorMessage: passwordError } =
      useField("password");

    const onSubmit = handleSubmit((values) => {
      dispatch("loginCheck", {
        username: values.emailAddress,
      });
    });
    watch(success, () => {
      // toast.success("Sign up successful")
      success.value &&
        router.push(
          `/verify/${encodeURIComponent(emailAddress.value)}/${data.value}`
        );
    });

    return {
      emailAddress,
      isLoading,
      error,
      emailAddressError,
      password,
      passwordError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
