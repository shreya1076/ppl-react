import React, { Component } from "react";
import "./password_setting.css";
export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      idValue: "",
      validation: false,
      isNotMatched: false
    };
  }
  nameChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitPassword = () => {
    this.setState({ validation: true });
    console.log("<<<<<clicked");
    var data = {};
    data._id = this.state.idValue;
    data.password = this.state.newPassword;
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    if (
      this.state.newPassword === this.state.confirmPassword &&
      this.state.newPassword.length > 6 &&
      this.state.confirmPassword.length > 6
    ) {
      fetch("http://localhost:5000/passwordChange", options)
        .then(response => response.json())
        .then(json => {
          console.log("<<<<<<upated password data we got", json);
          this.props.history.push("/login1");
        });
    } else {
      this.setState({ isNotMatched: true });
    }
  };
  componentDidMount() {
    console.log("<<<<<<<<<this.props for reset password", this.props);
    var id = this.props.match.params.id;
    this.setState({ idValue: id });
  }
  passwordError = () => {
    if (this.state.newPassword.length === 0 && this.state.validation === true) {
      return <p style={{ color: "red" }}>This field is required</p>;
    } else if (
      this.state.newPassword.length < 6 &&
      this.state.validation === true
    ) {
      return (
        <p style={{ color: "red" }}>Password should be six characters long</p>
      );
    }
  };
  passwordError1 = () => {
    if (
      this.state.confirmPassword.length === 0 &&
      this.state.validation === true
    ) {
      return <p style={{ color: "red" }}>This field is required</p>;
    } else if (
      this.state.confirmPassword.length < 6 &&
      this.state.validation === true
    ) {
      return (
        <p style={{ color: "red" }}>Password should be six characters long</p>
      );
    }
  };
  passwordError2 = () => {
    if (
      this.state.newPassword.length !== this.state.confirmPassword.length &&
      this.state.validation === true
    ) {
      return <p style={{ color: "red" }}>Passwords do not match</p>;
    }
  };
  render() {
    return (
      <div>
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button
                type="button"
                className="btn btn-navbar"
                data-toggle="collapse"
                data-target=".nav-collapse"
              >
                {" "}
                <span className="icon-bar" /> <span className="icon-bar" />{" "}
                <span className="icon-bar" />{" "}
              </button>
              <a className="brand" href>
                PPL
              </a>
              <div className="pro_info pull-right">
                <div className="pro_icn">
                  <img src="/images/pic_small.png" />
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
                    {" "}
                    <a href>Home</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>E-Coupons</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>E-Brands</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>Resuse Market</a>{" "}
                  </li>
                  <li className>
                    {" "}
                    <a href>Lost and Found</a>{" "}
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
                <h1>Reset Password</h1>
                <ul>
                  <li>
                    <span>Enter New Password</span>
                    <input
                      type="password"
                      name="newPassword"
                      className="password_setting"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />
                    {this.passwordError()}
                  </li>
                  <li>
                    <span>Confirm Password</span>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="password_setting"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />
                    {this.passwordError1()}
                  </li>
                  <li>{this.passwordError2()}</li>
                  <li>
                    <input
                      type="submit"
                      defaultValue="Submit"
                      onClick={this.submitPassword}
                    />
                  </li>
                </ul>
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
              <img src="/images/img_9.png" alt />{" "}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}
