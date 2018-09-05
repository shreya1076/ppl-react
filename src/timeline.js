import React, { Component } from "react";
import { UploadPostForm } from "./uploadPost";
import { UploadCategory } from "./uploadCategory";
import { RightData } from "./rightdata";
import { Link } from "react-router-dom";
import "./img.css";
import "./post_list_ul.css";
export class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      toggle1: false,

      postData: [],
      categoryData: [],
      userDetails: {},
      hasSubmitted: false
    };
  }
  uploadPost = () => {
    console.log("<<<<<<<clicked");
    // <UploadPostForm />;
    this.setState({ toggle: this.state.toggle ? false : true });
  };
  uploadCategory = () => {
    console.log("<<<<<<clicked ");
    this.setState({ toggle1: this.state.toggle1 ? false : true });
  };
  dataRetrieval = data => {
    console.log("dataRetrival called");
    console.log("timeline", data);
    this.setState({ postData: data.allPostdata });
  };
  getCategoryData = data => {
    console.log("<<<<<<<<<callled");
    console.log("timeline category", data);
    this.setState({ categoryData: data.allCategoryData });
  };
  likesHandler = (post, event, i) => {
    console.log("<<<<index of the post liked", i);
    console.log("<<<<<<clicked!!!!!!!!");
    event.preventDefault();
    console.log("<<<<<post", post);
    post.userDetails = this.state.userDetails;
    let options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post)
    };
    fetch("http://localhost:5000/a/updateData", options)
      .then(response => response.json())
      .then(json => {
        console.log("<<<<<update data from backened ", json);
        var check = this.state.postData.map((e1, index) => {
          console.log("<<<<e1", e1);
          if (e1._id === json._id) {
            return json;
          } else {
            return e1;
          }
        });
        this.setState({ postData: check });
        console.log("<<<<check for us", check);
        console.log("<<<<<postData value for us", this.state.postData);
      });
  };
  imageClick = postData => {
    console.log("<<<<<clicked", postData);

    this.props.history.push(`/singlepost/${postData._id}`);
  };
  getCategoryWisePost = c => {
    console.log("<<<<<<clicked");
    console.log("<<<<<<<<<<c", c);
    var data = {};
    data.category = c.category;
    console.log("<<<<<<<data", data);
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("http://localhost:5000/a/getPostByCategory", options)
      .then(response => response.json())
      .then(json => {
        console.log(
          "<<<<data from backened to show post based on category",
          json
        );
        this.setState({ postData: json });
      });
  };
  componentWillMount() {
    var getUserDetail = JSON.parse(localStorage.getItem("userdata"));
    console.log("<<<<<<<getData", getUserDetail);

    this.setState({ userDetails: getUserDetail });
    console.log("<<<this.state.userDetails", this.state.userDetails);
    if (getUserDetail === null) {
      this.props.history.push("/login1");
    }

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:5000/a/getData", options)
      .then(response => response.json())
      .then(json => {
        console.log("<<<backened data timeline ka lia", json);
        this.setState({ postData: json });
      });
    fetch("http://localhost:5000/b/getData", options)
      .then(response => response.json())
      .then(json => {
        console.log("<<<backened data timeline category ka lia", json);
        this.setState({ categoryData: json });
      });
  }
  myUploads = () => {
    this.setState({ hasSubmitted: true });
    console.log("<<<<<<clicked");
    var getUserDetails = JSON.parse(localStorage.getItem("userdata"));
    console.log("<<<<getUserDetails", getUserDetails);
    var getUserId = getUserDetails._id;
    console.log("<<<<<<<<getUserId", getUserId);
    let data = {};
    data.getUserId = getUserId;
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch("http://localhost:5000/a/getMyUploads", options)
      .then(response => response.json())
      .then(json => {
        console.log("data from backened we getting for MYUPLOADS", json);
        this.setState({ postData: json });
      });
  };
  decider = (postdetails, userdetails) => {
    var isIdPresent;
    if (postdetails && postdetails.likes) {
      postdetails.likes.forEach(element => {
        console.log("<<<element", element);
        if (element === userdetails._id) {
          isIdPresent = true;
        }
      });
      if (isIdPresent) {
        return "unlike";
      } else {
        return "like";
      }
    }
  };
  mostComment = e => {
    e.preventDefault();
    console.log("<<<<clicked most commented");
    var resultComment = this.state.postData.sort(function(a, b) {
      console.log("<<<<a", a.comment);
      console.log("<<<<<b", b.comment);
      if (a.comment.length < b.comment.length) return 1;
      if (a.comment.length > b.comment) return -1; //-1 swap
      return 0;
    });
    console.log("<<<<<<<result commment", resultComment);
    this.setState({ postData: resultComment });
    console.log("<<<<<<<homeData value mostComment", this.state.postData);
  };

  latestPost = e => {
    e.preventDefault();
    console.log("<<<<<clicked latest post");
    var result = this.state.postData.sort(function(a, b) {
      return Math.abs(new Date(a.date) - new Date(b.date));
    });
    console.log("<<<<<<<result", result);
    this.setState({ postData: this.state.postData });
    console.log("<<<<<<<ppostData", this.state.postData);
  };
  oldestPost = e => {
    e.preventDefault();
    console.log("<<<<<clicked oldest post");
    var resultOld = this.state.postData.sort(function(a, b) {
      console.log("<<<<a.date", a.date);
      console.log("<<<b.date", b.date);
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
    console.log("<<<<<<resultOld", resultOld);
    this.setState({ postData: resultOld });
    console.log("<<<<<<<homeData", this.state.homeData);
  };

  render() {
    return (
      <div>
        {console.log("postData", this.state.postData)}
        {console.log("categoryData", this.state.categoryData)}
        <div className="navbar navbar-inverse navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container">
              <button
                type="button"
                className="btn btn-navbar"
                data-toggle="collapse"
                data-target=".nav-collapse"
              >
                <span className="icon-bar" /> <span className="icon-bar" />{" "}
                <span className="icon-bar" />{" "}
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
            <RightData
              uploadPost={this.uploadPost}
              uploadCategory={this.uploadCategory}
              getCategoryData={this.getCategoryData}
              categoryData={this.state.categoryData}
              getCategoryWisePost={this.getCategoryWisePost}
              toggle1={this.state.toggle1}
            />

            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends
                    </li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged
                    </li>
                  </ul>
                </div>
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="images/timeline_img1.png" />
                      <div className="profile_text">
                        <a href="#">Change Profile Pic</a>
                      </div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div">
                        <a href="#">
                          Edit <img src="images/timeline_img.png" />
                        </a>
                      </div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">Stefiney Gibbs</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">Female</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">
                              This is an example of a comment. You can create as
                              many comments like this one or sub comments as you
                              like and manage all of your content inside
                              Account.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li>
                        <a href="#">Timeline </a>
                      </li>
                      <li>
                        <a href="#">About </a>
                      </li>
                      <li>
                        <a href="#">Album</a>
                      </li>
                      <li>
                        <a href="#"> Pets</a>
                      </li>
                      <li>
                        <a
                          className={this.state.hasSubmitted ? "active" : null}
                          href="#"
                          onClick={this.myUploads}
                        >
                          My Uploads{" "}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="post_div">
                    <div className="post_list">
                      <ul className="post_list_ul">
                        <li>
                          <a href="#" onClick={this.latestPost}>
                            <span className="list_img">
                              <img src="images/img_1.png" />
                            </span>
                            Latest First
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={this.oldestPost}>
                            <span className="list_img">
                              <img src="images/img_2.png" />
                            </span>
                            Oldest First
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="list_img">
                              <img src="images/img_3.png" />
                            </span>
                            Most Pet
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="list_img">
                              <img src="images/img_4.png" />
                            </span>
                            Most Clicks
                          </a>
                        </li>
                        <li>
                          <a href="#" onClick={this.mostComment}>
                            <span className="list_img">
                              <img src="images/img_5.png" />
                            </span>
                            Most Commented
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contnt_2">
                <br />
                {this.state.toggle ? (
                  <UploadPostForm
                    func1={this.uploadPost}
                    dataRetrieval={this.dataRetrieval}
                    categoryData={this.state.categoryData}
                  />
                ) : (
                  ""
                )}

                <br />
                {console.log(
                  "<<<<<<<postData timelineeeeeeeeeeeeeee",
                  this.state.postData
                )}
                {this.state.postData &&
                  this.state.postData.map((post, i) => {
                    console.log("<<<<<<post", post);
                    var monthNames = [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"
                    ];
                    var a = new Date(post.date);
                    var d = a.getDate();
                    var m = monthNames[a.getMonth()];
                    var y = a.getFullYear();

                    var h = a.getHours();
                    console.log("<<<<<<<<h", h);
                    var result = "";

                    if (h > 12) {
                      h = h - 12;
                      result = "pm";
                    } else {
                      result = "am";
                    }
                    var m1 = a.getMinutes();
                    return (
                      <div key={i} className="div_a">
                        <div className="div_title">
                          <li>{post.description}</li>
                        </div>
                        <div className="btm_rgt">
                          <div className="btm_arc">{post.category}</div>
                        </div>
                        <div className="div_top">
                          <div className="div_top_lft">
                            <img src="images/img_6.png" />
                            {post.userName}
                          </div>
                          <div className="div_top_rgt">
                            <span className="span_date">
                              <li style={{ lineHeight: "43px" }}>
                                {d + "  " + m + "  " + y}
                              </li>
                            </span>
                            <span className="span_time">
                              {h + ":" + m1 + result}
                            </span>
                          </div>
                        </div>

                        <div className="div_image" />

                        <div className="div_btm">
                          <div className="btm_list" style={{ width: "100%" }}>
                            <div>
                              <img
                                className="imgStyle"
                                src={`http://localhost:5000/${post.image}`}
                                alt="share"
                                onClick={() => {
                                  this.imageClick(post);
                                }}
                              />
                            </div>
                            <ul>
                              <li>
                                <a href="#">
                                  <span className="btn_icon">
                                    <img
                                      src="images/icon_001.png"
                                      alt="share"
                                    />
                                  </span>
                                  Share
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <span className="btn_icon">
                                    <img
                                      src="images/icon_002.png"
                                      alt="share"
                                    />
                                  </span>
                                  Flag
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={e => {
                                    this.likesHandler(post, e, i);
                                  }}
                                  href="#"
                                >
                                  <span className="btn_icon">
                                    <img
                                      src="images/icon_003.png"
                                      alt="share"
                                    />
                                  </span>
                                  {this.decider(post, this.state.userDetails)}
                                </a>
                              </li>
                              <div
                                className="like_count"
                                style={{ marginRight: 10 }}
                              >
                                <span className="lft_cnt" />
                                <span className="mid_cnt">
                                  {post ? post.likes.length : 0}
                                </span>
                                <span className="rit_cnt" />
                              </div>
                              <li>
                                <a href="#">
                                  <span className="btn_icon">
                                    <img
                                      src="images/icon_004.png"
                                      alt="share"
                                    />
                                  </span>
                                  {post.comment.length} Comments
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}
