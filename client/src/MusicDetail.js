import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMusic, updateMusic } from "./musicSlice";

const MusicDetail = ({ match }) => {
  const dispatch = useDispatch();
  const { music, isLoading, isError, message } = useSelector(
    (state) => state.music
  );

  useEffect(() => {
    dispatch(getMusic(match.params.id));
  }, [dispatch, match.params.id]);

  const handleUpdateMusic = () => {
    dispatch(updateMusic(match.params.id));
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {message}</div>
      ) : (
        <div>
          <h1>{music.title}</h1>
          <p>Artist: {music.artist}</p>
          <p>Album: {music.album}</p>
          <p>Genre: {music.genre}</p>
          <p>Duration: {music.duration}</p>
          <p>Release Date: {music.releaseDate}</p>
          <p>Cover Art: {music.coverArt}</p>
          <p>Audio File: {music.audioFile}</p>
          <button onClick={handleUpdateMusic}>Update</button>
        </div>
      )}
    </div>
  );
};

export default MusicDetail;
