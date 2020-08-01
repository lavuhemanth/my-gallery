import React from "react";
import ImgObject from "../assets/images";

import { Heart } from "react-bootstrap-icons";

function getTime(date) {
  const newDate = new Date();
  const oldDate = new Date(date);

  const diffTime = Math.abs(newDate.getTime() - oldDate.getTime());

  const days = Math.ceil(diffTime / (1000 * 3600 * 24));

  return days > 0 ? days + "'day" : diffTime + "'sec";
}
const ImageCard = ({
  id,
  imgSrc,
  name,
  title,
  text,
  type,
  updateTime,
  likeCount,
  onClickLike,
}) => {
  // console.log(imgSrc, name, title, text, updateTime, likeCount);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
      <img src={ImgObject[imgSrc]} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title mb-0">{name}</h5>
        <small className="theme-color">{type.toUpperCase()}</small>
        <p className="card-text mt-3">{text.substr(0, 95) + "..."}</p>
        <p className="card-text">
          <small className="text-muted">
            Last update {getTime(updateTime)} ago
          </small>
        </p>
      </div>
      <div
        className="card-footer text-muted cursor"
        onClick={() => onClickLike(id)}
      >
        <span>
          <Heart className="like-icon theme-color" />
        </span>{" "}
        <span>{likeCount}</span>
      </div>
    </div>
  );
};

export default ImageCard;
