import axios from "axios";

// const BASE_URL = 'https://hello-booksc3.herokuapp.com/api/v2';
const BASE_URL = "http://127.0.0.1:5000/api/v2";

export { getBooksData, getSingleBookData, LoginUser, RegisterUser, addBook, borrowingHistory, unreturnedBooks };

function getBooksData() {
  const url = `${BASE_URL}/books`;
  return axios.get(url).then(response => response.data);
}

function getSingleBookData(id) {
  const url = `${BASE_URL}/book/${id}`;
  return axios.get(url).then(response => response.data);
}

function RegisterUser(userData) {
  const url = `${BASE_URL}/auth/register`;
  return axios
    .post(url, userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error.response);
      return error.response.data;
    });
}

function LoginUser(userData) {
  const url = `${BASE_URL}/auth/login`;
  return axios
    .post(url, userData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error.response);
      return error.response.data;
    });
}

function addBook(bookData) {
  const url = `${BASE_URL}/books`;
  return axios
    .post(url, bookData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error.response);
      return error.response.data;
    });
}

function borrowingHistory() {
  const url = `${BASE_URL}/users/books`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
    .then(response => response.data);
}

function unreturnedBooks() {
  const url = `${BASE_URL}/users/books?returned=false`;
  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
    .then(response => response.data);
}
