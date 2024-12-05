<template>
  <form @submit.prevent="onSubmit">
    <Card>
      <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Textinput
          label="First Name"
          type="text"
          v-model="firstname"
          :error="firstnameError"
          placeholder="Add your first name"
        />
        <Textinput
          label="Middle name"
          type="text"
          v-model="middlename"
          :error="middlenameError"
          placeholder="Add your middle name"
        />
        <Textinput
          label="Surname"
          type="text"
          v-model="surname"
          :error="surnameError"
          placeholder="Add your surnanme"
        />
        <Select
          label="Gender"
          :options="genderOptions"
          v-model="gender"
          :error="genderError"
        />
        <FormGroup
          label="Date of birth"
          name="dateOfBirth"
          :error="dateOfBirthError"
        >
          <flat-pickr
            v-model="dateOfBirth"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>
        <Textinput
          label="Phone"
          type="text"
          v-model="phoneNumber"
          :error="phoneNumberError"
          placeholder="Add your phone"
        />
        <div class="lg:col-span-2 col-span-1">
          <Textinput
            label="Email"
            type="email"
            v-model="emailAddress"
            :error="emailAddressError"
            placeholder="Add your email"
          />
        </div>
        <FormGroup
          label="Date of visit"
          name="dateOfVisit"
          :error="dateOfVisitError"
        >
          <flat-pickr
            v-model="dateOfVisit"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>

        <Select
          label="Purpose of visit"
          :options="purposeOptions"
          v-model="purposeOfVisit"
          :error="purposeOfVisitError"
        />
        <Select
          label="Place of visit"
          :options="placeOptions"
          v-model="placeOfVisit"
          :error="placeOfVisitError"
        />
        <div class="lg:col-span-2 col-span-1">
          <Textinput
            label="Residential Address"
            v-model="residentialAddress"
            :error="residentialAddressError"
            placeholder="Enter our residential address"
          />
        </div>

        <Textinput
          label="Nearest Busstop"
          type="ext"
          v-model="nearestBusStop"
          :error="nearestBusStopError"
          placeholder="Add your nearest bus-stop"
        />

        <Textinput
          label="City"
          v-model="city"
          :error="cityError"
          type="text"
          placeholder="Enter your city"
        />

        <Textinput
          label="State"
          v-model="state"
          :error="stateError"
          type="text"
          placeholder="Enter your state"
        />

        <Textinput
          label="Country"
          v-model="country"
          :error="countryError"
          type="text"
          placeholder="Enter your country"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button type="submit" text="Add member" btnClass="btn-dark" />
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
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import Select from "@/components/Select";

const formData = reactive({
  dateOfVisit: "",
  surname: "",
  firstname: "",
  middlename: "",
  gender: "",
  dateOfBirth: "",
  phoneNumber: "",
  emailAddress: "",
  residentialAddress: "",
  nearestBusStop: "",
  city: "",
  state: "",
  country: "",
  purposeOfVisit: "",
  placeOfVisit: "",
});
const formDataSchema = yup.object().shape({
  dateOfVisit: yup.date().required("Date of Visit is required"),
  surname: yup.string().required("Surname is required"),
  firstname: yup.string().required("Firstname is required"),
  middlename: yup.string().required("Middlename is required"),
  gender: yup.string().required("Gender is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  emailAddress: yup
    .string()
    .email("Invalid email format")
    .required("Email Address is required"),
  residentialAddress: yup.string().required("Residential Address is required"),
  nearestBusStop: yup.string().required("Nearest Bus Stop is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  purposeOfVisit: yup.string().required("Purpose of Visit is required"),
  placeOfVisit: yup.string().required("Place of Visit is required"),
});
const purposeOptions = [
  { value: "become member", label: "Become Member" },
  { value: "just visitation", label: "Just Visitation" },
  { value: "other", label: "Other" },
];
const placeOptions = [
  { value: "church", label: "The Church" },
  { value: "cih", label: "CIH" },
];
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: emailAddress, errorMessage: emailAddressError } =
  useField("emailAddress");
const { value: dateOfVisit, errorMessage: dateOfVisitError } =
  useField("dateOfVisit");
const { value: surname, errorMessage: surnameError } = useField("surname");
const { value: firstname, errorMessage: firstnameError } =
  useField("firstname");
const { value: middlename, errorMessage: middlenameError } =
  useField("middlename");
const { value: gender, errorMessage: genderError } = useField("gender");
const { value: dateOfBirth, errorMessage: dateOfBirthError } =
  useField("dateOfBirth");
const { value: phoneNumber, errorMessage: phoneNumberError } =
  useField("phoneNumber");
const { value: residentialAddress, errorMessage: residentialAddressError } =
  useField("residentialAddress");
const { value: nearestBusStop, errorMessage: nearestBusStopError } =
  useField("nearestBusStop");
const { value: city, errorMessage: cityError } = useField("city");
const { value: state, errorMessage: stateError } = useField("state");
const { value: country, errorMessage: countryError } = useField("country");
const { value: purposeOfVisit, errorMessage: purposeOfVisitError } =
  useField("purposeOfVisit");
const { value: placeOfVisit, errorMessage: placeOfVisitError } =
  useField("placeOfVisit");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>
