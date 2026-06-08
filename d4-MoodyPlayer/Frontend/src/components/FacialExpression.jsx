import React, { useRef, useState } from 'react'
import * as faceapi from 'face-api.js';


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

    loadModel();



    //! START VIDEO

    const startVideo = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        })

        videoRef.current.srcObject = stream;

        console.log('Video Started...')
    }

    startVideo();


    //! DETECT EXPRESSION
    const detectExpression = async () => {
        intervalRef.current = setInterval(async () => {
            if (!videoRef.current) return;

            const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

            if(detection && detection.expressions){
                const bestExpression = Object.entries(detection.expressions).reduce((a,b)=>a[1]>b[1] ?a:b)[0];

                console.log(bestExpression)
            }


        }, 500);
    }


    detectExpression();



    //! STOP ALL

    //! TOGGLE


    return (
        <div className="container">
            <h2>Face Expression Detector</h2>
            <div>
                <video ref={videoRef} autoPlay muted width='500px' height='300px' src="" />
            </div>
        </div>
    )
}

export default FacialExpression