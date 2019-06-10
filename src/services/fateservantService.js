import axios from "axios";

let fateServantCreate = payload => {
  const config = {
    method: "POST",
    url: "http://localhost:3000/api/fateservants",
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

let retrieve_fateServant = () => {
  const config = {
    method: "GET",
    url: "http://localhost:3000/api/scraper",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

let getAllFateServants = () => {
  const config = {
    method: "GET",
    url: "http://localhost:3000/api/fateservants",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

let getSpecificFateServant = id => {
  const config = {
    method: "GET",
    url: "http://localhost:3000/api/fateservants/" + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

let updateFateServant = (id, payload) => {
  const config = {
    method: "PUT",
    url: "http://localhost:3000/api/fateservants/" + id,
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

let deleteFateServant = id => {
  const config = {
    method: "DELETE",
    url: "http://localhost:3000/api/fateservants/" + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

export {
  retrieve_fateServant,
  getAllFateServants,
  getSpecificFateServant,
  fateServantCreate,
  updateFateServant,
  deleteFateServant
};
