import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import "./App.css";

import React, { useState } from 'react';
import * as THREE from 'three';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import glassesSrc from "./assets/sunglasses.png";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export default function App() {
  const canvasRef = useRef<any>(null);
  const [model, setModel] = useState<any>(null);
  const [glassesMesh, setGlassesMesh] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(true);


  const webcamRef = useRef<any>(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Camera Access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }

        // TensorFlow Model
        await tf.setBackend('webgl');
        const loadedModel = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
          {
            shouldLoadIrisModel: true,
            maxFaces: 1,
            // returnTensors: false,
            // predictIrises: false 
          }
        );
        setModel(loadedModel);

        // Three.js Setup
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(width, height);
        renderer.setAnimationLoop(() => renderer.render(scene, camera));

        const loader = new GLTFLoader();

        loader.load("./models/untitled.glb", (gltf) => {
          // Handle successful loading
          const glasses = gltf.scene;
          // Further processing (optional)
          scene.add(glasses);
          setGlassesMesh(glasses);
        });




        // Glasses Mesh


        

      } catch (error) {
        console.error("Initialization error:", error);
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);


  useEffect(() => {
    const detectAndPositionGlasses = async () => {
      if (!webcamRef.current || !model || !glassesMesh) return;
      const video = webcamRef.current.video;
      if (video.readyState !== 4) return;

      const faceEstimates = await model.estimateFaces({ input: video });
      if (faceEstimates.length > 0) {
        setIsLoading(false);
        // Face mesh keypoints
        const keypoints = faceEstimates[0].scaledMesh;
        const leftEye = keypoints[130];
        const rightEye = keypoints[359];
        const eyeCenter = keypoints[168];

        // Eye distance for glasses scaling
        const eyeDistance = Math.sqrt(Math.pow(rightEye[0] - leftEye[0], 2) + Math.pow(rightEye[1] - leftEye[1], 2));
        const scaleMultiplier = eyeDistance / 140;

        // Glasses scaling and offset values
        const scaleX = -0.01;
        const scaleY = -0.01;
        const offsetX = 0.00;
        const offsetY = -0.01;

        // Glasses positioning
        glassesMesh.position.x = (eyeCenter[0] - video.videoWidth / 2) * scaleX + offsetX;
        glassesMesh.position.y = (eyeCenter[1] - video.videoHeight / 2) * scaleY + offsetY;
        glassesMesh.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);
        glassesMesh.position.z = 1;

        // Rotate glasses to align with eyes - rotation depth
        const eyeLine = new THREE.Vector2(rightEye[0] - leftEye[0], rightEye[1] - leftEye[1]);
        const rotationZ = Math.atan2(eyeLine.y, eyeLine.x);
        glassesMesh.rotation.z = rotationZ;
      }
    };

    // Run detection and positioning every 120ms
    const intervalId = setInterval(() => {
      detectAndPositionGlasses();
    }, 120);

    return () => clearInterval(intervalId);
  }, [model, glassesMesh]);

  return (
    <div className='boxContainer'>
      <div style={{ position: 'relative', margin: '0 auto', width: '800px', height: '800px' }}>
      {isLoading && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
            <h3>Loading...</h3>
          </div>
        )}
      <Webcam ref={webcamRef} autoPlay playsInline style={{ width: '800px', height: '800px' }} mirrored={true} />
      
        <canvas ref={canvasRef} style={{ width: '800px', height: '800px', position: 'absolute', top: 0, left: 0 }} />
      </div>
    </div>
  );
}
