/* global location */
/* eslint no-restricted-globals: ["off", "location"] */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./password_setting.css";
// import store from "./store/store";
// import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      FirstName: "",
      LastName: "",
      hasUserSubmitted: false,
      invalidEmail: false,
      haspassword: false,
      popUp: false
    };
  }

  nameChangeHandler = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    console.log("<<<<<name", name);
    // store.dispatch({
    //   type: "inputTypeHandler",
    //   name: e.target.name,
    //   value: e.target.value
    // });
  };
  // validationFunc = (key, value) => {
  //   store.dispatch({ type: "inputTypeHandler", name: key, value: value });
  // };
  registerButton = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log("<<<<<<<<<<<clicked");
    this.setState({ hasUserSubmitted: true });
    // this.validationFunc("hasUserSubmitted", true);
    if (!reg.test(this.state.Email)) {
      this.setState({ invalidEmail: true });
      // this.validationFunc("invalidEmail", true);
    } else {
      this.setState({ invalidEmail: false });
      // this.validationFunc("invalidEmail", false);
    }
    if (this.state.Password.length <= 6) {
      this.setState({ haspassword: true });
      // this.validationFunc("haspassword", true);
    } else {
      this.setState({ haspassword: false });
      // this.validationFunc("haspassword", false);
    }

    if (
      this.state.Username.length > 0 &&
      this.state.Password.length > 0 &&
      this.state.Email.length > 0 &&
      this.state.FirstName.length > 0 &&
      this.state.LastName.length > 0
    ) {
      if (reg.test(this.state.Email)) {
        if (this.state.Password.length > 6) {
          let options = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.props.registerState)
          };
          console.log("<<<<<<<options", options);

          fetch("http://localhost:5000/register", options)
            .then(response => response.json())
            .then(json => {
              console.log("<<<<<data from the backened we getting", json);
              // if (json) {
              //   console.log("<<<<<<<<this.state", this.state);
              // }
              console.log("<<<0", json.result);
              if (json.result) {
                console.log("<<<<1", json.result);
                this.setState({ emailExist: true, popUp: false });
                // this.validationFunc("emailExist", true);
                // this.validationFunc("popUp", false);
              } else {
                console.log("<<<<<2", json.result);
                this.setState({ emailExist: false, popUp: true });
                // this.validationFunc("emailExist", false);
                // this.validationFunc("popUp", true);
              }
            })
            .catch(err => {
              console.log("errr");
            });
        }
      }
    }
  };

  getPasswordValidationError = () => {
    const { Password, haspassword, hasUserSubmitted } = this.state;
    if (this.state.Password.length <= 0 && this.state.hasUserSubmitted) {
      return <p style={{ color: "red" }}>This field is required</p>;
    } else if (
      this.state.haspassword &&
      this.state.Password.length > 0 &&
      this.state.Password.length < 6
    ) {
      return (
        <p style={{ color: "red" }}>Password should be six characters long</p>
      );
    } else {
      return null;
    }
  };
  getEmailValidationError = () => {
    const { Email, hasUserSubmitted, invalidEmail, emailExist } = this.state;
    if (this.state.Email.length <= 0 && this.state.hasUserSubmitted) {
      return <p style={{ color: "red" }}>This field is required</p>;
    } else if (this.state.invalidEmail && this.state.Email.length > 0) {
      return <p style={{ color: "red" }}>Email is not valid </p>;
    } else if (this.state.emailExist && this.state.Email.length > 0) {
      return <p style={{ color: "red" }}>Email already exists </p>;
    } else {
      return null;
    }
  };
  getErrorMessage = field => {
    if (this.state[field].length <= 0 && this.state.hasUserSubmitted) {
      return <p style={{ color: "red" }}>This field is required</p>;
    }
  };
  popUp = () => {
    console.log("<<<<<<clicked");
    this.props.history.push("/login1");
  };

  render() {
    // console.log("this.props for register", this.props.registerState);
    return (
      <div>
        {/* {console.log("121", this.props.registerState.popUp)} */}
        {this.state.popUp === true && (
          <div className="popup_sec" id="pop_forgt">
            <div className="clos_btn">
              <img src="images/clos.png" alt id="clos_pop" />
            </div>
            <div className="pop_hdr">
              A mail has been send to your e-mail Id for Verification
            </div>
            <div className="man_contnt">
              <span>Please Check Your Mail Box!</span>
              <input type="submit" defaultValue="Ok" onClick={this.popUp} />
            </div>
          </div>
        )}
        <meta charSet="utf-8" />
        <title>Create An Account</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link
          href="css/bootstrap-responsive.css"
          rel="stylesheet"
          type="text/css"
        />
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button
                type="button"
                className="btn btn-navbar"
                data-toggle="collapse"
                data-target=".nav-collapse"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="brand" href>
                PPL
              </a>
              <div className="pro_info pull-right">
                <div className="pro_icn">
                  <img src="images/pic_small.png" />
                </div>
                <div className="pro_txt">
                  Me
                  <b className="caret" />
                </div>
                <ul
                  className="dropdown-menu"
                  role="menu"
                  aria-labelledby="dLabel"
                >
                  <li>
                    <a tabIndex={-1} href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Message Box
                    </a>
                  </li>
                  <li>
                    <a tabIndex={-1} href="#">
                      Change Language
                    </a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a tabIndex={-1} href="#">
                      <input type="text" placeholder="search" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="nav-collapse collapse">
                <ul className="nav">
                  <li className="active">
                    <a href>Home</a>
                  </li>
                  <li className>
                    <a href>E-Coupons</a>
                  </li>
                  <li className>
                    <a href>E-Brands</a>
                  </li>
                  <li className>
                    <a href>Resuse Market</a>
                  </li>
                  <li className>
                    <a href>Lost and Found</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="register_sec">
                <h1>Create An Account</h1>
                <ul>
                  <li>
                    <span>Username</span>
                    <input
                      type="text"
                      name="Username"
                      placeholder="Enter your username"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />

                    {this.getErrorMessage("Username")}
                  </li>
                  <li>
                    <span>Password</span>
                    <input
                      type="password"
                      name="Password"
                      className="password_setting"
                      placeholder="Enter your password"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />
                    {this.getPasswordValidationError(name)}
                  </li>
                  <li>
                    <span>Email</span>
                    <input
                      type="text"
                      name="Email"
                      placeholder="Enter your email"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />
                    {this.getEmailValidationError(name)}
                  </li>
                  <li>
                    <span>First Name</span>
                    <input
                      type="text"
                      name="FirstName"
                      placeholder="Enter your first name"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />

                    {this.getErrorMessage("FirstName")}
                  </li>
                  <li>
                    <span>Last Name</span>
                    <input
                      type="text"
                      name="LastName"
                      placeholder="Enter your last name"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />

                    {this.getErrorMessage("LastName")}
                  </li>
                  <li>
                    <input type="checkbox" />I agree to Term &amp; Conditions
                  </li>
                  <li>
                    <input
                      type="submit"
                      defaultValue="Register"
                      onClick={this.registerButton}
                    />
                  </li>
                </ul>
                <div className="addtnal_acnt">
                  I already have an account.
                  <Link to="/login1">Login My Account !</Link>
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
              <img src="images/img_9.png" alt />{" "}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}
// function mapStateToProps(state) {
//   console.log(" mapStateToProps in register component ", state);
//   return {
//     registerState: state
//   };
// }
// export default connect(mapStateToProps)(Register);
export default Register;
