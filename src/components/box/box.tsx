import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Glass } from "../glass/glass";

const Box = () => {
    return (
        <>
            <ambientLight intensity={1}/>
            <OrbitControls/>
            <ScrollControls pages={3} damping={0.25}>
                <Glass />
            </ScrollControls>
        </>
    )
}
export default Box;