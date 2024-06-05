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

    const newMusic = await Music.create(req.body);

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
    const queryObj = { ...req.query };
    const excludeFields = ["page", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    let query = Music.find(JSON.parse(queryStr));
    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const musicCount = await Music.countDocuments();
      if (skip >= musicCount) throw new Error("This Page does not exists");
    }
    const totalMusics = await Music.countDocuments();
    const music = await query;
    res.json({ music, totalMusics });
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
