import axios from 'axios';

const BASE_URL = 'https://hello-booksc3.herokuapp.com/api/v2';

export { getBooksData, getSingleBookData };

function getBooksData() {
  const url = `${BASE_URL}/books`;
  return axios.get(url).then(response => response.data);
}

function getSingleBookData(id) {
    const url = `${BASE_URL}/book/${id}`;
    return axios.get(url).then(response => response.data);
}
