import { base_url } from "../api/axiosConfig";
import axios from "axios";

const getAllMusics = async () => {
  const response = await axios.get(`${base_url}/music/get-musics`);
  return response.data;
};

export { getAllMusics };
