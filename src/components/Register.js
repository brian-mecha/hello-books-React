import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { RegisterUser } from "../utils/api";

class Register extends React.Component {
  //  Initializes empty states username, email and password
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      isLoading: false
    };
  }

  // Handles any change in any of the input fields
  handleChange = e => {
    let state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  // Validates and registers the user via the API
  register = e => {
    e.preventDefault();
    this.setState({ isLoading: true });
    RegisterUser(this.state)
      .then(rep => {
        if (rep.status === "success") {
          this.setState({ error: false, message: rep.data.message });
          swal(rep.data.message);
          this.props.history.push("/login");
        } else {
          this.setState({ error: true, message: rep.data.message });
          this.setState({ isLoading: false });
        }
      })
      .catch(err => {
        this.setState({ error: true, message: err.data.message });
        this.setState({ isLoading: false });
      });
  };

  // Renders the user registration form
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
                  <h4 className="card-title text-center">Register</h4>

                  {this.state.message && (
                    <div
                      className={
                        this.state.error ?
                          "alert alert-danger alert-dismissible fade show" :
                          "alert alert-success alert-dismissible fade show"
                      }
                      role="alert"
                    >
                      {this.state.message}
                    </div>
                  )}

                  <form method="POST" onSubmit={this.register}>
                    <div className="form-group">
                      <label htmlFor="name">Username</label>
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        required
                        autoFocus
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">E-Mail Address</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
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
                        value={this.state.password}
                        required
                      />
                    </div>

                    <div className="form-group no-margin">
                      <button type="submit" className="btn btn-info" disabled={this.state.isLoading}>
                        Register
                      </button>
                    </div>
                    <div className="margin-top20 text-center">
                      Already have an account? <Link to="/login">Login</Link>
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

export default Register;

Register.propTypes = {
  history: PropTypes.object
};
