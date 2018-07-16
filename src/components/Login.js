import React from "react";
import { Link } from "react-router-dom";
import { LoginUser } from "../utils/api";
import { Auth } from "../utils/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  componentDidMount(){
    // console.log(localStorage.getItem('access_token'))
  }
  handleChange = e => {
    let state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  login = e => {
    e.preventDefault();
    LoginUser(this.state)
      .then(rep => {
        if(rep.status==='success'){
          this.setState({ error: false, message: rep.data.message });
          localStorage.setItem('access_token',rep.data.access_token);
          Auth.authenticate()
        }
        else{
          this.setState({ error: true, message: rep.data.message });
        }
      })
      .catch(err => {
        this.setState({ error: true, message: err.data.message });
      });
  };


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

                  {this.state.message && (
                    <div className={
                      this.state.error
                        ? "alert alert-danger alert-dismissible fade show"
                        : "alert alert-success alert-dismissible fade show"
                    } role="alert">
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
                  )}
                  
                  <form method="GET" onSubmit={this.login}>
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

                    {/* <div className="form-group">
                      <label>
                        <input type="checkbox" name="remember_me" /> Remember Me
                      </label>
                    </div> */}

                    <div className="form-group no-margin">
                      <button type="submit" className="btn btn-success">
                        Login
                      </button>
                    </div>

                    <div className="margin-top20 text-center">
                      Don't have an account? <Link to="/register">Register</Link>
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer">Copyright &copy; 2018 | Hello-Books</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
