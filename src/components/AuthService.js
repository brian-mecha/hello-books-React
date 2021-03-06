import decode from "jwt-decode";

export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || process.env.REACT_APP_base_url; // API server domain
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(email, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => {
      this.setToken(res.access_token); // Setting the token in localStorage
      this.setAdmin(res.isAdmin); //Gets admin status
      return Promise.resolve(res);
    });
  }

  ifAdmin() {
    const AdminStatus = this.getAdmin();
    return AdminStatus;
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  setToken(accessToken) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", accessToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  setAdmin(adminStatus) {
    // Saves user token to localStorage
    localStorage.setItem("is_admin", adminStatus);
  }

  getAdmin() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("is_admin");
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("is_admin");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };

    // Setting Authorization header
    if (this.loggedIn()) {
      headers["Authorization"] = `Bearer ${this.getToken()}`;
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
