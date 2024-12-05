<template>
  <div>
    <Modal
      :activeModal="state.zone.addmodal"
      @close="closeModal"
      title="Create Zone"
      centered
    >
      <form @submit.prevent="addZone" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Zone Name"
          name="zoneName"
          v-model.trim="zoneName"
          :error="zoneNameError"
        />
        <div class="assagin space-y-4">
          <Textarea
            label="Description"
            placeholder="Zone description"
            v-model="description"
            :error="descriptionError"
          />
        </div>

        <div class="text-right">
          <Button text="Add zone" btnClass="btn-dark"></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import * as yup from "yup";
import { useToast } from "vue-toastification";

import { computed, watch } from "vue";

const { state, dispatch } = useStore();
const success = computed(() => state.zone.addZoneSuccess);
const toast = useToast();
const schema = yup.object({
  zoneName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: zoneName, errorMessage: zoneNameError } = useField("zoneName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const addZone = handleSubmit((values) => {
  dispatch("addZone", values);
});

const closeModal = () => {
  dispatch("closeModal");
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
    dispatch("getZones");
  }

  closeModal();

  // getAllZones();
});
</script>
<style lang=""></style>
