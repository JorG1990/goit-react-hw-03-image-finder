
import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "../Searchbar/Searchbar";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import MyLoader from "../Loader/Loader";
import { GalleryContainer, SearchbarContainer,ButtonContainer } from "./App.styled";

const keyApi = "38957997-b8acc7a81f773178d46be80fd";

function App() {
  const [ images, setImages ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ showMoreButton, setShowMoreButton ] = useState(false);

  useEffect(() => {
    const fetchImages = () => {
      if (!searchQuery.trim()) {
        setImages([]);
        setShowMoreButton(false);
        return;
      }

      const url = `https://pixabay.com/api/?key=${keyApi}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

      setIsLoading(true);
      axios
        .get(url)
        .then((response) => {
          const { hits } = response.data;
          setImages((prevImages) => [...prevImages, ...hits]);
          setIsLoading(false);
          setShowMoreButton(hits.length === 12);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    };

    fetchImages();
  }, [searchQuery, page]);

  const openModal = (imageurl) => {
    setShowModal(true);
    setSelectedImage(imageurl);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  }

  const handleSearchbarSubmit = (query) => {
    if (!query.trim()) {
      setSearchQuery("");
      return;
    }

    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setShowMoreButton(false);
  };

  return (
    <>
      <SearchbarContainer>
        <Searchbar onSubmit={handleSearchbarSubmit} />
      </SearchbarContainer>
      <GalleryContainer>
        {images.map((image, index) => (
          <ImageGalleryItem key={ image.id + "_" + index } image={ image } onImageClick={ openModal } />
        ))}
        { isLoading ? <MyLoader /> : <ImageGallery images={images} onImageClick={openModal} /> }
        { showModal && <Modal imageUrl={ selectedImage } closeModal={ closeModal } /> }
      </GalleryContainer>
      { showMoreButton && (
        <ButtonContainer>
          <Button onClick={() => setPage(page + 1)} disabled={isLoading} showMoreButton={true} />
        </ButtonContainer>
      )}
    </>
  );
}

export default App;
