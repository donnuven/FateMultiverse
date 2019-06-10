import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer" + window.sessionStorage.getItem("token") || "";

const toUrlEncoded = obj =>
  Object.keys(obj)
    .map(data => encodeURIComponent(data) + "=" + encodeURIComponent(obj[data]))
    .join("&");

export function userLogin(loginReq) {
  loginReq.grant_type = "password";
  loginReq.userName = loginReq.email;

  const required = toUrlEncoded(loginReq);
  return axios
    .post("/Token", required, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
    .then(response => {
      return response.data;
    });
}

let user_registrating = payload => {
  const config = {
    method: "POST",
    url: "http://localhost:3000/api/Account/Register",
    data: payload,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(response => response)
    .catch(error => error);
};

export function getUserInfo() {
  return axios
    .get("/api/Account/UserInfo")
    .then(response => response.data)
    .catch(error => error);
}

export { user_registrating };
