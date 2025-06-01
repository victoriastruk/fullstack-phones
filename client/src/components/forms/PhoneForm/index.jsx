import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../Input";
import styles from "./PhoneForm.module.sass";
import { useEffect, useState } from "react";
function PhonesForm() {
  const [cpus, setCpus] = useState([]);
  const initialValues = {
    model: "",
    brand: "",
    year: "",
    ram: "",
    cpu_id: "",
    screen_size: "",
    has_nfc: false,
    phonePhoto: null,
  };

  const classes = {
    error: styles.error,
    input: styles.input,
    valid: styles.valid,
    invalid: styles.invalid,
    select: styles.select,
  };

  return (
    <Formik>
      <Form className={styles.form}>
        <div className={styles.row}>
          <Input label="Model" type="text" name="model" classes={classes} />
          <Input label="Brand" type="text" name="brand" classes={classes} />
        </div>

        <div className={styles.row}>
          <Input label="Year" type="number" name="year" classes={classes} />
          <Input label="RAM (GB)" type="number" name="ram" classes={classes} />
        </div>

        <div className={styles.row}>
          <Input
            label="Screen size (inches)"
            type="number"
            name="screen_size"
            step="0.1"
            classes={classes}
          />
          <label className={styles.field}>
            <span>CPU</span>
            <Field as="select" name="cpu_id" className={classes.select}>
              <option value="">Select CPU</option>
              {cpus.map((cpu) => (
                <option key={cpu.id} value={cpu.id}>
                  {cpu.name} ({cpu.manifacturer})
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="cpu_id"
              component="div"
              className={classes.error}
            />
          </label>
        </div>

        <div className={styles.row}>
          <label className={styles.field}>
            <Field type="checkbox" name="has_nfc" />
            NFC
          </label>
          <label className={styles.field}>
            <span>Photo</span>
            <input type="file" name="phonePhoto" />
          </label>
        </div>

        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
}

export default PhonesForm;
