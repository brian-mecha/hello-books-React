import React from "react";
import PropTypes from "prop-types";
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { LoginUser } from "../utils/api";
import AuthService from "./AuthService";
import { Auth } from "../utils/auth";


export default class Login extends React.Component {
  //  Initializes empty states email and password
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.Auth = new AuthService();
    this.state = {
      isLoading: false
    };
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.push("/");
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // Authenticates and logs in the user via the API
  handleFormSubmit(e) {
    this.setState({ isLoading: true });
    e.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        // swal(res.message);
        this.props.history.push("/");
        swal(res.message);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        alert(err);
      });
  }

  // Authenticates and logs in the user via the API
  login = e => {
    e.preventDefault();
    LoginUser(this.state)
      .then(rep => {
        if (rep.status === "success") {
          this.setState({ error: false, message: rep.data.message });
          localStorage.setItem("access_token", rep.data.access_token);
          Auth.authenticate();
          this.props.history.push("/");
        } else {
          this.setState({ error: true, message: rep.data.message });
        }
      })
      .catch(err => {
        this.setState({ error: true, message: err.data.message });
      });
  };

  // Renders the Login form
  render() {
    return (
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
              <br />
              <br />
              <Link to="/">
                <h2 className="text-center text-black mb-4">Hello-Books</h2>
              </Link>
              <div className="card fat">
                <div className="card-body">
                  <h4 className="card-title text-center">Login</h4>

                  {/* {this.state.message && (
                    <div
                      className={
                        this.state.error
                          ? "alert alert-danger alert-dismissible fade show"
                          : "alert alert-success alert-dismissible fade show"
                      }
                      role="alert"
                    >
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      {this.state.message}
                    </div>
                  )} */}

                  <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.handleChange}
                        // value={this.state.email}
                        autoFocus
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.handleChange}
                        // value={this.state.password}
                        required
                      />
                    </div>

                    <div className="form-group no-margin">
                      <button type="submit" className="btn btn-success" disabled={this.state.isLoading}>
                        Login
                      </button>
                    </div>

                    <div className="margin-top20 text-center">
                      Don't have an account?{" "}
                      <Link to="/register">Register</Link>
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer">
                Copyright &copy; 2018 | <Link to="/">Hello-Books</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object
};
