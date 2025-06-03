import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { useEffect } from "react";
import Input from "../Input";
import { getCpusThunk } from "../../../store/slices/cpusSlice";
import { createPhoneThunk } from "../../../store/slices/phonesSlice";
import styles from "./PhoneForm.module.sass";

function PhonesForm({ cpus, createPhone, getCpus }) {
  useEffect(() => {
    getCpus();
  }, []);

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
    const { phonePhoto, ...rest } = values;

    const formData = new FormData();

    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (phonePhoto) {
      formData.append("phonePhoto", phonePhoto);
    }

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
    <div className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formikProps) => (
          <Form className={styles.form}>
            <Input label="Model" type="text" name="model" classes={classes} />
            <Input label="Brand" type="text" name="brand" classes={classes} />

            <Field as="select" name="cpu_id" className={classes.select}>
              {cpus.length === 0 ? (
                <option disabled>Loading...</option>
              ) : (
                <>
                  <option value="">Select CPU</option>
                  {cpus.map((cpu) => (
                    <option key={cpu.id} value={cpu.id}>
                      {cpu.name} ({cpu.manifacturer})
                    </option>
                  ))}
                </>
              )}
            </Field>

            <Input label="Year" type="number" name="year" classes={classes} />

            <Input
              label="RAM (GB)"
              type="number"
              name="ram"
              classes={classes}
            />
            <Input
              label="Screen size (inches)"
              type="number"
              name="screen_size"
              step="0.1"
              classes={classes}
            />

            <label className={styles.toggleWrapper}>
              NFC
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

            <div className={styles.fileInputWrapper}>
              <label className={styles.fileLabel}>
                Choose a photo
                <input
                  type="file"
                  name="phonePhoto"
                  onChange={(e) => {
                    formikProps.setFieldValue("phonePhoto", e.target.files[0]);
                  }}
                  className={styles.fileInput}
                />
              </label>
              {formikProps.values.phonePhoto && (
                <span className={styles.fileName}>
                  {formikProps.values.phonePhoto.name}
                </span>
              )}
            </div>

            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
const mapStateToProps = ({ cpusData }) => cpusData;

const mapDispatchToProps = (dispatch) => ({
  getCpus: () => dispatch(getCpusThunk()),
  createPhone: (data) => dispatch(createPhoneThunk(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PhonesForm);
