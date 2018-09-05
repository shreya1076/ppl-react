import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./login";
import Register from "./register";
import { Timeline } from "./timeline";
import { SinglePost } from "./singlepost";
import { ForgotPassword } from "./forgotpassword";
import { Home } from "./home";
import { Verify } from "./verify";
import { ResetPassword } from "./resetpassword";
// import { RightContent } from "./rightcontent";
import { connect } from "react-redux";
class Main extends Component {
  render() {
    return (
      // <main>
      <Switch>
        // routing is done this way as shown
        {/* <Route path="/" component={Check} /> */}
        <Route path="/" component={Register} />
        <Route path="/login1/" component={Login} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/singlepost/:id" component={SinglePost} />
        <Route path="/home" component={Timeline} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/resetpassword/:id" component={ResetPassword} />
        <Route path="/verify/:id" component={Verify} />
      </Switch>
      // </main>
    );
  }
}
// function mapStateToProps(state) {
//   console.log(" map state in main ", state);
// }
export default Main;
