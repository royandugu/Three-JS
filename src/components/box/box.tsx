import { Glass } from "../glass/glass";

const Box = ({coordinates, scale, rotationZ}:{coordinates:any,scale:any,rotationZ:any}) => {
    return (
        <>
            <ambientLight intensity={1}/>
            <Glass coordinates={coordinates} scale={scale} rotationZ={rotationZ}/>
        </>
    )
}
export default Box;  