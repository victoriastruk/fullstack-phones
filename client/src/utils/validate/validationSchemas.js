import * as yup from "yup";

const currentYear = new Date().getFullYear();

export const PHONE_VALIDATION_SCHEMA = yup.object({
  model: yup.string().required("Model is required").trim(),

  brand: yup.string().required("Brand is required").trim(),

  year: yup
    .number()
    .required("Year is required")
    .min(2000, "Year must be from 2000 onwards")
    .max(currentYear, `Year cannot be greater than ${currentYear}`),

  ram: yup
    .number()
    .required("RAM is required")
    .min(1, "RAM must be at least 1 GB"),

  cpu_id: yup
    .number()
    .required("CPU is required")
    .integer("CPU ID must be an integer"),

  screen_size: yup
    .number()
    .required("Screen size is required")
    .min(3.0, "Screen size must be at least 3.0 inches"),

  has_nfc: yup.boolean().required("NFC field is required"),

  image: yup.string().nullable(),
});
