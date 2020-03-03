import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;

    callback();
  };

  return {
    handleChange,
    handleSubmit,
    values
  };
};
