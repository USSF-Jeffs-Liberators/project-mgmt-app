import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (
  username,
  email_address,
  pass_word,
  first_name,
  last_name,
  role
) => {
  return axios.post(API_URL + "signup", {
    username,
    email_address,
    pass_word,
    first_name,
    last_name,
    role,
  });
};

const login = (username, pass_word) => {
  return axios
    .post(API_URL + "signin", {
      username,
      pass_word,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
