import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { MenuItem, Button } from "@material-ui/core";
import styles from "./MyForm.module.scss";

const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Number can't be less than ${min}`;

const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

const MyForm = () => {
  const onSubmit = async (values) => {
    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // await sleep(300);
    console.log(JSON.stringify(values, 0, 2));
  };

  const validate = (e) => {
    const errors = {};

    if (!e.name) {
      errors.name = "Required!";
    }
    if (!e.preparation_time) {
      errors.preparation_time = "Required!";
    }
    if (!e.type) {
      errors.type = "Required!";
    }

    return errors;
  };

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={onSubmit} validate={validate}>
        {({ handleSubmit, values, ...props }) => (
          <form onSubmit={handleSubmit} className={styles.dishForm}>
            <Field
              fullWidth
              required
              name="name"
              component={TextField}
              type="text"
              label="Dish name"
            />
            <Field
              fullWidth
              required
              name="preparation_time"
              component={TextField}
              type="time"
              label="Preparation time"
            />

            <Field
              name="type"
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
            <Condition when="type" is="pizza">
              <Field
                name="no_of_slices"
                label="Number of slices"
                component={TextField}
                type="number"
                validate={composeValidators(minValue(0))}
                fullWidth
                required
              />
              <Field
                name="diameter"
                label="Diameter"
                component={TextField}
                type="number"
                validate={composeValidators(minValue(0))}
                // step: 0.1
                fullWidth
                required
              />
            </Condition>
            <Condition when="type" is="soup">
              <Field
                name="spiciness_scale"
                label="Spiciness"
                component={TextField}
                type="number"
                validate={composeValidators(minValue(0))}
                fullWidth
                required
              />
            </Condition>
            <Condition when="type" is="sandwich">
              <Field
                name="slices_of_bread"
                label="Number of slices of bread"
                component={TextField}
                type="number"
                validate={composeValidators(minValue(0))}
                fullWidth
                required
              />
            </Condition>
            <span className={styles.buttonWrapper}>
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
