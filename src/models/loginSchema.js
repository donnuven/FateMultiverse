import * as Yup from "yup";

const getLoginSchema = () =>
  Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required")
  });

getLoginSchema.initialValues = {
  email: "",
  password: ""
};

export { getLoginSchema };
