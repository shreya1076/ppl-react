import React, { Component } from "react";
import ReactDOM from "react-dom";
import Dropzone from "react-dropzone";
export class UploadPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      category: "",
      files: [],
      hasDescription: false,
      hasCategory: false,
      hasSubmitted: false
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      files: acceptedFiles
    });
    console.log("accepted:------------ " + acceptedFiles[0]);
  };

  nameChangeHandler = e => {
    console.log(">>>>>>> Name :: ", e.target.name);
    const name = e.target.name;
    this.setState({ [name]: e.target.value }, () => {
      console.log("<<<<<<this.state", this.state);
    });
  };
  submitPost = () => {
    this.setState({ hasSubmitted: true });
    var getUserData = JSON.parse(localStorage.getItem("userdata"));
    console.log("<<<<<<<<<<<<<getUserData", getUserData);
    var userId = getUserData._id;
    var userName = getUserData.username;
    console.log("<<<<<<<<<<userId", userId);
    let formdata = new FormData();
    console.log("this state on submit post", this.state);
    formdata.append("description", this.state.description);
    formdata.append("category", this.state.category);
    formdata.append("files", this.state.files[0]);
    formdata.append("userId", userId);
    formdata.append("userName", userName);
    if (this.state.description.length === 0) {
      this.setState({ hasDescription: true });
    } else if (this.state.category.length === 0) {
      this.setState({ hasCategory: true });
    }
    if (this.state.description.length > 0 && this.state.category.length > 0) {
      let options = {
        method: "POST",
        body: formdata
      };
      console.log("<<<<<<<options", options);

      fetch("http://localhost:5000/a", options)
        .then(response => response.json())
        .then(json => {
          console.log("<<<<<data from the backened we getting", json);
          console.log("dataRetrieval", this.props);
          this.props.dataRetrieval(json);
          this.props.func1();
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
        Description:
        <input
          type="text"
          name="description"
          onChange={this.nameChangeHandler}
        />
        <br />
        {this.state.hasDescription &&
          this.state.hasSubmitted && (
            <p style={{ color: "red" }}>This field is required</p>
          )}
        Category:
        <select name="category" onChange={this.nameChangeHandler}>
          {this.props.categoryData.map((cate, i) => {
            console.log("<<<<<<<<cate", cate);
            return (
              <option key={i} value={cate.category}>
                {cate.category}
              </option>
            );
          })}
        </select>
        {this.state.hasCategory &&
          this.state.hasSubmitted && (
            <p style={{ color: "red" }}>This field is required</p>
          )}
        <br />
        <br />
        <button onClick={this.submitPost}>Submit</button>
      </div>
    );
  }
}
