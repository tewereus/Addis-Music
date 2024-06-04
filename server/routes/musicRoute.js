import express from "express";
import {
  addMusic,
  getAllMusics,
  getMusic,
  deleteMusic,
  deleteAllMusic,
  updateMusic,
} from "../controller/musicCtrl.js";
const router = express.Router();

router.post("/add-music", addMusic);
router.get("/get-musics", getAllMusics);
router.get("/music-detail/:id", getMusic);
router.delete("/music-detail/delete-music/:id", deleteMusic);
router.put("/music-detail/update-music/:id", updateMusic);
router.delete("/delete-all", deleteAllMusic);

export default router;
