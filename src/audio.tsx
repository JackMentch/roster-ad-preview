import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './audio.css';

interface AudioPlayerProps {
  src: string; // URL to your MP3 file
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (audioRef.current) {
        
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    // Called when the audio has finished playing
    setIsPlaying(false);
  };

  const playButtonStyle = {
    border: '2px solid #333',
    borderRadius: '50%',
    backgroundColor: '#fff',
    cursor: 'pointer',
    width: '60px',
    height: '60px',
    paddingLeft: '5px',
  };

  const pauseButtonStyle = {
    border: '2px solid #333',
    borderRadius: '50%',
    padding: '0px',
    backgroundColor: '#ccc', // Different background color for the pause button
    cursor: 'pointer',
    width: '60px',
    height: '60px',
  };

  return (
    <div className='audio'>
      <audio ref={audioRef} src={process.env.PUBLIC_URL + '/' + src} onEnded={handleAudioEnded} />
      <button
        onClick={handlePlayPause}
        style={isPlaying ? pauseButtonStyle : playButtonStyle}
      >
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          color="#333"
        />
      </button>
    </div>
  );
};

export default AudioPlayer;
