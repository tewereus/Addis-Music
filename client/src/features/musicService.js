import { base_url } from "../api/axiosConfig";
import axios from "axios";

const getAllMusics = async ({ page, limit }) => {
  const response = await axios.get(
    `${base_url}/music/get-musics?page=${page}&limit=${limit}`
  );

  console.log(response.data);
  return response.data;
};

const addMusic = async (data) => {
  const response = await axios.post(`${base_url}/music/add-music`, data);
  return response.data;
};

const getMusic = async (id) => {
  const response = await axios.get(`${base_url}/music/music-detail/${id}`);
  return response.data;
};

const updateMusic = async (data) => {
  const response = await axios.put(
    `${base_url}/music/music-detail/update-music/${data.id}`,
    data.data
  );
  return response.data;
};

const deleteMusic = async (id) => {
  const response = await axios.delete(`${base_url}/music/delete-music/${id}`);
  return response.data;
};

const deleteAllMusic = async () => {
  const response = await axios.delete(`${base_url}/music/delete-all`);
  return response.data;
};

const userService = {
  getAllMusics,
  addMusic,
  getMusic,
  updateMusic,
  deleteMusic,
  deleteAllMusic,
};

export default userService;
