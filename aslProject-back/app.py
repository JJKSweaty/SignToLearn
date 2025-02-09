from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import cv2
import numpy as np
import io
from PIL import Image

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to allow requests from React
CORS(app)

# Load the pre-trained ASL model (replace with your model path)
model = tf.keras.models.load_model('models/asl_model.h5')

# Predict function
def predict_image(image_bytes):
    # Convert the byte data to an OpenCV image
    image = Image.open(io.BytesIO(image_bytes))
    img = np.array(image)

    # Preprocess image
    img_resized = cv2.resize(img, (64, 64))  # Resize to 64x64 pixels
    img_gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
    img_normalized = img_gray / 255.0  # Normalize pixel values to [0, 1]
    img_input = np.expand_dims(img_normalized, axis=-1)  # Add channel dimension (64, 64, 1)
    img_input = np.expand_dims(img_input, axis=0)  # Add batch dimension (1, 64, 64, 1)

    # Make prediction
    prediction = model.predict(img_input)
    predicted_class = np.argmax(prediction, axis=1)[0]  # Get the predicted class index
    predicted_letter = chr(predicted_class + 65)  # Convert index to ASCII letter (65 is 'A')

    return predicted_letter

# Route to receive image and predict ASL letter
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get image data from the request
        file = request.files['image']
        image_bytes = file.read()

        # Make prediction
        predicted_letter = predict_image(image_bytes)

        # Return the predicted letter
        return jsonify({'letter': predicted_letter})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
