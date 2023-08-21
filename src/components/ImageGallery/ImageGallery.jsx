
import PropTypes from "prop-types";
import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { Li } from "./ImageGallery.styled";

function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="gallery">
      {images && images.map((image) => (
        <Li className="gallery-item" key={ image.id } >
          <ImageGalleryItem image={ image } onImageClick={onImageClick} />
        </Li>
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
