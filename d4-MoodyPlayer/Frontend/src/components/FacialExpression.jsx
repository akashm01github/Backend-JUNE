import React, { useRef, useState } from 'react'
import * as faceapi from 'face-api.js';
import axios from 'axios';

const FacialExpression = () => {

    const [isRunning, setIsRunning] = useState(false);
    const videoRef = useRef(null);
    const intervalRef = useRef(null);

    //! LOAD MODEL
    const loadModel = async () => {
        const MODEL_URL = './models';

        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ])

        console.log('Model Loaded...')
    }

    //! START VIDEO
    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        })

        videoRef.current.srcObject = stream;

        console.log('Video Started...')
    }

    //! STOP VIDEO
    const stopVideo = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }

    //! DETECT EXPRESSION
    const detectExpression = async () => {
        intervalRef.current = setInterval(async () => {
            if (!videoRef.current) return;

            const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

            if (detection && detection.expressions) {
                const bestExpression = Object.entries(detection.expressions).reduce((a, b) => a[1] > b[1] ? a : b)[0];

                console.log(bestExpression)

                const data = await axios.get(`http://localhost:3000/songs?mood=${bestExpression}`)

                console.log(data)
            }

        }, 500);
    }

    //! TOGGLE
    const toggleDetection = async () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            stopVideo();
            setIsRunning(false);
        } else {
            await loadModel();
            await startVideo();
            detectExpression();
            setIsRunning(true);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-6 p-6">
            <h2 className="text-2xl font-bold text-white">Face Expression Detector</h2>

            <div className="rounded-xl overflow-hidden border border-gray-700 shadow-lg">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    width="500"
                    height="300"
                    className="bg-black"
                />
            </div>

            <button
                onClick={toggleDetection}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
                    isRunning
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                }`}
            >
                {isRunning ? 'Stop' : 'Start'}
            </button>
        </div>
    )
}

export default FacialExpression