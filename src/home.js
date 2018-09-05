import React, { Component } from "react";
import { RightData } from "./rightdata";
import { Timeline } from "./timeline";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeData: []
    };
  }

  componentDidMount() {
    var getData = localStorage.getItem("userdata");
    if (getData === null) {
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
        console.log("<<<<<<backened data for homepage", json);
        this.setState({ homeData: json });
      });
  }

  mostComment = e => {
    e.preventDefault();
    console.log("<<<<clicked most commented");
    var resultComment = this.state.homeData.sort(function(a, b) {
      console.log("<<<<a", a.comment);
      console.log("<<<<<b", b.comment);
      if (a.comment.length < b.comment.length) return 1;
      if (a.comment.length > b.comment) return -1; //-1 swap
      return 0;
    });
    console.log("<<<<<<<result commment", resultComment);
    this.setState({ homeData: resultComment });
    console.log("<<<<<<<homeData value mostComment", this.state.homeData);
  };

  latestPost = e => {
    e.preventDefault();
    console.log("<<<<<clicked latest post");
    var result = this.state.homeData.sort(function(a, b) {
      return Math.abs(new Date(a.date) - new Date(b.date));
    });
    console.log("<<<<<<<result", result);
    this.setState({ homeData: this.state.homeData });
    console.log("<<<<<<<homeData", this.state.homeData);
  };
  oldestPost = e => {
    e.preventDefault();
    console.log("<<<<<clicked oldest post");
    var resultOld = this.state.homeData.sort(function(a, b) {
      console.log("<<<<a.date", a.date);
      console.log("<<<b.date", b.date);
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
    console.log("<<<<<<resultOld", resultOld);
    this.setState({ homeData: resultOld });
    console.log("<<<<<<<homeData", this.state.homeData);
  };
  logOut = e => {
    e.preventDefault();
    console.log("<<<<<<<<clicked");
    localStorage.clear();
    this.props.history.push("/login1");
  };
  imageHandler = h => {
    console.log("<<<<<<clicked the image", h);
    this.props.history.push(`/singlepost/${h._id}`);
  };

  render() {
    console.log("<<<<<<<homedata render", this.state.homeData);
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
            <RightData />
            {/* <RightData
              uploadPost={this.uploadPost}
              uploadCategory={this.uploadCategory}
              getCategoryData={this.getCategoryData}
              categoryData={this.state.categoryData}
              getCategoryWisePost={this.getCategoryWisePost}
              toggle1={this.state.toggle1}
            /> */}
            {/* <div className="content_rgt">
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a href="#">Upload Post</a>{" "}
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
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
                          <img src="images/icon_01.png" alt="up" />
                        </span>{" "}
                        CATS
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="images/icon_02.png" alt="up" />
                        </span>{" "}
                        Dogs
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="images/icon_03.png" alt="up" />
                        </span>{" "}
                        Birds
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="images/icon_04.png" alt="up" />
                        </span>{" "}
                        Rabbit
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="images/icon_05.png" alt="up" />
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
                  {this.state.homeData.map((h, i) => {
                    console.log("<<<<<<<<h", h.category);
                    return (
                      <div className="feat_sec">
                        <div className="feat_sec_img">
                          <img src="images/feat_img1.png" alt="image" />
                        </div>
                        <div className="feat_txt">Lorem Ipusum Text</div>
                        <div className="btm_rgt">
                          <div className="btm_arc">Cat</div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img2.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img3.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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
                <div className="post_div">
                  <div className="post_list">
                    <ul>
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
                  <div className="post_txt">4 New Post Updates</div>
                </div>
              </div>
              <div className="contnt_2">
                {this.state.homeData.map((home, i) => {
                  console.log("<<<<<<<<<home", home);
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
                  var a = new Date(home.date);
                  var d = a.getDate();
                  var m = monthNames[a.getMonth()];
                  var y = a.getFullYear();
                  var h = a.getHours();
                  console.log("<<<<<<<<h", h);
                  var result = "";

                  if (h > 12) {
                    result = "pm";
                  } else {
                    result = "am";
                  }
                  var m1 = a.getMinutes();
                  console.log("<<<<<<<<<<home", home);
                  var countComments = home.comment.length;
                  var countLikes = home.likes.length;
                  console.log("<<<<<<<<<countComments", countComments);
                  console.log("<<<<<<<<countLikes", countLikes);
                  return (
                    <div className="div_a">
                      <div className="div_title">
                        User Interface PSD Source files Web Designing for web
                      </div>
                      <div className="btm_rgt">
                        <div className="btm_arc">{home.category}</div>
                      </div>
                      <div className="div_top">
                        <div className="div_top_lft">
                          <img src="images/img_6.png" />
                          {this.state.homeData[i].userName}
                        </div>
                        <div className="div_top_rgt">
                          <span className="span_date">
                            {d + " " + m + " " + y}
                          </span>
                          <span className="span_time">
                            {h + ":" + m1 + result}
                          </span>
                        </div>
                      </div>
                      <div className="div_image">
                        <img
                          src={`http://localhost:5000/${home.image}`}
                          alt="pet"
                          onClick={() => {
                            this.imageHandler(home);
                          }}
                        />
                      </div>
                      <div className="div_btm">
                        <div className="btm_list">
                          <ul>
                            <li>
                              <a href="#">
                                <span className="btn_icon">
                                  <img src="images/icon_001.png" alt="share" />
                                </span>
                                Share
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="btn_icon">
                                  <img src="images/icon_002.png" alt="share" />
                                </span>
                                Flag
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="btn_icon">
                                  <img src="images/icon_004.png" alt="share" />
                                </span>
                                {countComments} Comments
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span className="btn_icon">
                                  <img src="images/icon_003.png" alt="share" />
                                </span>
                                Likes
                              </a>
                            </li>

                            <div
                              className="like_count"
                              style={{ marginRight: 10 }}
                            >
                              <span className="lft_cnt" />
                              <span className="mid_cnt">{countLikes}</span>
                              <span className="rit_cnt" />
                            </div>
                            {/* <li>
                              <a href="#">
                                <span className="btn_icon">
                                  <img src="images/icon_003.png" alt="share" />
                                </span>
                                Unlike
                              </a>
                            </li> */}
                            {/* <div className="like_count">
                              <span className="lft_cnt" />
                              <span className="mid_cnt">4</span>
                              <span className="rit_cnt" />
                            </div> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">
                    User Interface PSD Source files Web Designing for web
                  </div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div> */}
              {/* <div className="div_top">
                    <div className="div_top_lft">
                      <img src="images/img_6.png" />
                      Steave Waugh
                    </div>
                    <div className="div_top_rgt">
                      <span className="span_date">02 Jan 2014</span>
                      <span className="span_time">11:15am</span>
                    </div>
                  </div>
                  <div className="div_image">
                    <img src="images/lft_img1.png" alt="pet" />
                  </div> */}
              {/* <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="images/icon_001.png" alt="share" />
                            </span>
                            Share
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="images/icon_002.png" alt="share" />
                            </span>
                            Flag
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="images/icon_004.png" alt="share" />
                            </span>
                            4 Comments
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="images/icon_003.png" alt="share" />
                            </span>
                            Likes
                          </a>
                        </li>
                        <div className="like_count" style={{ marginRight: 10 }}>
                          <span className="lft_cnt" />
                          <span className="mid_cnt">10</span>
                          <span className="rit_cnt" />
                        </div>
                        <li>
                          <a href="#">
                            <span className="btn_icon">
                              <img src="images/icon_003.png" alt="share" />
                            </span>
                            Unlike
                          </a>
                        </li>
                        <div className="like_count">
                          <span className="lft_cnt" />
                          <span className="mid_cnt">4</span>
                          <span className="rit_cnt" />
                        </div>
                      </ul>
                    </div>
                  </div> */}
              {/* </div>
              </div> */}
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}
