import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const CameraFeed = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    sendImageToBackend(imageSrc);
  };

  const sendImageToBackend = async (imageSrc) => {
    try {
      const formData = new FormData();
      const imageBlob = await fetch(imageSrc).then(res => res.blob());
      formData.append('image', imageBlob);

      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPrediction(response.data.letter || 'No prediction');
    } catch (error) {
      console.error('Error sending image:', error);
      setPrediction('Error occurred');
    }
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{
          facingMode: 'user',
        }}
      />
      <button onClick={capture}>Capture</button>
      {image && <img src={image} alt="Captured" />}
      <div>{prediction && <p>Prediction: {prediction}</p>}</div>
    </div>
  );
};

export default CameraFeed;
