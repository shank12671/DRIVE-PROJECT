import axios from "axios";

// const path = process.env.VUE_APP_SERVER_PATH;
const path = "http://localhost:5000/";


export function upload(formData) {

  return axios.post(
    path+ "users/upload/" + sessionStorage.getItem("id"),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        token: "Bearer " + sessionStorage.getItem("auth_token"),
      },
    }
  );
}

export function delete_file(name) {
  return axios.delete(
    path+
      "users/delete/" +
      sessionStorage.getItem("id") +
      "/" +
      name
  );
}

export function getDetails(name) {
  return axios.get(
    path+
      "users/file/" +
      sessionStorage.getItem("id") +
      "/" +
      name
  );
}
