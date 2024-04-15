import Modal from "react-modal";

import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onRequestClose, dataForModal: { src, alt } }) => {
  return (
    <Modal
      className={css.modal}
      contentLabel="image modal"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={css.overlay}
    >
      <img src={src} alt={alt} />
    </Modal>
  );
};

export default ImageModal;
