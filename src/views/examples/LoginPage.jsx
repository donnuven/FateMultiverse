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

import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as schemas from "../../models/loginSchema";
import * as userService from "../../services/userServices";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getLoginSchema;
    this.state = {
      squares1to6: "",
      squares7and8: ""
    };
    this.state.userData = this.validation.initialValues;
  }

  handleSubmit = (values, obj) => {
    userService
      .userLogin(values, obj)
      .then(this.onUserLoginSuccess)
      .catch(this.onUserLoginError)
      .then(() => {
        obj.setSubmitting(false);
      });
  };

  onUserLoginSuccess = response => {
    window.sessionStorage.setItem("token", response.access_token);
    console.log("token:" + response.access_token);
    console.log("Login success");
    this.props.history.push("/landing-page");
  };

  onUserLoginError = error => {
    console.log(error);
  };

  componentDidMount() {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
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
                          login
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Formik
                          initialValues={this.state.userData}
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
                                      <i className="tim-icons icon-email-85" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Email"
                                    className={
                                      errors.email && touched.email
                                        ? "is-invalid border-right-0"
                                        : "border-right-0"
                                    }
                                    onFocus={e =>
                                      this.setState({ emailFocus: true })
                                    }
                                  />
                                </InputGroup>
                                {errors.email && touched.email && (
                                  <span
                                    className="invalid-feedback"
                                    style={{ display: "block" }}
                                  >
                                    {errors.email}
                                  </span>
                                )}
                                <InputGroup
                                  className={classnames({
                                    "input-group-focus": this.state
                                      .passwordFocus
                                  })}
                                >
                                  <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                      <i className="tim-icons icon-lock-circle" />
                                    </InputGroupText>
                                  </InputGroupAddon>
                                  <Input
                                    id="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className={
                                      errors.password && touched.password
                                        ? "is-invalid border-right-0"
                                        : "border-right-0"
                                    }
                                    onFocus={e =>
                                      this.setState({ passwordFocus: true })
                                    }
                                    onBlur={handleBlur}
                                  />
                                  {errors.password && touched.password && (
                                    <span
                                      className="invalid-feedback"
                                      style={{ display: "block" }}
                                    >
                                      {errors.password}
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
                                    Login
                                  </Button>
                                  <Button
                                    className="btn-round"
                                    color="primary"
                                    size="md"
                                    onClick={() =>
                                      this.props.history.push("/register")
                                    }
                                  >
                                    Sign Up
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
        </div>
      </>
    );
  }
}

export default withRouter(LoginPage);
