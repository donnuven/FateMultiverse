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

class FateServantCreation extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getFateServantSchema;
    this.state = {
      squares1to6: "",
      squares7and8: ""
    };
    this.state.fateServantData = this.validation.initialValues;
  }

  handleSubmit = (values, obj) => {
    fateservantService
      .fateServantCreate(values, obj)
      .then(this.onFateServantCreateSuccess)
      .catch(this.onFateServantCreateError)
      .then(() => {
        obj.setSubmitting(false);
      });
  };

  onFateServantCreateSuccess = response => {
    console.log(response);
    console.log("Fate Servant has been created");
    this.props.history.push("/landing-page");
  };

  onFateServantCreateError = error => {
    console.log(error);
  };

  componentDidMount() {
    //document.body.classList.toggle("fate-create-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
    // document.body.classList.toggle("fate-create-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );
  }
  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
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
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h5" className="text-justify-center">
                          Create
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Formik
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
                                    "input-group-focus": this.state.emailFocus
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
                                    Submit
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
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </>
    );
  }
}

export default withRouter(FateServantCreation);
