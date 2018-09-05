import React, { Component } from "react";
import { Link } from "react-router-dom";
export class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singlePost: {},
      commentValue: "",
      userDetails: {},
      isRequired: false
    };
  }
  componentDidMount() {
    var getUserDetail = localStorage.getItem("userdata");
    this.setState({ userDetails: JSON.parse(getUserDetail) });
    var id = this.props.match.params.id;
    let data = {};
    data._id = id;
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    fetch("http://localhost:5000/a/getIndividualPost", options)
      .then(response => response.json())
      .then(json => {
        console.log("<<<<<data from the backened we getting", json[0]);
        this.setState({ singlePost: json[0] });
      });
  }
  submitComment = singlepostdata => {
    console.log("<<<<<<singlepostdata", singlepostdata);
    if (this.state.commentValue === "") {
      this.setState({ isRequired: true });
    } else {
      this.setState({ isRequired: false });
    }
    let data = {};
    data._id = singlepostdata;
    data.comment = this.state.commentValue;
    data.userDetails = this.state.userDetails;
    console.log("<<<<<<<data", data);
    let options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    if (this.state.commentValue) {
      fetch("http://localhost:5000/a/showComment", options)
        .then(response => response.json())
        .then(json => {
          console.log("<<<<<update data from backened ", json);
          this.setState({ singlePost: json });
          this.setState({ commentValue: "" });
        });
    }
  };

  commentChange = e => {
    console.log("<<<<<<<e.target.name", e.target.name);
    console.log("<<<<<e.target.value", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  likeHandler = (e, postData) => {
    e.preventDefault();

    postData.userDetails = this.state.userDetails;
    let options = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    };
    fetch("http://localhost:5000/a/updateData", options)
      .then(response => response.json())
      .then(json => {
        console.log("<<<<<update data from backened ", json);
        this.setState({ singlePost: json });
      });
  };
  decider = (postdata, userdet) => {
    var isIdPresent;
    if (postdata && postdata.likes) {
      postdata.likes.forEach(element => {
        if (element === userdet._id) {
          isIdPresent = true;
        }
      });
      if (isIdPresent) {
        return "unlike";
      } else {
        return "like";
      }
    }
    return "like";
  };
  render() {
    console.log("<<<<<<<<<singlePost", this.state.singlePost);
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

    var a = new Date(this.state.singlePost.date);
    var d = a.getDate();
    var m = monthNames[a.getMonth()];
    var y = a.getFullYear();
    var h = a.getHours();
    var result = "";

    if (h > 12) {
      result = "pm";
    } else {
      result = "am";
    }
    var m1 = a.getMinutes();
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
              <a className="brand">PPL</a>
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
                    <Link to="/home">Home</Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>E-Coupons</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>E-Brands</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>Resuse Market</a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a>Lost and Found</a>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="/images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="/images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="#">Upload Post</a>{" "}
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="/images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="/images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="#">Invite Friends</a>{" "}
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list">
                  <ul>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_01.png" alt="up" />
                        </span>{" "}
                        CATS
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_02.png" alt="up" />
                        </span>{" "}
                        Dogs
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_03.png" alt="up" />
                        </span>{" "}
                        Birds
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_04.png" alt="up" />
                        </span>{" "}
                        Rabbit
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="/images/icon_05.png" alt="up" />
                        </span>{" "}
                        Others
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">
                  Featured
                </div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="/images/feat_img1.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="/images/feat_img2.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="/images/feat_img3.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">
                    {this.state.singlePost.description}
                  </div>
                  <div className="btm_rgt">
                    <div className="btm_arc">
                      {this.state.singlePost.category}
                    </div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft">
                      <img src="/images/img_6.png" />
                      {this.state.singlePost.userName}
                    </div>
                    <div className="div_top_rgt">
                      <span className="span_date">{d + " " + m + " " + y}</span>
                      <span className="span_time">{h + ":" + m1 + result}</span>
                    </div>
                  </div>
                  <div className="div_image">
                    <img
                      src={`http://localhost:5000/${
                        this.state.singlePost.image
                      }`}
                      alt="pet"
                    />
                  </div>

                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="/images/icon_001.png" alt="share" />
                            </span>
                            Share
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="/images/icon_002.png" alt="share" />
                            </span>
                            Flag
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={e => {
                              this.likeHandler(e, this.state.singlePost);
                            }}
                          >
                            <span className="btn_icon imageHandle1">
                              <img src="/images/icon_003.png" alt="share" />
                            </span>
                            {this.decider(
                              this.state.singlePost,
                              this.state.userDetails
                            )}
                          </a>
                        </li>
                        <div className="like_count" style={{ marginRight: 10 }}>
                          <span className="lft_cnt" />
                          <span className="mid_cnt">
                            {this.state.singlePost &&
                            this.state.singlePost.likes
                              ? this.state.singlePost.likes.length
                              : 0}
                          </span>
                          <span className="rit_cnt" />
                        </div>

                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="/images/icon_004.png" alt="share" />
                            </span>
                            {this.state.singlePost &&
                            this.state.singlePost.comment
                              ? this.state.singlePost.comment.length
                              : 0}{" "}
                            Comments
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contnt_3">
                <ul>
                  <li>
                    <input
                      type="button"
                      defaultValue="Reply"
                      className="black_btn"
                    />
                    {this.state.singlePost &&
                      this.state.singlePost.comment &&
                      this.state.singlePost.comment.map(com => {
                        return (
                          <li>
                            <div className="list_image">
                              <div className="image_sec">
                                <img src="/images/post_img.png" />
                              </div>
                              <div className="image_name">
                                {com.userDetails.username}
                              </div>
                            </div>
                            <div className="list_info">{com.comment}</div>
                            <input
                              type="button"
                              defaultValue="Reply"
                              className="orng_btn"
                            />
                          </li>
                        );
                      })}
                    <div className="cmnt_div">
                      <input
                        type="text"
                        className="cmnt_bx"
                        onChange={this.commentChange}
                        name="commentValue"
                        value={this.state.commentValue}
                        style={{ color: "black" }}
                      />

                      <input
                        type="submit"
                        className="sub_bttn"
                        defaultValue="Submit Comment"
                        onClick={() => {
                          this.submitComment(this.state.singlePost._id);
                        }}
                      />
                    </div>
                  </li>
                </ul>
                <div className="view_div">
                  <a href="#">View more</a>
                </div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}
