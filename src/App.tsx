import { Canvas } from '@react-three/fiber';
import Box from './components/box/box';
import "./App.css";
export default function App() {
  return (
    <div className='boxContainer'>
      <Canvas>
        <Box />
      </Canvas>
    </div>
  );
}
