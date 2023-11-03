<template>
  <Card>
    <form @submit.prevent="onSubmit" class="space-y-4 max-w-[700px]">
      <div class="grid grid-cols-1 gap-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Type name of venue"
          name="name"
          v-model="name"
          :error="nameError"
          classInput="h-[40px]"
        />
        <Textinput
          label="Location"
          type="text"
          placeholder="Type your location"
          name="location"
          v-model="location"
          :error="locationError"
          classInput="h-[40px]"
        />
        <Textinput
          label="Capacity"
          type="number"
          placeholder="Type your capacity"
          name="capacity"
          v-model="capacity"
          :error="capacityError"
          classInput="h-[40px]"
        />
        <div class="">
          <div class="gap-4 flex items-end justify-between">
            <div class="flex-1">
              <Textinput
                label="Accessories/Equipment"
                type="text"
                placeholder="Type your accessories"
                name="emil"
                v-model="accessories"
                :error="accessoriesError"
                classInput="h-[40px] w-full"
              />
            </div>

            <div
              @click="pushAccessory(accessories)"
              class="rounded px-4 btn-dark btn-sm h-[40px] flex items-center justify-center gap-2"
            >
              <Icon icon="heroicons-outline:plus" />
            </div>
          </div>

          <div class="mt-4">
            <ol>
              <li
                class="text-sm mb-2"
                v-for="(item, idx) in listOfAccessories"
                :key="item"
              >
                <div class="flex items-center justify-between gap-4">
                  <span> {{ item }}</span>
                  <div
                    @click="removeAccessory(idx)"
                    class="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  >
                    <Icon icon="heroicons-outline:trash" />
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>

        <Textarea
          label="Description"
          type="text"
          placeholder="Type your description"
          name="description"
          v-model="description"
          :error="descriptionError"
          classInput="h-[40px]"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        <!-- <div class="hidden sm:block"></div> -->
        <button type="submit" class="btn btn-dark block w-full text-center">
          Save Changes
        </button>
      </div>
    </form>
  </Card>
</template>

<script setup>
import Icon from "@/components/Icon";

import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { ref } from "vue";
// Define a validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  capacity: yup.number(),
  accessories: yup.string(),
  description: yup.string(),
});

const listOfAccessories = ref([]);
const pushAccessory = (accessory) => {
  if (accessory.length > 0) {
    listOfAccessories.value.push(accessory);
  }
};

const removeAccessory = (idx) => {
  console.log(idx);
  listOfAccessories.value.splice(idx, 1);
};

const formValues = {
  name: "",
  location: "",
  capacity: 0,
  accessories: "dashcode@gmail.com",

  description: "",
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: name, errorMessage: nameError } = useField("name");
const { value: location, errorMessage: locationError } = useField("location");
const { value: capacity, errorMessage: capacityError } = useField("capacity");
const { value: accessories, errorMessage: accessoriesError } =
  useField("accessories");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const onSubmit = handleSubmit((values) => {
  console.log("PersonalDetails: " + JSON.stringify(values));
});
</script>

<style lang="scss" scoped></style>
