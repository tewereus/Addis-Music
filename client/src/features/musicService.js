import { base_url } from "../api/axiosConfig";
import axios from "axios";

const getAllMusics = async () => {
  const response = await axios.get(`${base_url}/music/get-musics`);
  return response.data;
};

const addMusic = async (data) => {
  const response = axios.post(`${base_url}/music/add-music`, data);
  return response.data;
};

const getMusic = async (id) => {
  const response = axios.get(`${base_url}/music/music-detail/${id}`);
  return response.data;
};

const updateMusic = async (id) => {
  const response = axios.get(
    `${base_url}/music/music-detail/update-music/${id}`
  );
  return response.data;
};

const deleteMusic = async (id) => {
  const response = axios.get(`${base_url}/music/delete-detail/${id}`);
  return response.data;
};

const deleteAllMusic = async () => {
  const response = axios.get(`${base_url}/music/delete-all`);
  return response.data;
};

export {
  getAllMusics,
  addMusic,
  getMusic,
  updateMusic,
  deleteMusic,
  deleteAllMusic,
};
