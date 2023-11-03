<template>
  <div v-if="state.department.addmodal">
    <Modal
      :activeModal="state.department.addmodal"
      @close="closeModal"
      title="Create Department"
      centered
    >
      <form @submit.prevent="createDepartment" class="space-y-4">
        <Textinput
          label="department Name"
          type="text"
          placeholder="Department Name"
          name="departmentName"
          v-model.value="departmentName"
          :error="departmentNameError"
        />
        <div class="assagin space-y-4">
          <!-- <div class="grid lg:grid-cols-2 gap-4 grid-cols-1">
            <FormGroup label="Start Date" name="d1" :error="errorstartDate">
              <flat-pickr
                v-model="startDate"
                class="form-control"
                id="d1"
                placeholder="yyyy, dd M"
                :config="{
                  altInput: true,
                  altFormat: 'F j, Y',
                  dateFormat: 'Y-m-d',
                }"
              />
            </FormGroup>
            <FormGroup label="End Date" name="d2" :error="errorendDate">
              <flat-pickr
                v-model="endDate"
                class="form-control"
                id="d2"
                placeholder="yyyy, dd M"
                :config="{
                  altInput: true,
                  altFormat: 'F j, Y',
                  dateFormat: 'Y-m-d',
                }"
              />
            </FormGroup>
          </div>
          <VueSelect label="Assignee" :error="errorassign">
            <vSelect
              :options="assignOption"
              label="title"
              v-model="assign"
              multiple
            >
              <template #option="{ title, image }">
                <span class="flex items-center space-x-4">
                  <div class="flex-none">
                    <div class="h-7 w-7 rounded-full">
                      <img
                        :src="image"
                        alt=""
                        class="w-full h-full rounded-full"
                      />
                    </div>
                  </div>
                  <span class="flex-1">{{ title }}</span>
                </span>
              </template>
              <template #selected-option="{ title, image }">
                <span class="flex items-center space-x-4">
                  <div class="flex-none">
                    <div class="h-7 w-7 rounded-full">
                      <img
                        :src="image"
                        alt=""
                        class="w-full h-full rounded-full"
                      />
                    </div>
                  </div>
                  <span class="flex-1">{{ title }}</span>
                </span>
              </template>
            </vSelect>
          </VueSelect>

          <VueSelect label="Tag" :error="errorCategory"
            ><vSelect :options="options" v-model="category" multiple
          /></VueSelect> -->
          <Textarea
            label="Department description"
            placeholder="Department description"
            v-model.value="description"
            :error="descriptionError"
          />

          <Select
            label="HOD"
            :options="membersOptions"
            v-model.value="hod"
            :error="hodError"
          />
        </div>

        <div class="text-right">
          <Button
            text="Add department"
            type="submit"
            :disabled="loading"
            btnClass="btn-dark"
          ></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Select from "@/components/Select";
import Button from "@/components/Button";
import { computed, watch } from "vue";
import Modal from "@/components/Modal";
import { useToast } from "vue-toastification";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
// import vSelect from "vue-select";
import { useStore } from "vuex";
import * as yup from "yup";

let { dispatch, state } = useStore();
const toast = useToast();
const membersOptions = computed(() =>
  state?.member?.data.map((i) => {
    return {
      label: i.fullName,
      value: i.userId,
    };
  })
);
const success = computed(() => state.department.addsuccess);
const loading = computed(() => state.department.loading);

const schema = yup.object({
  departmentName: yup.string().required("Name is required"),
  description: yup.string().required("Please provide a short description"),
  hod: yup.string().required("Please select a HOD"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});
const { value: departmentName, errorMessage: departmentNameError } =
  useField("departmentName");
const { value: description, errorMessage: descriptionError } =
  useField("description");
const { value: hod, errorMessage: hodError } = useField("hod");
const createDepartment = handleSubmit((values) => {
  dispatch("addDepartment", {
    userId: hod,
    departmentCode:
      values.departmentName.slice(0, 2).toUpperCase() +
      Math.floor(Math.random() * 100 + 100),
    ...values,
  });
});

const closeModal = () => {
  dispatch("closeModal");
};
watch(success, () => {
  if (success.value) {
    closeModal();
    toast.success("Department created");
  }
});
</script>
<style lang=""></style>
