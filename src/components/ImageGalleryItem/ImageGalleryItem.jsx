
import PropTypes from "prop-types";
import React from "react";
import { Li } from "./ImageGalleryItem.styled";

function ImageGalleryItem({ image, onImageClick }) {
  return (
    <Li className="gallery-item">
      <img
        src={ image.webformatURL }
        alt={ image.tags }
        onClick={() => onImageClick(image.largeImageURL )}
      />
    </Li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
