import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./password_setting.css";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      password: "",
      errorMessage: "",
      errorMessage1: false,
      errorMessage2: false,
      errorMessage3: false,
      hasLoggedIn: false,
      validPassword: false,
      validEmail: false,
      isPassword: false,
      isPassword1: false,
      isEmail: false,
      isEmail1: false
    };
  }
  nameChangeHandler = e => {
    console.log("e.target.name:::::::", e.target.name);
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };
  loginSUbmit = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(this.state.emailId)) {
      this.setState({ isEmail: true });
    } else {
      this.setState({ isEmail: false });
    }
    if (this.state.password.length < 6) {
      this.setState({ isPassword: true });
    } else {
      this.setState({ isPassword: false });
    }
    this.setState({ hasLoggedIn: true });
    if (reg.test(this.state.emailId)) {
      if (this.state.password.length > 6) {
        let options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.state)
        };
        console.log("<<<<<<<options", options);
        fetch("http://localhost:5000/login", options)
          .then(response => response.json())
          .then(json => {
            console.log("<<<<<data from the backened we getting", json);
            if (json.status === 1 && json.userdata[0].verified === true) {
              console.log(
                "email and password are correct and user is verified"
              );
              this.setState({
                errorMessage1: false,
                errorMessage2: false,
                errorMessage3: false
              });
              localStorage.setItem(
                "userdata",
                JSON.stringify(json.userdata[0])
              );

              this.props.history.push("/timeline");
            } else if (
              json.status === 1 &&
              json.userdata[0].verified !== true
            ) {
              console.log("email pass correct but verified false");
              this.setState({
                errorMessage1: false,
                errorMessage2: false,
                errorMessage3: true
              });
            } else if (json.status === 2) {
              this.setState({ errorMessage1: true, errorMessage2: false });
            } else if (json.status === 3) {
              this.setState({ errorMessage2: true, errorMessage1: false });
            }
          })
          .catch(err => {
            console.log("errr");
          });
      }
    }
  };
  getEmailValidationError = () => {
    const { emailId, hasLoggedIn, isEmail, errorMessage2 } = this.state;
    if (emailId.length <= 0 && hasLoggedIn) {
      console.log("<<<<<<<<<1");
      return <p style={{ color: "red" }}>Enter emailID</p>;
    } else if (isEmail) {
      console.log("<<<<<<<<2");
      return <p style={{ color: "red" }}>Email invalid</p>;
    } else if (errorMessage2) {
      return <p style={{ color: "red" }}>Email incorrect</p>;
    }
  };
  getPasswordValidationError = () => {
    const {
      password,
      hasLoggedIn,
      isPassword,
      isPassword1,
      errorMessage1
    } = this.state;
    if (password.length <= 0 && hasLoggedIn) {
      return <p style={{ color: "red" }}>Enter password</p>;
    } else if (isPassword && password.length > 0 && password.length < 6) {
      return (
        <p style={{ color: "red" }}>Password should be six characters long</p>
      );
    } else if (errorMessage1) {
      return <p style={{ color: "red" }}>Password incorrect</p>;
    }
  };
  componentDidMount() {
    console.log("<<<<<<<<<<<<this.props for login", this.props);
    var getdata = localStorage.getItem("userdata");
    if (getdata !== null) {
      this.props.history.push("/timeline");
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <h1>Log In</h1>
                <ul>
                  <li>
                    <span>Email-ID</span>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      name="emailId"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />

                    {this.getEmailValidationError()}
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="password_setting"
                      name="password"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />

                    {this.getPasswordValidationError()}
                  </li>
                  <li>
                    <input type="checkbox" />
                    Remember Me
                  </li>
                  <li>
                    {this.state.errorMessage3 && (
                      <p style={{ color: "red" }}>
                        You Are Not Verified,Please Check Your Email
                      </p>
                    )}
                  </li>
                  <li>
                    <input
                      type="submit"
                      defaultValue="Log In"
                      onClick={this.loginSUbmit}
                    />

                    <Link to="/forgotpassword">Forgot Password</Link>
                  </li>
                </ul>
                <div className="addtnal_acnt">
                  I do not have any account yet.
                  <Link to="/">Create My Account Now !</Link>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.{" "}
              </p>
              <img src="../images/img_9.png" alt />{" "}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}
