import React from "react";
import { Form, Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "./MyForm.module.scss";

const MyForm = () => {
  return (
    <div className={styles.wrapper}>
      <Form onSubmit={() => {}}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TextField id="name" label="Dish name" type="text" fullWidth />
            <TextField
              id="preparation_time"
              label="Preparation time"
              type="time"
              fullWidth
            />
            <TextField
              id="type"
              select
              label="Select dish type"
              type="time"
              // onChange={}
              fullWidth
            >
              <MenuItem value="pizza">Pizza</MenuItem>
              <MenuItem value="soup">Soup</MenuItem>
              <MenuItem value="sandwich">Sandwich</MenuItem>
            </TextField>

            <TextField
              id="no_of_slices"
              label="Number of slices"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 16, step: 1 } }}             
              fullWidth
            />
            <TextField
              id="diameter"
              label="Diameter"
              type="number"
              InputProps={{ inputProps: { min: 0, step: 0.1 } }}    
              fullWidth
            />
            <TextField
              id="spiciness_scale"
              label="Spiciness"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 10 } }}       
              fullWidth
            />
            <TextField
              id="slices_of_bread"
              label="Number of slices of bread"
              type="number"
              min="1"
              max="8"
              fullWidth
            />
          </form>
        )}
      </Form>
    </div>
  );
};

export default MyForm;
