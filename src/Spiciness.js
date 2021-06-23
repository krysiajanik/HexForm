import React from "react";
import { Field } from "react-final-form";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@material-ui/core";

export default function Spiciness() {
  return (
    <FormControl component="fieldset">
      <FormLabel lomponent="legend">Spiciness</FormLabel>
      <RadioGroup row label="spiciness_scale">
        {/* <label>
          1
          <Field
            name="spiciness_scale2"
            component={Radio}
            type="radio"
            color="primary"
            value="1"
          />
        </label> */}
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="1"
          labelPlacement="bottom"
        />

        <FormControlLabel
          value="2"
          control={<Radio color="primary" />}
          label="2"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="3"
          control={<Radio color="primary" />}
          label="3"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="4"
          control={<Radio color="primary" />}
          label="4"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="5"
          control={<Radio color="primary" />}
          label="5"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="6"
          control={<Radio color="primary" />}
          label="6"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="7"
          control={<Radio color="primary" />}
          label="7"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="8"
          control={<Radio color="primary" />}
          label="8"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="9"
          control={<Radio color="primary" />}
          label="9"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="10"
          control={<Radio color="primary" />}
          label="10"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  );
}
