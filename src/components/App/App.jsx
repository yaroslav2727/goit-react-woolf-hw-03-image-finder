import { Component } from "react";
import { toast, Toaster } from "react-hot-toast";

import SearchBar from "components/SearchBar/SearchBar.jsx";
import ImageGallery from "components/ImageGallery/ImageGallery.jsx";
import ErrorMessage from "components/ErrorMessage/ErrorMessage.jsx";
import LoadButton from "components/LoadButton/LoadButton.jsx";
import Loader from "components/Loader/Loader.jsx";
import ImageModal from "components/ImageModal/ImageModal.jsx";
import { fetchImages, IMAGES_PER_PAGE } from "api/pixabayAPI";

class App extends Component {
  state = {
    query: "",
    page: 1,
    images: [],
    loading: false,
    error: false,
    modalIsOpen: false,
    dataForModal: null,
    showLoadButton: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      try {
        this.setState({ loading: true, error: false });
        const data = await fetchImages({ query, page });
        if (data?.hits?.length === 0) {
          toast.error("No images found...");
          console.log("No imgaes found...");
          return;
        }
        const normalizedArray = array =>
          array.map(({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          }));
        this.setState(prev => ({
          images: [...prev.images, ...normalizedArray(data.hits)],
          showLoadButton: page < Math.ceil(data.totalHits / IMAGES_PER_PAGE),
        }));
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query, page: 1, images: [], showLoadButton: false });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = dataForModal => {
    this.setState({ dataForModal, modalIsOpen: true });
    document.body.style.overflow = "hidden";
  };

  closeModal = () => {
    this.setState({ dataForModal: "", modalIsOpen: false });
    document.body.style.overflow = "auto";
  };

  render() {
    const { handleSubmit, openModal, handleLoadMore, closeModal } = this;
    const { error, images, modalIsOpen, dataForModal, loading, showLoadButton } = this.state;
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <SearchBar onSubmit={handleSubmit} />
        {images.length > 0 && !error && <ImageGallery images={images} onImageClick={openModal} />}

        {error && <ErrorMessage message="An error has occured, please try reloading the page..." />}
        {showLoadButton && <LoadButton onClick={handleLoadMore} />}
        {modalIsOpen && (
          <ImageModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            dataForModal={dataForModal}
          />
        )}
        {loading && <Loader />}
      </>
    );
  }
}

export default App;
