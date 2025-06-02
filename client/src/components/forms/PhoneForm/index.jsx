import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { useEffect } from "react";
import Input from "../Input";
import { getCpusThunk } from "../../../store/slices/cpusSlice";
import { createPhoneThunk } from "../../../store/slices/phonesSlice";
import styles from "./PhoneForm.module.sass";

function PhonesForm({ createPhone, getCpus, cpusData }) {
  useEffect(() => {
    getCpus();
  }, [getCpus]);

  const initialValues = {
    model: "",
    brand: "",
    year: "",
    ram: "",
    cpu_id: "",
    screen_size: "",
    has_nfc: true,
    phonePhoto: null,
  };

  const handleSubmit = (values, formikBag) => {
    const formData = new FormData();
    formData.append("model", values.model);
    formData.append("brand", values.brand);
    formData.append("year", values.year);
    formData.append("ram", values.ram);
    formData.append("cpu_id", values.cpu_id);
    formData.append("screen_size", values.screen_size);
    formData.append("has_nfc", values.has_nfc);

    formData.append("phonePhoto", values.phonePhoto);

    createPhone(formData);
    formikBag.resetForm();
  };

  const classes = {
    error: styles.error,
    input: styles.input,
    valid: styles.valid,
    invalid: styles.invalid,
    select: styles.select,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => (
        <Form className={styles.form}>
          <Input label="Model" type="text" name="model" classes={classes} />
          <Input label="Brand" type="text" name="brand" classes={classes} />
          <Input label="Year" type="number" name="year" classes={classes} />
          <Input label="RAM (GB)" type="number" name="ram" classes={classes} />
          <Input
            label="Screen size (inches)"
            type="number"
            name="screen_size"
            step="0.1"
            classes={classes}
          />

          <label>
            <span>CPU</span>
            <Field as="select" name="cpu_id" className={classes.select}>
              {cpusData.length === 0 ? (
                <option disabled>Loading...</option>
              ) : (
                <>
                  <option value="">Select CPU</option>
                  {cpusData.map((cpu) => (
                    <option key={cpu.id} value={cpu.id}>
                      {cpu.name} ({cpu.manifacturer})
                    </option>
                  ))}
                </>
              )}
            </Field>
          </label>
          {/* <div className={styles.row}>
            <label className={styles.field}>NFC</label>
            <div className={styles.inlineOptions}>
              <label>
                <input
                  type="radio"
                  name="has_nfc"
                  checked={formikProps.values.has_nfc === true}
                  onChange={() => formikProps.setFieldValue("has_nfc", true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="has_nfc"
                  checked={formikProps.values.has_nfc === false}
                  onChange={() => formikProps.setFieldValue("has_nfc", false)}
                />
                No
              </label>
            </div>
          </div> */}

          <div className={styles.row}>
            <label className={styles.field}>NFC</label>
            <label className={styles.toggleWrapper}>
              <input
                type="checkbox"
                name="has_nfc"
                checked={formikProps.values.has_nfc}
                onChange={() =>
                  formikProps.setFieldValue(
                    "has_nfc",
                    !formikProps.values.has_nfc
                  )
                }
                className={styles.toggleInput}
              />
              <span className={styles.toggleSlider}></span>
            </label>
          </div>
          <label>
            <span>Photo</span>
            <input
              type="file"
              name="phonePhoto"
              onChange={(e) => {
                formikProps.setFieldValue("phonePhoto", e.target.files[0]);
              }}
            />
          </label>
          <button type="submit">Save</button>
        </Form>
      )}
    </Formik>
  );
}
const mapStateToProps = (state) => ({
  cpusData: state.cpusData.cpus || [],
});
const mapDispatchToProps = (dispatch) => ({
  getCpus: () => dispatch(getCpusThunk()),
  createPhone: (data) => dispatch(createPhoneThunk(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PhonesForm);
