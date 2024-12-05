<template>
  <div>
    <Modal
      :activeModal="state.zone.editModal"
      @close="closeModal"
      title="Edit Zone"
      centered
    >
      <form @submit.prevent="updateZone" class="space-y-4">
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
          <Button text="Update zone" btnClass="btn-dark"></Button>
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
import { computed, watch } from "vue";
import { useToast } from "vue-toastification";

const { state, dispatch } = useStore();
const zone = computed(() => state.zone.zone);
const success = computed(() => state.zone.updateZoneSuccess);
const toast = useToast();

const schema = yup.object({
  zoneName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: zone.value,
});
const { value: zoneName, errorMessage: zoneNameError } = useField("zoneName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

// const { value: category, errorMessage: errorCategory } = useField("category");

const updateZone = handleSubmit((values) => {
  dispatch("updateZone", values);
});

const closeModal = () => {
  dispatch("closeEditModal");
};

watch(zone, () => {
  setValues(zone.value);
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Updated");
    dispatch("getZones");
    closeModal();
  } else {
    closeModal();
  }

  // getAllZones();
});
</script>
<style lang=""></style>
