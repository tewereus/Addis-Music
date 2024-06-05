// import { useState, useEffect } from "react";
import MusicList from "./MusicList";
// import MusicDetail from "./MusicDetail";

const App = () => {
  // const [albums, setAlbums] = useState([]);
  // const [selectedAlbum, setSelectedAlbum] = useState(null);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/albums")
  //     .then((response) => response.json())
  //     .then((data) => setAlbums(data));
  // }, []);
  // const handleAlbumClick = (album) => {
  //   setSelectedAlbum(album);
  // };
  return (
    <div>
      {/* <h1>Albums</h1>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <h2>{album.title}</h2>
            <p onClick={() => handleAlbumClick(album)}>View Photos</p>
          </li>
        ))}
      </ul>
      {selectedAlbum && (
        <div>
          <h2>{selectedAlbum.title}</h2>
          <ul>
            {selectedAlbum.photos &&
              selectedAlbum.photos.map((photo) => (
                <li key={photo.id}>
                  <img src={photo.thumbnailUrl} alt={photo.title} />
                </li>
              ))}
          </ul>
        </div>
      )} */}
      {/* hello */}
      <MusicList />

      {/* <MusicDetail /> */}
    </div>
  );
};

export default App;
