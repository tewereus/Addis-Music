import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMusics, addMusic, deleteMusic } from "./features/musicSlice";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import Modal from "react-modal";

const MusicList = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [musicState, setMusicState] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    coverArt: "/smash-cut-audio-cover.png",
    audioFile: "",
    url: "",
    updateId: "",
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const { music, totalMusics } = useSelector((state) => state.music);

  useEffect(() => {
    const obj = { page, limit };
    dispatch(getAllMusics(obj));
  }, [page, limit]);

  const handleButton = () => {
    setIsOpen(true);
  };

  const handleDeleteMusic = async (id) => {
    console.log(music);
    dispatch(deleteMusic(id))
      .then(() => {
        console.log("deleted");
        const obj = {
          page,
          limit,
        };
        dispatch(getAllMusics(obj));
      })
      .catch((error) => {
        console.log("error deleting");
      });
  };

  const handleEdit = (id) => {
    // Fetch the music details from the backend
    axios
      .get(
        `https://addis-music-66rj.onrender.com/api/v1/music/music-detail/${id}`
      )
      .then((response) => {
        const musicDetails = response.data;
        // Open the modal with the music details pre-filled
        setModalEdit(true);
        setMusicState({
          title: musicDetails.title,
          artist: musicDetails.artist,
          album: musicDetails.album,
          genre: musicDetails.genre,
          coverArt: musicDetails.coverArt,
          audioFile: musicDetails.audioFile,
          updateId: id,
        });
      })
      .catch((error) => {
        console.error("Error fetching music details:", error);
      });
    console.log(musicState);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: musicState.title,
        artist: musicState.artist,
        album: musicState.album,
        genre: musicState.genre,
        coverArt: musicState.coverArt,
        audioFile: musicState.audioFile,
      };

      const response = await axios
        .put(
          `https://addis-music-66rj.onrender.com/api/v1/music/music-detail/update-music/${musicState.updateId}`,
          data
        )
        .then(() => {
          const obj = {
            page,
            limit,
          };
          dispatch(getAllMusics(obj));
          setModalEdit(false);
          setMusicState({
            title: "",
            artist: "",
            album: "",
            genre: "",
            duration: 0,
            coverArt: "/smash-cut-audio-cover.png",
            audioFile: "",
            updateId: "",
          });
        })
        .catch((error) => {
          console.log("unsuccessful edit");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setModalEdit(false);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: musicState.title,
        artist: musicState.artist,
        album: musicState.album,
        genre: musicState.genre,
        coverArt: musicState.coverArt,
        audioFile: musicState.audioFile,
      };

      dispatch(addMusic(data))
        .then(() => {
          const obj = {
            page,
            limit,
          };
          console.log("music added successfully");
          dispatch(getAllMusics(obj));
        })
        .catch((error) => {
          console.error("Error Adding music:", error);
        });

      setIsOpen(false);
      setMusicState({
        title: "",
        artist: "",
        album: "",
        genre: "",
        duration: 0,
        coverArt: "/smash-cut-audio-cover.png",
        audioFile: "",
        updateId: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredMusic = music.filter((mus) => {
    const title = mus.title || ""; // If title is undefined, use an empty string
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div
      style={{
        backgroundColor: "#333",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#999",
          width: "50%",
          minHeight: "80vh",
          marginTop: "5%",
          padding: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "10px",
            borderRadius: "20px",
            outline: "none",
            border: "none",
            margin: "20px",
            marginTop: "20px",
            width: "70%",
          }}
        />
        <button
          onClick={handleButton}
          style={{ backgroundColor: "#008800", color: "#ffffff" }}
        >
          add music
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModalClose}
          contentLabel="Add Music"
        >
          <h2>Add Music</h2>
          <form>
            <label>
              Title:
              <input
                type="text"
                value={musicState.title}
                onChange={(e) =>
                  setMusicState({ ...musicState, title: e.target.value })
                }
              />
            </label>
            <label>
              Artist:
              <input
                type="text"
                value={musicState.artist}
                onChange={(e) =>
                  setMusicState({ ...musicState, artist: e.target.value })
                }
              />
            </label>
            <label>
              Album:
              <input
                type="text"
                value={musicState.album}
                onChange={(e) =>
                  setMusicState({ ...musicState, album: e.target.value })
                }
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                value={musicState.genre}
                onChange={(e) =>
                  setMusicState({ ...musicState, genre: e.target.value })
                }
              />
            </label>
            <label>
              Duration:
              <input
                type="number"
                value={musicState.duration}
                onChange={(e) =>
                  setMusicState({
                    ...musicState,
                    duration: parseInt(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Audio File:
              <input
                type="file"
                onChange={(e) =>
                  setMusicState({ ...musicState, audioFile: e.target.files[0] })
                }
              />
            </label>
            <button onClick={handleModalSubmit}>Add Music</button>
          </form>
        </Modal>
        <Modal
          isOpen={modalEdit}
          onRequestClose={handleModalClose}
          contentLabel="Edit Music"
        >
          <h2>Edit Music</h2>
          <form>
            <label>
              Title:
              <input
                type="text"
                value={musicState.title}
                onChange={(e) =>
                  setMusicState({ ...musicState, title: e.target.value })
                }
              />
            </label>
            <label>
              Artist:
              <input
                type="text"
                value={musicState.artist}
                onChange={(e) =>
                  setMusicState({ ...musicState, artist: e.target.value })
                }
              />
            </label>
            <label>
              Album:
              <input
                type="text"
                value={musicState.album}
                onChange={(e) =>
                  setMusicState({ ...musicState, album: e.target.value })
                }
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                value={musicState.genre}
                onChange={(e) =>
                  setMusicState({ ...musicState, genre: e.target.value })
                }
              />
            </label>
            <label>
              Duration:
              <input
                type="number"
                value={musicState.duration}
                onChange={(e) =>
                  setMusicState({
                    ...musicState,
                    duration: parseInt(e.target.value),
                  })
                }
              />
            </label>
            <label>
              Audio File:
              <input
                type="file"
                onChange={(e) =>
                  setMusicState({ ...musicState, audioFile: e.target.files[0] })
                }
              />
            </label>
            <button onClick={handleEditSubmit}>Edit Music</button>
          </form>
        </Modal>
        <h3>Songs</h3>
        {filteredMusic.map((mus, i) => {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "5px",
                  borderBottom: "1px solid black",
                  marginTop: "10px",
                }}
              >
                <div
                  key={mus._id}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    height: "50px",
                  }}
                >
                  <img
                    src={`../public/${mus.coverArt}`}
                    alt=""
                    style={{ borderRadius: "50%", marginRight: "20px" }}
                    width="50"
                    height="50"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>{mus.title}</span>
                    <span style={{ fontSize: "15px" }}>
                      artist: {mus.artist}
                    </span>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleEdit(mus._id);
                    }}
                    style={{
                      backgroundColor: "#999",
                      color: "#0d0",
                      fontSize: "28px",
                      width: "70px",

                      padding: "0",
                    }}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteMusic(mus._id);
                    }}
                    style={{
                      backgroundColor: "#999",
                      color: "#c00",
                      width: "70px",

                      fontSize: "28px",
                      padding: "0",
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            </>
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              backgroundColor: "#ddd",
              marginRight: "10px",
            }}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span
            style={{
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            Page {page} of {Math.ceil(totalMusics / limit)}
          </span>
          <button
            style={{
              backgroundColor: "#ddd",
            }}
            onClick={() => setPage(page + 1)}
            disabled={page === Math.ceil(totalMusics / limit)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicList;
