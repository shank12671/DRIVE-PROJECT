import axios from "axios";

// const path = process.env.VUE_APP_SERVER_PATH;
const path = "http://localhost:5000/";

export function login(email, password) {
  return axios.post(path+ "users/login", {
    email: email,
    password: password,
  });
}

export function signup(fullName, email, password) {
  console.log(process.env, "$#@#$@$#@#$@$#@$#");
  return axios.post(path+ "users/signup", {
    fullName,
    email,
    password,
  });
}

export function update(fullName, email, password, passOld) {
  return axios.patch(
    path+ "users/" + sessionStorage.getItem("id"),
    {
      fullName,
      email,
      password,
      passOld,
    }
  );
}

export function files(id, auth_token) {
  return axios.get(path+ "users/" + id, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  });
}

