import axios from "axios";

const API_KEY = "40892819-7576baf715197fa05f261aab0";
const BASE_URL = "https://pixabay.com/api/";
export const IMAGES_PER_PAGE = 12;

export const fetchImages = async ({ query, page }) => {
  const resp = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: IMAGES_PER_PAGE,
      image_type: "photo",
      orientation: "horizontal",
    },
  });
  return resp.data;
};
