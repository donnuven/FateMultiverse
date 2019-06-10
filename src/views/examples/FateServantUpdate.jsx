import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";

import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as schemas from "../../models/fateServantSchema";
import * as fateservantService from "../../services/fateservantService";
import swal from "@sweetalert/with-react";

class FateServantUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getFateServantSchema;
    this.state = {
      id: this.props.location.state
    };
    this.state.fateServantData = this.validation.initialValues;
  }

  handleSubmit = (values, obj) => {
    let route = this.state.id;
    fateservantService
      .updateFateServant(route.state, values)
      .then(this.onFateServantUpdateSuccess)
      .catch(this.onFateServantUpdateError)
      .then(() => {
        obj.setSubmitting(false);
      });
  };

  handleDelete = values => {
    let route = this.state.id;
    fateservantService
      .deleteFateServant(route.state, values)
      .then(this.onDeleteFateServantSuccess)
      .catch(this.onDeleteFateServantError);
  };

  onDeleteFateServantError = error => {
    console.log(error);
  };

  onDeleteFateServantSuccess = () => {
    swal("DELETED SUCCESSFULLY!", {
      icon: "success"
    });
    this.props.history.push("/landing-page");
  };

  onFateServantUpdateSuccess = () => {
    swal("UPDATED SUCCESSFULLY!", {
      icon: "success"
    });
    this.props.history.push("/landing-page");
  };

  onFateServantUpdateError = error => {
    console.log(error);
  };

  componentDidMount() {
    let route = this.state.id;
    fateservantService
      .getSpecificFateServant(route.state)
      .then(this.onGetSpecificFateServantSuccess)
      .catch(this.onGetSpecificFateServantError);
    console.log(route.state);
  }

  onGetSpecificFateServantSuccess = response => {
    console.log(response);
    let info = response.data.item;
    this.setState({
      fateServantData: {
        id: info.id,
        trueName: info.trueName,
        class: info.class,
        noblePhantasm: info.noblePhantasm,
        imageUrl: info.imageUrl
      }
    });
  };

  onGetSpecificFateServantError = error => {
    console.log(error);
  };

  render() {
    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h5" className="text-justify-center">
                          Edit
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Formik
                          enableReinitialize={true}
                          initialValues={this.state.fateServantData}
                          onSubmit={this.handleSubmit}
                          validationSchema={this.validation()}
                        >
                          {props => {
                            const {
                              values,
                              touched,
                              errors,
                              isSubmitting,
                              handleChange,
                              handleBlur,
                              handleSubmit
                            } = props;
                            return (
                              <Form className="form" onSubmit={handleSubmit}>
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": this.state
                                      .trueNameFocus
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="fa fa-user" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    id="trueName"
                                    type="text"
                                    value={values.trueName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Hey, what is my true name?"
                                    className={
                                      errors.trueName && touched.trueName
                                        ? "is-invalid border-right-0"
                                        : "border-right-0"
                                    }
                                    onFocus={e =>
                                      this.setState({ trueNameFocus: true })
                                    }
                                  />
                                </InputGroup>
                                {errors.trueName && touched.trueName && (
                                  <span
                                    className="invalid-feedback"
                                    style={{ display: "block" }}
                                  >
                                    {errors.trueName}
                                  </span>
                                )}
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": this.state.class
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="fa fa-users" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    id="class"
                                    type="text"
                                    value={values.class}
                                    onChange={handleChange}
                                    placeholder="What is my class?"
                                    className={
                                      errors.class && touched.class
                                        ? "is-invalid border-right-0"
                                        : "border-right-0"
                                    }
                                    onFocus={e =>
                                      this.setState({ class: true })
                                    }
                                    onBlur={handleBlur}
                                  />
                                  {errors.class && touched.class && (
                                    <span
                                      className="invalid-feedback"
                                      style={{ display: "block" }}
                                    >
                                      {errors.class}
                                    </span>
                                  )}
                                </InputGroup>

                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": this.state
                                      .noblePhantasm
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="fa fa-key" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    id="noblePhantasm"
                                    type="text"
                                    value={values.noblePhantasm}
                                    onChange={handleChange}
                                    placeholder="Is this my noble phantasm?"
                                    className={
                                      errors.noblePhantasm &&
                                      touched.noblePhantasm
                                        ? "is-invalid border-right-0"
                                        : "border-right-0"
                                    }
                                    onFocus={e =>
                                      this.setState({
                                        noblePhantasm: true
                                      })
                                    }
                                    onBlur={handleBlur}
                                  />
                                  {errors.noblePhantasm &&
                                    touched.noblePhantasm && (
                                      <span
                                        className="invalid-feedback"
                                        style={{ display: "block" }}
                                      >
                                        {errors.noblePhantasm}
                                      </span>
                                    )}
                                </InputGroup>
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": this.state
                                      .noblePhantasm
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="fa fa-camera" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    id="imageUrl"
                                    type="text"
                                    value={values.imageUrl}
                                    onChange={handleChange}
                                    placeholder="Where is my picture?"
                                    className={
                                      errors.imageUrl && touched.imageUrl
                                        ? "is-invalid border-right-0"
                                        : "border-right-0"
                                    }
                                    onFocus={e =>
                                      this.setState({
                                        imageUrl: true
                                      })
                                    }
                                    onBlur={handleBlur}
                                  />
                                  {errors.imageUrl && touched.imageUrl && (
                                    <span
                                      className="invalid-feedback"
                                      style={{ display: "block" }}
                                    >
                                      {errors.imageUrl}
                                    </span>
                                  )}
                                </InputGroup>
                                <CardFooter>
                                  <Button
                                    className="btn-round"
                                    color="info"
                                    size="md"
                                    type="submit"
                                    disabled={isSubmitting}
                                  >
                                    Update
                                  </Button>
                                  <Button
                                    className="btn-round"
                                    color="danger"
                                    size="md"
                                    type="button"
                                    onClick={this.handleDelete}
                                  >
                                    Delete
                                  </Button>
                                </CardFooter>
                              </Form>
                            );
                          }}
                        </Formik>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(FateServantUpdate);
