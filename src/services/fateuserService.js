import axios from "axios";

let getFateUserByAbilities = () => {
  const config = {
    method: "GET",
    url: "http://localhost:3000/api/fateuser/abilities",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

let getFateUser = () => {
  const config = {
    method: "GET",
    url: "http://localhost:3000/api/fateuser",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

export { getFateUserByAbilities, getFateUser };
