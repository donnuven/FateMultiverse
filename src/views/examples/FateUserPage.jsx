import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import { Card, CardBody, Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
// import Footer from "components/Footer/Footer.jsx";
import * as fatestoriesService from "../../services/fatestoriesService";
import * as fateuserService from "../../services/fateuserService";

const carouselItems = [
  {
    src: require("assets/img/denys.jpg"),
    altText: "Slide 1",
    caption: "Big City Life, United States"
  },
  {
    src: require("assets/img/fabien-bazanegue.jpg"),
    altText: "Slide 2",
    caption: "Somewhere Beyond, United States"
  },
  {
    src: require("assets/img/mark-finn.jpg"),
    altText: "Slide 3",
    caption: "Stocks, United States"
  }
];

let ps = null;

class FateUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fatestories: [],
      fateuser: []
    };
  }
  onGetAllFateStoriesSuccess = response => {
    this.setState({ fatestories: response.data.items });
    console.log(response);
  };

  onGetAllFateStoriesFail = error => {
    console.log(error);
  };

  onGetFateUserSuccess = response => {
    this.setState({ fateuser: response.data.items });
    console.log(response);
  };

  onGetFateUserFail = error => {
    console.log(error);
  };

  componentDidMount() {
    fatestoriesService
      .getAllFateStories()
      .then(this.onGetAllFateStoriesSuccess)
      .catch(this.onGetAllFateStoriesFail);

    fateuserService
      .getFateUser()
      .then(this.onGetFateUserSuccess)
      .catch(this.onGetFateUserFail);
    document.body.classList.toggle("profile-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("profile-page");
  }

  render() {
    const imgStyle = {
      width: "150px",
      height: "150px"
    };
    return (
      <>
        <ExamplesNavbar />
        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
            <Container className="align-items-center">
              <Row>
                <Col lg="6" md="6">
                  {this.state.fatestories.map(data => (
                    <div key={data.id}>
                      <h1 className="profile-title text-left" />
                      <h5 className="text-on-back">mage</h5>
                      <p className="profile-description">{data.description}</p>
                    </div>
                  ))}
                </Col>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                  {this.state.fateuser.map(data => (
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
                            <h4 className="text-uppercase">
                              {data.personName}
                            </h4>
                            <hr className="line-primary" />
                            <span>Fate User</span>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  ))}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default FateUserPage;
