import { useRef, useState } from 'react';
import './facialExpression.css';
import * as faceapi from 'face-api.js';

const FacialExpression = () => {
  const [isRunnning, setIsRunnning] = useState(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  //! LOADMODEL ✅

  const loadModel = async () => {
    const MODEL_URL = '/models'
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ])

    console.log('Model Loded....')

  }


  //! START CAMERA
  const startCemara = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    })

    videoRef.current.srcObject = stream;
  }





  //! FACE DETECT

  const detectFacialExpression = async () => {
    intervalRef.current = setInterval(async () => {
      if (!videoRef.current) return;
      const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

      if (detection && detection.expressions) {
        const expression = Object.entries(detection.expressions).reduce((a, b) => a[1] > b[1] ? a : b)[0]
        console.log(expression)
      }
    }, 2000);
  }


 


  //! STOP ALL
  const stopAll = () => {
    clearInterval(intervalRef.current);

    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    videoRef.current.srcObject = null;
  };
  //! TOGGLE ON/OFF 
  const handleToggle = async () => {
    if (!isRunnning) {
        await loadModel();
        await startCemara();
        detectFacialExpression();
    } else {
        stopAll();
    }

    setIsRunnning(!isRunnning);
};

  return (
    <div className='container'>
      <video autoPlay muted width="400px" height="300px" style={{ border:"1px solid black", borderRadius: "8px" }} ref={videoRef}></video>

      <button  onClick={handleToggle}  className='btn'>
        {isRunnning ? "Stop Detection" : "Start Detection"}
      </button>
    </div>
  )
}

export default FacialExpression