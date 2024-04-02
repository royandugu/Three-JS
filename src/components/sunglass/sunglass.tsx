/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/sunglass.glb 
Author: Dr.Bahizha (https://sketchfab.com/Dr.Bahizha)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/sunglass-a7b80bbbb6894160bc364bdf3822d3ba
Title: Sunglass
*/

import { useGLTF } from '@react-three/drei'

export function SunGlass(props:any) {
  const { nodes, materials }:{nodes:any,materials:any} = useGLTF('/models/sunglass.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.Wolf3D_Glasses} position={[6.603, -1.037, 5.906]} rotation={[-0.137, 0.803, 0.137]} scale={3.312} />
    </group>
  )
}

useGLTF.preload('/sunglass.glb')
