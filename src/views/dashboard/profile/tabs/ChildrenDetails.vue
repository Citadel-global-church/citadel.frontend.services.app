<template>
  <div>
    <Card bodyClass="p-0">
      <span class="hidden"> {{ values }}</span>
      <!-- <header
        class="border-b px-4 border-slate-100 dark:border-slate-700 pt-4 pb-3 flex justify-end items-center"
      >
      
      </header> -->
      <!-- <ProfileInputSkeleton  /> -->

      <div class="p-6">
        <!-- {{ values }} -->
        <form @submit.prevent="onSubmit()" :validation-schema="schema">
          <div class="flex gap-x-8 mb-12">
            <div class="w-full lg:grid-cols-2 grid-cols-1 grid gap-5 last:mb-0">
              <Textinput
                :id="firstName"
                label="First Name"
                type="text"
                v-model="firstName"
                placeholder="Type your first name"
                :name="firstName"
                :error="firstNameError"
                classInput="h-[40px]"
              />

              <Textinput
                :id="surName"
                label="Last Name"
                type="text"
                v-model="surName"
                placeholder="Type your last name"
                :name="surName"
                :error="surNameError"
                classInput="h-[40px]"
              />

              <Textinput
                :id="middleName"
                label="Middle Name"
                type="text"
                v-model="middleName"
                placeholder="Type your middle name"
                :name="middleName"
                :error="middleNameError"
                classInput="h-[40px]"
              />

              <Textinput
                :id="email"
                label="Email Address"
                type="text"
                v-model="email"
                placeholder="Type your email address"
                :name="email"
                :error="emailError"
                classInput="h-[40px]"
              />

              <Textinput
                :id="mobile1"
                label="Mobile 1"
                type="text"
                v-model="mobile1"
                placeholder="Type your mobile number"
                :name="mobile1"
                :error="mobile1Error"
                classInput="h-[40px]"
              />

              <Textinput
                :id="mobile2"
                label="Mobile 2"
                type="text"
                v-model="mobile2"
                placeholder="Type your mobile 2"
                :name="mobile2"
                :error="mobile2Error"
                classInput="h-[40px]"
              />

              <Select
                label="Title"
                :options="titleMenu"
                v-model.value="title"
                :modelValue="title"
                :error="titleError"
                classInput="!h-[40px]"
              />

              <Select
                label="Gender"
                :options="genderMenu"
                v-model.value="gender"
                :modelValue="gender"
                :error="genderError"
                classInput="!h-[40px]"
              />

              <FormGroup label="DOB" name="d1">
                <flat-pickr
                  v-model="dateOfBirth"
                  class="form-control"
                  id="d1"
                  placeholder="yyyy, dd M"
                  :error="dateOfBirthError"
                />
              </FormGroup>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="submit"
              class="btn btn-primary block w-full text-center"
            >
              Save Changes
            </button>
            <div class="hidden sm:block"></div>
          </div>
        </form>

        <Card v-if="childrenDetails.length > 0" bodyClass="p-0 mt-4">
          <header class="px-4 pt-4 pb-3 mb-3">
            <h5 class="card-title mb-0 !text-[18px]">Children List</h5>
          </header>
          <vue-good-table
            :columns="childrenDetailstable"
            :rows="childrenDetails"
            styleClass=" vgt-table"
            :sort-options="{
              enabled: false,
            }"
          >
            <template v-slot:table-row="props">
              <!-- <span
                v-if="props.column.field == 'gender'"
                class="text-slate-500 dark:text-slate-300"
              >
                {{ props.row.gender }}
              </span> -->

              <span
                v-if="props.column.field == 'dateOfBirth'"
                class="text-slate-500 dark:text-slate-300"
              >
                {{ moment(props.row.dateOfBirth).format("ll") }}
              </span>
              <span v-if="props.column.field == 'action'">
                <div class="flex space-x-3 rtl:space-x-reverse justify-center">
                  <button
                    type="button"
                    class="action-btn btn-primary inline-flex items-center justify-center h-8 w-8 text-lg border rounded text-white"
                    @click="() => $store.dispatch('openChildDetail', props.row)"
                  >
                    <Icon icon="heroicons:pencil-square" />
                  </button>

                  <button
                    type="button"
                    class="inline-flex items-center justify-center h-8 w-8 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                    @click="openDelete(props.row.id, $refs.modal.openModal)"
                  >
                    <Icon icon="heroicons-outline:trash" />
                  </button>
                </div>
              </span>
            </template>
          </vue-good-table>
        </Card>

        <!-- <div
         
          @click="addDetail"
          class="mt-6 ltr:text-right rtl:text-left"
        >
          <Button text="Submit" btnClass="btn btn-primary" />
        </div> -->
      </div>
    </Card>
    <EditChildDetail />
    <Modal
      title="Delete Child"
      label="Small modal"
      labelClass="btn-outline-danger"
      ref="modal"
      sizeClass="max-w-md"
      themeClass="bg-danger-500"
    >
      <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
        Are you sure you want to delete this child?
      </div>

      <template v-slot:footer>
        <div class="flex gap-x-5">
          <Button
            text="Cancel"
            btnClass="btn-outline-secondary btn-sm"
            @click="$refs.modal.closeModal()"
          />
          <Button
            text="Delete"
            btnClass="btn-danger btn-sm"
            @click="deleteChild($refs.modal.closeModal)"
          />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/Modal";
