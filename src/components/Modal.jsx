import React, { useEffect, useState } from "react";
import YouTubePlayer from "react-player/youtube";
import { API_KEY, ENDPOINT } from "../constants";
import "../styles/modal.scss";

const Modal = ({ movieId, isModalOpen, onClose }) => {
  const [videoKey, setVideoKey] = useState("");
  const videoUrl = `https://www.youtube.com/watch?v=${videoKey}`;

  useEffect(() => {
    const getTrailer = async () => {
      const URL = `${ENDPOINT}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;
      const videoData = await fetch(URL).then((response) => response.json());
      if (videoData.videos && videoData.videos.results.length) {
        const trailer = videoData.videos.results.find(
          (vid) => vid.type === "Trailer"
        );
        setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
      }
    };
    getTrailer();
  }, [movieId, isModalOpen]);

  return (
    <div className='modal'>
      <div className='modalContainer'>
        <button className='modalCloseButton' onClick={onClose} />
        {videoKey ? (
          <YouTubePlayer
            width='100%'
            height='100%'
            playing={true}
            url={videoUrl}
          />
        ) : (
          <div className='noTrailerContainer'>
            <h5 className='noTrailer'>
              Sorry, there is no trailers to show for this movie
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
