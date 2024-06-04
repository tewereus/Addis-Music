import asyncHandler from "express-async-handler";
import Music from "../models/musicModel.js";

const addMusic = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      artist,
      album,
      genre,
      duration,
      releaseDate,
      coverArt,
      audioFile,
    } = req.body;

    const newMusic = await Music.create({
      title,
      artist,
      album,
      genre,
      duration,
      releaseDate,
      coverArt,
      audioFile,
    });

    res.status(201).json(newMusic);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getMusic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const music = await Music.findById(id);
    res.status(201).json(music);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllMusics = asyncHandler(async (req, res) => {
  try {
    const musics = await Music.find();
    res.status(201).json(musics);
  } catch (error) {
    throw new Error(error);
  }
});

const updateMusic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMusic = await Music.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updatedMusic);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteMusic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const music = await Music.findByIdAndDelete(id);
    res.status(201).json(music);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllMusic = asyncHandler(async (req, res) => {
  try {
    const music = await Music.deleteMany();
    res.status(201).json(music);
  } catch (error) {
    throw new Error(error);
  }
});

export {
  addMusic,
  getAllMusics,
  getMusic,
  deleteMusic,
  deleteAllMusic,
  updateMusic,
};
