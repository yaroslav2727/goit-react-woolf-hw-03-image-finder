import css from "./LoadButton.module.css";

export const LoadButton = ({ onClick }) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadButton;
