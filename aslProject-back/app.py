import cv2
import mediapipe as mp
import numpy as np
import tensorflow as tf
import base64
from flask import Flask
from flask_socketio import SocketIO, emit

#  Initialize Flask & WebSocket
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

#  Load ASL Model 
print("🔥 Loading ASL Model...")
model = tf.keras.models.load_model('final_asl_model_.keras')
print(" ASL Model Loaded Successfully!")

#  Initialize MediaPipe Hands
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

#  ASL Labels (A-Z)
labels_dict = {i: chr(65 + i) for i in range(26)}

#  Open Webcam
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
cap.set(3, 1280)  # Set width
cap.set(4, 720)   # Set height

if not cap.isOpened():
    print("ERROR: Could not open webcam!")
    exit()
else:
    print("Webcam Successfully Opened")

def process_frame():
    """Captures webcam frames, detects hand signs, and sends predictions to React."""
    while True:
        success, frame = cap.read()
        if not success:
            print(" ERROR: Frame capture failed")
            continue

        # Convert BGR to RGB for MediaPipe
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(frame_rgb)

        predicted_character = "No Hand Detected"

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                
                mp_drawing.draw_landmarks(
                    frame, hand_landmarks, mp_hands.HAND_CONNECTIONS,
                    mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=2, circle_radius=3),  # Red landmarks
                    mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2)   # Green connections
                )

           
            x_ = [landmark.x for landmark in hand_landmarks.landmark]
            y_ = [landmark.y for landmark in hand_landmarks.landmark]

            x_min, y_min = int(min(x_) * frame.shape[1]), int(min(y_) * frame.shape[0])
            x_max, y_max = int(max(x_) * frame.shape[1]), int(max(y_) * frame.shape[0])

            # Ensure valid crop dimensions
            x_min, y_min = max(0, x_min), max(0, y_min)
            x_max, y_max = min(frame.shape[1], x_max), min(frame.shape[0], y_max)

           
            hand_img = frame[y_min:y_max, x_min:x_max]

            if hand_img.size == 0:
                print(" ERROR: Hand crop failed")
            else:
                # Resize to model input size (64x64)
                hand_img = cv2.resize(hand_img, (64, 64))
                hand_img = cv2.cvtColor(hand_img, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
                hand_img = hand_img / 255.0  # Normalize pixel values

                # Reshape to match model input shape (1, 64, 64, 1)
                input_image = np.expand_dims(hand_img, axis=(0, -1))

                # Make ASL Letter Prediction
                try:
                    prediction = model.predict(input_image)
                    predicted_class = np.argmax(prediction, axis=1)[0]
                    predicted_character = labels_dict[predicted_class]
                except Exception as e:
                    print(" Prediction Error:", str(e))
                    predicted_character = "Error"

        #  Convert Frame to Base64 for Streaming
        _, buffer = cv2.imencode('.jpg', frame)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')

        #  Send Processed Frame & ASL Prediction to React
        socketio.emit('video_stream', {'image': frame_base64, 'letter': predicted_character})

      

@socketio.on('connect')
def handle_connect():
    print(" React Client Connected!")

# Start Frame Processing in a Separate Thread
import threading
thread = threading.Thread(target=process_frame)
thread.daemon = True
thread.start()

if __name__ == "__main__":
    print("🔥 ASL Flask Server is Starting...")
    socketio.run(app, host="0.0.0.0", port=5000, allow_unsafe_werkzeug=True)
