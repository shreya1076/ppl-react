import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Register } from "./register";
import Main from "./main";
import Header from "./header";
import Footer from "./footer";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Redux from "./redux";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <BrowserRouter>
          <Redux />
        </BrowserRouter> */}
        <Header />
        {/* <Check /> */}
        <Main />
        <Footer />
      </div>
    );
  }
}
// function mapStateToProps(state) {
//   console.log(" map state in main ", state);
// }
export default App;
