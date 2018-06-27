import React from "react";

class Login extends React.Component {
  render() {
    return (
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
              <br />
              <br />
              <a href="/">
                <h2 className="text-center text-black mb-4">Hello-Books</h2>
              </a>
              <div className="card fat">
                <div className="card-body">
                  <h4 className="card-title text-center">Login</h4>

                  <form action="#" method="GET">
                    <div className="form-group">
                      <label htmlFor="email">E-Mail Address</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        value=""
                        required
                        autoFocus
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <input type="checkbox" name="remember_me" /> Remember Me
                      </label>
                    </div>

                    <div className="form-group no-margin">
                      <button type="submit" className="btn btn-success">
                        Login
                      </button>
                    </div>

                    <div className="margin-top20 text-center">
                      Don't have an account? <a href="/register">Register</a>
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
