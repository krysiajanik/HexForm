function composeValidators() {
  return (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );
}

export default composeValidators;
