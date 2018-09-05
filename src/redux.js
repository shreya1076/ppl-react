import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";
export default class Redux extends Component {
  render() {
    return (
      <div>
        <Header />

        <Main />
        <Footer />
      </div>
    );
  }
}
