import React, { Component } from "react";
import { UploadCategory } from "./uploadCategory";
export class RightData extends Component {
  render() {
    return (
      <div className="content_rgt">
        <div className="rght_btn">
          {" "}
          <span className="rght_btn_icon">
            <img src="images/btn_iconb.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
            <img src="images/btn_sep.png" alt="sep" />
          </span>{" "}
          <a onClick={this.props.uploadPost} href="#">
            Upload Post
          </a>{" "}
        </div>
        <div className="rght_btn">
          {" "}
          <span className="rght_btn_icon">
            <img src="images/btn_icona.png" alt="up" />
          </span>{" "}
          <span className="btn_sep">
            <img src="images/btn_sep.png" alt="sep" />
          </span>{" "}
          <a onClick={this.props.uploadCategory} href="#">
            Add Category
          </a>{" "}
        </div>

        <div className="rght_cate">
          {}
          {this.props.toggle1 ? (
            <UploadCategory
              func={this.props.uploadCategory}
              getCategoryData={this.props.getCategoryData}
            />
          ) : (
            ""
          )}
          <div className="rght_cate_hd" id="rght_cat_bg">
            Categories
          </div>
          {this.props.categoryData &&
            this.props.categoryData.map((cat, i) => {
              console.log("<<<<<<<cat", cat);
              return (
                <div key={i} className="rght_list">
                  <ul>
                    <li>
                      <a
                        href="#"
                        onClick={() => {
                          this.props.getCategoryWisePost(cat);
                        }}
                      >
                        <span className="list_icon">
                          <img
                            className="imgcss"
                            src={`http://localhost:5000/${cat.image}`}
                            alt="up"
                          />
                        </span>{" "}
                        {cat.category}
                      </a>
                    </li>
                  </ul>
                </div>
              );
            })}
        </div>
        <div className="rght_cate">
          <div className="rght_cate_hd" id="opn_cat_bg">
            Featured
          </div>
          <div className="sub_dwn">
            <div className="feat_sec">
              <div className="feat_sec_img">
                <img src="images/feat_img1.png" alt="image" />
              </div>
              <div className="feat_txt">Lorem Ipusum Text</div>
            </div>
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
      </div>
    );
  }
}
