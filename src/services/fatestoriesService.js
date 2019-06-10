import axios from "axios";

let getAllFateStories = () => {
  const config = {
    method: "GET",
    url: "http://localhost:3000/api/fatestories",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

export { getAllFateStories };
