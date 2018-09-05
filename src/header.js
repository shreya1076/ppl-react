import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideLogout: false
    };
  }
  logOut = e => {
    e.preventDefault();
    console.log("<<<<<<<<clicked");
    localStorage.clear();
    this.props.history.push("/login1");
  };
  componentDidMount() {
    console.log("<<<<<this.props for header", this.props);
    var location = this.props.location.pathname;
  }
  showHideLoader() {
    if (this.props.location.pathname === "/timeline") {
      return true;
    } else if (this.props.location.pathname.indexOf("singlepost") !== -1) {
      return true;
    } else if (this.props.location.pathname === "/home") {
      return true;
    } else if (this.props.location.pathname.indexOf("resetpassword") !== -1) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div className="header">
        <div className="header_lft">
          <div className="logo">
            <Link to="/timeline">
              <img src="/images/logo.png" />
            </Link>
          </div>
          <div className="navigatn">
            <ul>
              <li>
                <Link to="/home" className="active">
                  Home
                </Link>
              </li>
              <li>
                <a href="#"> E-Coupons </a>
              </li>
              <li>
                <a href="#">E-Brands </a>
              </li>
              <li>
                <a href="#"> Resuse Market </a>
              </li>
              <li>
                <a href="#"> Lost and Found</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header_rgt">
          <div className="flag_div">
            <img src="/images/flag.png" />
          </div>
          <input type="text" placeholder="Search" className="txt_box" />
          <div className="msg_box">
            <a href="#">
              <span className="msg_count">100</span>
            </a>
          </div>
          <div className="info_div">
            {this.showHideLoader() && (
              <div className="image_div logoutWrapper">
                {" "}
                <img src="/images/pic.png" />{" "}
                <div className="info_div1 logoutMenu">
                  <a onClick={this.logOut}>Logout</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Header);
