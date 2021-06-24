const reqErr = "Required"

const validate = (e) => {
    const errors = {};

    if (!e.name) {
      errors.name = reqErr;
    }
    if (!e.preparation_time) {
      errors.preparation_time = reqErr;
    }

    if (
      e.preparation_time &&
      !e.preparation_time.match(/[0-0][0-2]:[0-5][0-9]:[0-5][0-9]/g)
    ) {
      errors.preparation_time = "Incorrect input - max duration 02:59:59";
    }

    if (!e.type) {
      errors.type = reqErr;
    }
    if (e.type === "pizza") {
      if (!e.no_of_slices) {
        errors.no_of_slices = reqErr;
      }
      if (!e.diameter) {
        errors.diameter = reqErr;
      }
    }
    if (e.diameter && !e.diameter.match(/[0-7][0-9].[0-9]|[0-8][0-0].[0-0]/g)) {
      errors.diameter = "Please input value in format 00.0!";
    }

    if (e.type === "soup") {
      if (!e.spiciness_scale) {
        errors.spiciness_scale = reqErr;
      }
    }

    if (e.type === "soup") {
      if (!e.slices_of_bread) {
        errors.slices_of_bread = reqErr;
      }
    }

    return errors;
  };

  export default validate;