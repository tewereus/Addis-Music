import mongoose from "mongoose"; // Erase if already required

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    artist: {
      type: String,
      // required: true,
    },
    album: {
      type: String,
      // required: true,
    },
    genre: {
      type: String,
      // required: true,
    },
    duration: {
      type: Number,
      // required: true,
    },
    releaseDate: {
      type: Date,
      // required: true,
    },
    coverArt: {
      type: String,
      // required: true,
    },
    audioFile: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Music = mongoose.model("Music", musicSchema);
export default Music;
