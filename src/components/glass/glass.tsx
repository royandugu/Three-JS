import { useGLTF } from '@react-three/drei'

export function Glass(props:any) {

  
  const { nodes, materials }:{nodes:any, materials:any} = useGLTF('/models/glasses.glb')
  return (
    <group dispose={null}>
      <group position={[79.563, -0.8, -190.098]} rotation={[-Math.PI / 4, 0, -0.451]} scale={100}>
        <mesh geometry={nodes.Cube001_handle_0.geometry} material={materials.handle} />
        <mesh geometry={nodes.Cube001_handle_0_1.geometry} material={materials.handle} />
      </group>
      <mesh geometry={nodes.Cylinder_frame_0.geometry} material={materials.frame} position={[79.563, -0.8, -190.098]} rotation={[-Math.PI / 4, 0, -0.451]} scale={100} />
      <mesh geometry={nodes.BezierCurve002_frame_0.geometry} material={materials.frame} position={[79.563, -0.8, -190.098]} rotation={[-Math.PI / 4, 0, 0]} scale={100} />
      <mesh geometry={nodes.Cylinder002_nose_protector_0.geometry} material={materials.nose_protector} position={[79.563, -0.8, -190.098]} rotation={[-Math.PI / 4, 0, -0.451]} scale={100} />
      <mesh geometry={nodes.Cube002_leatherhandle_0.geometry} material={materials.leatherhandle} position={[79.563, -0.8, -190.098]} rotation={[-Math.PI / 4, 0, -0.451]} scale={100} />
      <mesh geometry={nodes.BezierCurve001_Glass02_0.geometry} material={materials.Glass02} position={[79.563, -0.8, -190.098]} rotation={[-Math.PI / 4, 0, -0.451]} scale={100} />
      <mesh geometry={nodes.Cylinder001_frame_0.geometry} material={materials.frame} position={[79.563, -0.8, -190.098]} rotation={[-Math.PI / 4, 0, -0.451]} scale={100} />
      <mesh geometry={nodes.BezierCurve_frame_0.geometry} material={materials.frame} position={[79.563, -0.8, -190.098]} rotation={[-Math.PI / 4, 0, -0.451]} scale={100} />
    </group>
  )  
}

useGLTF.preload('/glasses.glb')
