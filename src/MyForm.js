import React from "react";
import { Form, Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";
import { MenuItem, Button } from "@material-ui/core";
import validate from "./Validate";
import Condition from "./Condition";
import composeValidators from "./ValidatorsFn";
import normalizeDuration from "./Duration";
import Logo from "./Logo.js";
import styles from "./MyForm.module.scss";

const MyForm = () => {
  const onSubmit = async (values) => {
    const createDishObj = {
      name: values.name,
      preparation_time: values.preparation_time,
      type: values.type,
      no_of_slices: parseInt(values.no_of_slices),
      diameter: parseFloat(values.diameter),
      spiciness_scale: values.spiciness_scale,
      slices_of_bread: parseInt(values.slices_of_bread),
    };

    const newDish = JSON.stringify(createDishObj, 0, 2);
    const postHeaders = new Headers();
    postHeaders.append("Content-Type", "application/json");

    const postDishes = {
      method: "POST",
      headers: postHeaders,
      body: newDish,
      redirect: "follow",
    };

    fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", postDishes)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => window.alert("Dish submitted"))
      .catch((error) => window.alert("error", error));
  };

  const minValue = (min) => (value) =>
    isNaN(value) || value >= min
      ? undefined
      : `Number can't be less than ${min}`;

  const maxValue = (max) => (value) =>
    isNaN(value) || value <= max
      ? undefined
      : `Number can't be more than ${max}`;

  return (
    <div className={styles.wrapper}>
      <Logo />
      <h1 className={styles.formHeader}>Add a new dish</h1>
      <Form onSubmit={onSubmit} validate={validate}>
        {({ handleSubmit, values, form, submitting, ...props }) => (
          <form onSubmit={handleSubmit} className={styles.dishForm}>
            <div className={styles.fieldWrapper}>
              <Field
                fullWidth
                required
                name="name"
                component={TextField}
                type="text"
                label="Dish name"
              />
              <label for="name" className={styles.fieldHelperTxt}>
                Name your dish
              </label>
            </div>
            <div className={styles.fieldWrapper}>
              <Field
                fullWidth
                required
                name="preparation_time"
                component={TextField}
                type="text"
                label="Preparation time"
                placeholder="00:00:00"
                parse={normalizeDuration}
              />
              <label for="name" className={styles.fieldHelperTxt}>
                Preparation time can be maximum 02:59:59
              </label>
            </div>
            <div className={styles.fieldWrapper}>
              <Field
                name="type"
                id="type"
                select
                label="Select dish type"
                component={TextField}
                type="time"
                fullWidth
                required
              >
                <MenuItem value="pizza">Pizza</MenuItem>
                <MenuItem value="soup">Soup</MenuItem>
                <MenuItem value="sandwich">Sandwich</MenuItem>
              </Field>
              <label for="name" className={styles.fieldHelperTxt}>
                Select dish type
              </label>
            </div>
            <Condition when="type" is="pizza">
              <div className={styles.fieldWrapper}>
                <Field
                  name="no_of_slices"
                  label="Number of slices"
                  component={TextField}
                  type="number"
                  validate={composeValidators(minValue(1) && maxValue(12))}
                  fullWidth
                  required
                />
                <label for="name" className={styles.fieldHelperTxt}>
                  Maximum 12 slices
                </label>
              </div>
              <div className={styles.fieldWrapper}>
                <Field
                  name="diameter"
                  label="Diameter"
                  component={TextField}
                  type="number"
                  validate={composeValidators(minValue(10) && maxValue(80))}
                  placeholder="00.0"
                  fullWidth
                  required
                />
                <label for="name" className={styles.fieldHelperTxt}>
                  Diameter should be between 10cm and 80cm
                </label>
              </div>
            </Condition>
            <Condition when="type" is="soup" type="number">
              <div className={styles.fieldWrapper}>
                <Field
                  name="spiciness_scale"
                  component={Select}
                  formControlProps={{ fullWidth: true }}
                  label="Spiciness scale"
                  fullWidth
                  required
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                </Field>
                <label for="name" className={styles.fieldHelperTxt}>
                  How spicy will the soup be?
                </label>
              </div>
            </Condition>
            <Condition when="type" is="sandwich">
              <div className={styles.fieldWrapper}>
                <Field
                  name="slices_of_bread"
                  label="Number of slices of bread"
                  component={TextField}
                  type="number"
                  validate={composeValidators(minValue(0) && maxValue(8))}
                  fullWidth
                  required
                />
                <label for="name" className={styles.fieldHelperTxt}>
                  Maximum 8 slices of bread
                </label>
              </div>
            </Condition>
            <span className={styles.buttonWrapper}>
              <Button
                variant="outlined"
                size="medium"
                type="button"
                onClick={form.restart}
                disabled={submitting}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                size="medium"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </span>
          </form>
        )}
      </Form>
    </div>
  );
};

export default MyForm;
