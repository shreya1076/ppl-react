import React, { Component } from "react";
import ReactDOM from "react-dom";
import Dropzone from "react-dropzone";
export class UploadCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      category: "",
      toggle: false,
      hasSubmitted: false,
      hasCategory: false
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      files: acceptedFiles
    });
    console.log("accepted:------------ " + acceptedFiles[0]);
  };
  nameChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitCategory = () => {
    this.setState({ hasSubmitted: true });
    console.log("<<<<<<<clicked");

    {
      this.state.toggle ? <UploadCategory /> : "";
    }
    console.log("<<<<<<this.state.toggle", this.state.toggle);
    // this.setState({ toggle: this.state.toggle ? false : true });
    this.setState({ toggle: false });
    console.log("<<<<<<this.state.toggle", this.state.toggle);
    let formdata = new FormData();
    console.log("the state on submit category", this.state);
    formdata.append("category", this.state.category);
    formdata.append("files", this.state.files[0]);
    console.log("<<<<<<<<formdata", formdata);
    console.log("<<<<<<<<<<clicked");
    if (this.state.category.length === 0) {
      this.setState({ hasCategory: true });
    }
    if (this.state.category.length > 0) {
      let options = {
        method: "POST",
        body: formdata
      };
      fetch("http://localhost:5000/b", options)
        .then(response => response.json())
        .then(json => {
          console.log("<<<<<data from the backened we getting", json);
          this.props.func();
          this.props.getCategoryData(json);
        })
        .catch(err => {
          console.log("errr");
        });
    }
  };
  render() {
    return (
      <div>
        {console.log("this.state.files---", this.state.files[0])}
        <section>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop}>
              <p>
                Try dropping some files here, or click to select files to
                upload.
              </p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {this.state.files.map((f, i) => (
                <div>
                  {console.log("<<<<<<files", f)}
                  <li key={f.i}>
                    {f.name} - {f.size} bytes
                  </li>
                  <img src={f.preview} />
                </div>
              ))}
            </ul>
          </aside>
        </section>
        Category:
        <input type="text" name="category" onChange={this.nameChangeHandler} />
        <br />
        <br />
        {this.state.hasCategory &&
          this.state.hasSubmitted && (
            <p style={{ color: "red" }}>This field is required</p>
          )}
        <button onClick={this.submitCategory}>Submit</button>
        {console.log(
          "<<<<<<this.state.toggle inside render",
          this.state.toggle
        )}
        <br />
        <br />
      </div>
    );
  }
}
