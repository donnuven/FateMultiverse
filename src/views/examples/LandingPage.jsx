import React from "react";
// react plugin used to create charts

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import { withRouter } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import * as fateservantService from "../../services/fateservantService";
import swal from "@sweetalert/with-react";

// import CardDeck from "react-bootstrap/CardDeck";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fateservants: []
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleClick = (e, data) => {
    this.props.history.push("/EditFateServants/" + data.id + "/Edit", {
      state: data.id
    });
  };

  onGetAllServantsSuccess = response => {
    this.setState({ fateservants: response.data.items });
    console.log(response);
  };

  onGetAllServantsError = error => {
    console.log(error);
  };

  triggerModal = (e, data) => {
    const imgStyle = {
      width: "150px",
      height: "150px"
    };
    swal({
      content: (
        <div>
          <img
            className="card-img-top mx-auto rounded-circle img-fluid"
            style={imgStyle}
            src={data.imageUrl}
            alt="Not Found"
          />
          <div className="card-body">
            <h4 className="card-title">{data.class}</h4>
            <p>
              <span className="text-sm text-muted float-left">
                <i className="fa fa-user" />
                True Name: {data.trueName}
              </span>
              <span className="text-sm text-muted float-">
                <i className="fa fa-users" />
                Class: {data.class}
              </span>
              <span className="text-sm text-muted float left">
                <i className="fa fa-key" />
                Noble Phantasm: {data.noblePhantasm}
              </span>
            </p>
          </div>
        </div>
      )
    });
  };

  componentDidMount() {
    fateservantService
      .getAllFateServants()
      .then(this.onGetAllServantsSuccess)
      .catch(this.onGetAllServantsError);
  }

  render() {
    const imgStyle = {
      width: "150px",
      height: "150px"
    };
    const imgHeadStyle = {
      width: "250px",
      height: "250px"
    };
    return (
      <div>
        <ExamplesNavbar />

        <div className="wrapper">
          <section className="section section-lg section-coins">
            <img
              alt="..."
              className="path"
              src={require("assets/img/path3.png")}
            />
            <Container>
              <Row>
                <Col md="6">
                  <img
                    style={imgHeadStyle}
                    alt="..."
                    src="https://vignette.wikia.nocookie.net/typemoon/images/a/a1/ZeroAssassin.png/revision/latest?cb=20130620092318"
                  />
                  <hr className="line-info" />
                  <h1>
                    Choose the fate servant{" "}
                    <span className="text-info">
                      for the next holy grail war
                    </span>
                  </h1>
                </Col>
              </Row>
              <div className="card-columns">
                {this.state.fateservants.map(data => (
                  <Card className=" card-coin card-plain" key={data.id}>
                    <CardBody>
                      <img
                        alt="..."
                        className="img-center  rounded-circle  img-fluid"
                        style={imgStyle}
                        src={data.imageUrl}
                      />
                      <Row>
                        <Col className="text-center" md="12">
                          <h4 className="text-uppercase">{data.class}</h4>
                          <span>Fate Servant</span>
                          <hr className="line-primary" />
                        </Col>
                      </Row>
                      <Row>
                        <ListGroup>
                          <ListGroupItem>{data.trueName}</ListGroupItem>
                          <ListGroupItem>{data.noblePhantasm}</ListGroupItem>
                        </ListGroup>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-simple btn-round"
                        color="primary"
                        onClick={e => this.triggerModal(e, data)}
                      >
                        View
                      </Button>
                      <Button
                        className="btn-simple btn-round"
                        color="primary"
                        onClick={e => this.handleClick(e, data)}
                      >
                        Edit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Container>
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
