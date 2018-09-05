import React, { Component } from "react";
export class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log("<<<<<<<<<<this.props for verify", this.props);
    let verifyId = this.props.match.params.id;
    console.log("<<<<<<<<verifyId", verifyId);
    let data = {};
    data._id = verifyId;
    let options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("http://localhost:5000/verifyEmail", options)
      .then(response => response.json())
      .then(json => {
        console.log("<<<<<<<data from the backened for verify mail", json);
        this.props.history.push("/login1");
      });
  }
  render() {
    return <div>We are verifying you.</div>;
  }
}
