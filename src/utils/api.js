// Handles all API requests
import axios from "axios";

// The base URL for all requests to the API
const BASE_URL = process.env.REACT_APP_base_url;

// Request header for all requests to the API
const request_header = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer " + localStorage.getItem("access_token")
}

export { getBooksData, 
  getSingleBookData, 
  LoginUser, 
  RegisterUser, 
  addBook, 
  borrowingHistory, 
  unreturnedBooks, 
  deleteBook, 
  borrowBook,
  returnBook,
  LogoutUser,
  editBook
 };

// Gets all books from the API
function getBooksData() {
  const url = `${BASE_URL}/books`;
  return axios.get(url, {
    headers: request_header
  }).then(response => response.data)
  .catch(error => {
    console.log(error.response)
    return error.response.data;
  });
}

// Gets a book with the specified ID from the API
function getSingleBookData(id) {
  const url = `${BASE_URL}/book/${id}`;
  return axios.get(url).then(response => response.data);
}

// Validates and registers a user via the API
function RegisterUser(userData) {
  const url = `${BASE_URL}/auth/register`;
  return axios
    .post(url, userData, {
      headers: request_header
    })
    .then(response => {
      return ({status:'success',data: response.data})
    })
    .catch(error => {
      console.log(error.response);
      return {status:'error',data:error.response.data};
    });
}

// Authenticates and logs in the user via the API
function LoginUser(userData) {
  const url = `${BASE_URL}/auth/login`;
  return axios
    .post(url, userData, {
      headers: request_header
    })
    .then(response => {
      return ({status:'success',data: response.data})
    })
    .catch(error => {
      console.log(error.response);
      return {status:'error',data:error.response.data};
    });
}

// Creates a new book in the API
function addBook(bookData) {
  const url = `${BASE_URL}/books`;
  return axios
    .post(url, bookData, {
      headers: request_header
    })
    .then(response => {
      return ({status:'success',data: response.data})
    })
    .catch(error => {
      console.log(error.response);
      return {status:'error',data:error.response.data};
    });
}

// Edits a book with the specified ID via the API
function editBook(bookData, id) {
  const url = `${BASE_URL}/book/${id}`;
  return axios
    .put(url, bookData, id, {
      headers: request_header
    })
    .then(response => {
      return ({status:'success',data: response.data})
    })
    .catch(error => {
      console.log(error.response);
      return {status:'error',data:error.response.data};
    });
}

// Deletes a book with the specified ID via the API
function deleteBook(id) {
  const url = `${BASE_URL}/book/${id}`;
  return axios
    .delete(url, {id}, {
      headers: request_header
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error.response);
      return error.response.data;
    });
}

// Borrows a book with the specified ID via the API
function borrowBook(id) {
  const url = `${BASE_URL}/users/book/${id}`;
  return axios
    .post(url, id, {
      headers: request_header
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error.response);
      return error.response.data;
    });
}

function returnBook(id) {
  const url = `${BASE_URL}/users/book/${id}`;
  return axios
    .put(url, id, {
      headers: request_header
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error.response);
      return error.response.data;
    });
}

// Gets the logged in user's borrowing history
function borrowingHistory() {
  const url = `${BASE_URL}/users/books`;
  return axios
    .get(url, {
      headers: request_header
    })
    .then(response => response.data);
}

// Gets all books yet to be returned by the logged in user
function unreturnedBooks() {
  const url = `${BASE_URL}/users/books?returned=false`;
  return axios
    .get(url, {
      headers: request_header
    })
    .then(response => response.data);
}

// Logs out the user via the API
function LogoutUser() {
  const url = `${BASE_URL}/auth/logout`;
  return axios
    .post(url, {
      headers: request_header
    })
    .then(response => {
      return ({status:'success',data: response.data})
    })
    .catch(error => {
      console.log(error.response);
      return {status:'error',data:error.response.data};
    });
}
