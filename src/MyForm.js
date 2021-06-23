import React from "react";
import { Form, Field } from "react-final-form";
import { TextField, Select} from "final-form-material-ui";
import { MenuItem, Button } from "@material-ui/core";
import validate from "./Validate";
import styles from "./MyForm.module.scss";

const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Number can't be less than ${min}`;

const maxValue = (max) => (value) =>
  isNaN(value) || value <= max ? undefined : `Number can't be more than ${max}`;

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

const normalizeDuration = (value) => {
  if (!value) return value;
  const onlyNums = value.replace(/[^\d]/g, "");
  return `${onlyNums.slice(0, 2)}:${onlyNums.slice(2, 4)}:${onlyNums.slice(
    4,
    6
  )}`;
};

const MyForm = () => {
  const onSubmit = async (values) => {
    console.log(values);

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
    var postHeaders = new Headers();
    postHeaders.append("Content-Type", "application/json");

    console.log(newDish);
    const postDishes = {
      method: "POST",
      headers: postHeaders,
      body: newDish,
      redirect: "follow",
    };

    //   fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", postDishes)
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.log("error", error));
  };

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={onSubmit} validate={validate}>
        {({ handleSubmit, values, form, submitting, ...props }) => (
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
              type="text"
              label="Preparation time"
              placeholder="00:00:00"
              parse={normalizeDuration}
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
                validate={composeValidators(minValue(1) && maxValue(12))}
                parse={(value) => value && parseInt(value)}
                fullWidth
                required
              />
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
            </Condition>
            <Condition when="type" is="soup" type="number">
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
            </Condition>
            <Condition when="type" is="sandwich">
              <Field
                name="slices_of_bread"
                label="Number of slices of bread"
                component={TextField}
                type="number"
                validate={composeValidators(minValue(0) && maxValue(8))}
                fullWidth
                required
              />
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
