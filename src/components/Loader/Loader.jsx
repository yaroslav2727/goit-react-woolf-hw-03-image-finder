import { RotatingTriangles } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return <RotatingTriangles wrapperClass={css.loader} />;
};

export default Loader;
