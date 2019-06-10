import * as Yup from "yup";

const getRegistrationSchema = () =>
  Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Retype password.")
  });

getRegistrationSchema.initialValues = {
  email: "",
  password: "",
  confirmPassword: ""
};

export { getRegistrationSchema };
