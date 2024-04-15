import css from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ image: { largeImageURL, webformatURL, tags }, onImageClick }) => {
  const handleImageClick = () => {
    onImageClick({ src: largeImageURL, alt: tags });
  };

  return (
    <div className={css.item}>
      <img src={webformatURL} alt={tags} onClick={handleImageClick} />
    </div>
  );
};

export default ImageGalleryItem;