import EditChildDetail from "@/components/Pages/Profile/ChildrensDetails/EditChildDetail.vue";
import Icon from "@/components/Icon";
import Card from "@/components/Card";
import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import { titleMenu, genderMenu, childrenDetailstable } from "@/constant/data";
import Select from "@/components/Select";
import { useToast } from "vue-toastification";
import * as yup from "yup";
import { inject, onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
// import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";
import moment from "moment";
// import { useRouter } from "vue-router";

onMounted(() => {
  getChildrensData();
});
const id = inject("id");

const store = useStore();
const getChildrensData = () => {
  store.dispatch("getChildrenDetailByUserId", id.value);
};

const childrensData = computed(() => store.state.profile.childrensData);
const success = computed(() => store.state.profile.createChildrenDataSuccess);
const deleteSuccess = computed(
  () => store.state.profile.deleteChildDataSuccess
);
// const childrensDataLoading = computed(
//   () => store.state.profile.getChildrensDataloading
// );

const toast = useToast();
const childrenDetails = ref([]);
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  surName: yup.string().required("Last name is required"),
  middleName: yup.string(),
  email: yup.string().required("Email is required").email(),
  mobile1: yup.string(),
  mobile2: yup.string(),

  title: yup.string(),

  gender: yup.string(),
  dateOfBirth: yup.string(),
});

const selectedChildId = ref(null);

const formValues = {
  userId: id.value,
  firstName: "",
  surName: "",
  middleName: "",
  email: "",
  title: "",
  mobile1: "",
  mobile2: "",
  gender: "",
  dateOfBirth: "",
};

const openDelete = (id, openFn) => {
  selectedChildId.value = id;

  openFn();
};

// const removeChild = (idx) => {
//   // Index of the item you want to remove
//   const indexToRemove = idx; // For example, removing "item3"

//   // Use splice to remove the item at the specified index
//   childrenDetails.value.splice(indexToRemove, 1);
// };

// const router = useRouter();

const { handleSubmit, values, setValues } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: firstName, errorMessage: firstNameError } =
  useField("firstName");
const { value: surName, errorMessage: surNameError } = useField("surName");
const { value: middleName, errorMessage: middleNameError } =
  useField("middleName");
const { value: email, errorMessage: emailError } = useField("email");
const { value: mobile1, errorMessage: mobile1Error } = useField("mobile1");
const { value: mobile2, errorMessage: mobile2Error } = useField("mobile2");

const { value: title, errorMessage: titleError } = useField("title");

const { value: gender, errorMessage: genderError } = useField("gender");

const { value: dateOfBirth, errorMessage: dateOfBirthError } =
  useField("dateOfBirth");

// const { remove, push, fields } = useFieldArray("childrenDetails");

// console.log(
//   firstName + surName + middleName + email + mobile1 + mobile2 + title + dateOfBirth
// );

// const resetForm = () => {
//   setValues(formValues);
// };

const prepareDetails = (values) => {
  const createObj = {
    userId: id.value,
    firstName: values.firstName,
    surName: values.surName,
    middleName: values.middleName,
    email: values.email,
    title: values.title,
    mobile1: values.mobile1,
    mobile2: values.mobile2,
    gender: values.gender,
    dateOfBirth: values.dateOfBirth,
  };
  return createObj;
};

const onSubmit = handleSubmit((values) => {
  store.dispatch("createChildren", prepareDetails(values));
});

const deleteChild = (closeFn) => {
  store.dispatch("deleteChildById", selectedChildId.value);
  closeFn();
};

watch(deleteSuccess, () => {
  if (deleteSuccess.value) {
    toast.success("Successfully Deleted");
  }

  getChildrensData();
});

// const addDetail = () => {
//   toast.success("create successful");
//   console.log("PersonalDetails: " + JSON.stringify(childrenDetails.value));
// };

watch(childrensData, () => {
  childrenDetails.value = childrensData.value;
});

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
  }

  setValues(formValues);

  getChildrensData();
});
</script>

<style lang="scss" scoped>
.action-btn {
  @apply flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>
