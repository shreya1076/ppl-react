import React, { Component } from "react";
export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      emailError: false,
      showPopUp: false,
      check: false
    };
  }
  nameChangeHandler = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  popUp = () => {
    console.log("<<<<<clciked");
    this.props.history.push("/login1");
  };
  submitEmail = () => {
    this.setState({ check: true });
    console.log("<<<<<clickeced");
    let data = {};
    data.email = this.state.emailValue;
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("http://localhost:5000/checkEmail", options)
      .then(response => response.json())
      .then(json => {
        console.log("<<data from backened we getting checkEmail", json);
        if (json.length === 0) {
          this.setState({ emailError: true, showPopUp: false });
        } else if (json.length !== 0) {
          this.setState({ emailError: false, showPopUp: true });
        }
      });
  };

  render() {
    return (
      <div>
        {this.state.showPopUp === true && (
          <div className="popup_sec" id="pop_forgt">
            <div className="clos_btn">
              <img src="images/clos.png" alt id="clos_pop" />
            </div>
            <div className="pop_hdr">
              A mail has been send to your e-mail Id for Reset Password Link
            </div>
            <div className="man_contnt">
              <span>Please Check Your Mail Box!</span>
              <input type="submit" defaultValue="Ok" onClick={this.popUp} />
            </div>
          </div>
        )}

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
                <h1>Forgot Password</h1>
                <ul>
                  <li>
                    <span>Enter E-mail ID</span>
                    <input
                      type="text"
                      name="emailValue"
                      onChange={this.nameChangeHandler}
                      style={{ color: "black" }}
                    />
                    {this.state.emailValue.length === 0 &&
                      this.state.check === true && (
                        <p style={{ color: "red" }}>This field is required</p>
                      )}
                  </li>
                  {this.state.emailError && (
                    <p style={{ color: "red" }}>Cannot find an Account</p>
                  )}
                  <li>
                    <input
                      type="submit"
                      defaultValue="Submit"
                      onClick={this.submitEmail}
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
              <img src="images/img_9.png" alt />{" "}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    );
  }
}
