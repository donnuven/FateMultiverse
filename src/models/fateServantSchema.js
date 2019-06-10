import * as Yup from "yup";

const getFateServantSchema = () =>
  Yup.object().shape({
    imageUrl: Yup.string().required("Image url is required"),
    class: Yup.string().required("Class is required"),
    trueName: Yup.string().required("True name is required"),
    noblePhantasm: Yup.string().required("Noble phantasm is required")
  });

getFateServantSchema.initialValues = {
  imageUrl: "",
  class: "",
  trueName: "",
  noblePhantasm: ""
};

export { getFateServantSchema };
