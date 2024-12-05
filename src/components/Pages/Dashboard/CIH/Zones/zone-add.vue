<template>
  <form @submit.prevent="onSubmit">
    <Card>
      <div class="">
        <Textinput
          label="Name"
          type="text"
          v-model="name"
          :error="nameError"
          placeholder="Enter a name"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button type="submit" text="Add zone" btnClass="btn-dark w-full" />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { reactive } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";

const formData = reactive({
  name: "",
});
const formDataSchema = yup.object().shape({
  name: yup.string().required("name is required"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: name, errorMessage: nameError } = useField("name");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>
