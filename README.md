# **SignToLearn**

## **Table of Contents**
- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## **About The Project**

**SignToLearn** is an AI-powered application designed to recognize American Sign Language (ASL) hand gestures in real-time. The project uses **MediaPipe** for hand tracking and **TensorFlow** for recognizing ASL gestures. This application aims to help users learn ASL in an interactive, engaging way, similar to language-learning apps like Duolingo.

---

## **Built With**

- **[Flask](https://flask.palletsprojects.com/)** - Backend web framework
- **[TensorFlow](https://www.tensorflow.org/)** - Machine learning framework
- **[Keras](https://keras.io/)** - High-level neural networks API
- **[MediaPipe](https://mediapipe.dev/)** - Framework for building multimodal applied ML pipelines
- **[React](https://reactjs.org/)** - JavaScript library for building user interfaces
- **[OpenCV](https://opencv.org/)** - Computer vision library
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client for the browser and Node.js

---

## **Getting Started**

This is an example of how to get the project up and running locally.

### **Prerequisites**

Before setting up the project locally, ensure you have the following installed:

- **npm** (for React setup):
    ```bash
    npm install npm@latest -g
    ```

- **Python** (for Flask backend):
    - Download and install the latest version of Python from [python.org](https://www.python.org/downloads/).

### **Installation**

1. **Clone the repo**:
    ```bash
    git clone https://github.com/JJKSweaty/SignToLearn.git
    cd SignToLearn
    ```

2. **Backend Setup (Flask)**:
    - Navigate to the backend directory:
      ```bash
      cd aslProject-back  <!-- Navigate to the Flask backend directory -->
      ```

    - **Set up a virtual environment**:
      ```bash
      python3 -m venv venv  <!-- Create a virtual environment -->
      ```

    - **Activate the virtual environment**:
        - On Windows:
          ```bash
          .\venv\Scripts\activate  <!-- Activate on Windows -->
          ```
        - On macOS/Linux:
          ```bash
          source venv/bin/activate  <!-- Activate on macOS/Linux -->
          ```

    - **Install backend dependencies**:
      ```bash
      pip install -r requirements.txt  <!-- Install Flask and other dependencies -->
      ```

    - **Start the Flask server**:
      ```bash
      python app.py  <!-- Run the Flask app -->
      ```

3. **Frontend Setup (React)**:
    - Navigate to the frontend directory:
      ```bash
      cd aslProject-front  <!-- Navigate to the React frontend directory -->
      ```

    - **Install frontend dependencies**:
      ```bash
      npm install  <!-- Install React and other dependencies -->
      ```

    - **Start the React development server**:
      ```bash
      npm run dev  <!-- Start the React server -->
      ```

---

## **Usage**

1. **Backend (Flask)**:
   - The backend provides an API endpoint to accept images from the frontend and predict the ASL letter.
   - **Run the Flask server** by using the `python app.py` command. The server will listen for requests from the frontend and respond with predicted ASL gestures.

2. **Frontend (React)**:
   - The frontend captures the webcam feed and sends images to the backend for ASL prediction.
   - The predicted gesture is displayed in real-time on the screen.

3. **Machine Learning Model**:
   - The backend uses a **pre-trained model** to predict the ASL gesture from the webcam feed. 
   - The model processes hand images and returns the corresponding ASL letter.

---

## **Roadmap**

- **Feature 1**: Add support for more ASL signs beyond letters (e.g., numbers, phrases).
- **Feature 2**: Add a leaderboard or progress tracking to encourage learning.
- **Feature 3**: Improve model accuracy and handle different hand positions.

See the [open issues](https://github.com/JJKSweaty/SignToLearn/issues) for a full list of proposed features and known issues.

---


## **Contact**

**Jonathan Jacob Koshy** - johnkoper12@gmail.com  
Project Link: [https://github.com/JJKSweaty/SignToLearn](https://github.com/JJKSweaty/SignToLearn)

---

## **Acknowledgments**

- **MediaPipe**: For hand tracking and landmark detection.
- **TensorFlow/Keras**: For deep learning and model training.
- **Flask**: For backend services.
- **React**: For frontend development.

---

### **How to Add Your Code**

- **Backend (Flask)**: You can place your model files, API routes, and other necessary server-side code in the `aslProject-back` folder. 
- **Frontend (React)**: Insert React components, API requests, and other UI-related code in the `aslProject-front` directory.