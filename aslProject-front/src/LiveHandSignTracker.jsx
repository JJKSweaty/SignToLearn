import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const LiveHandSignTracker = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [predictedLetter, setPredictedLetter] = useState('');

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000');

    socket.on('connect', () => {
      console.log("✅ Connected to WebSocket!");
    });

    socket.on('video_stream', (data) => {
      if (data.image) {
        setImageSrc(`data:image/jpeg;base64,${data.image}`);
      }
      if (data.letter) {
        setPredictedLetter(data.letter);
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h1>Live ASL Hand Tracking</h1>
      {imageSrc ? (
        <img src={imageSrc} alt="Live Feed" width="640px" />
      ) : (
        <p>Waiting for video...</p>
      )}
      <h2>Predicted Letter: {predictedLetter}</h2>
    </div>
  );
};

export default LiveHandSignTracker;
