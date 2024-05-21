"use client";

import { Canvas } from "@react-three/fiber";
import { Gltf, OrbitControls, Sky } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { MeshBasicMaterial } from "three";

const Scene = () => {
    return (
        <Canvas>
            <Physics>
                <Sky />
                <OrbitControls rotation={[0, -Math.PI, 0]} />

                <RigidBody
                    colliders="cuboid"
                    position={[0, 100, 80]}
                >
                    <mesh>
                        <boxGeometry />
                        <meshBasicMaterial color="red" />
                    </mesh>
                </RigidBody>                

                <RigidBody
                    colliders="trimesh"
                    type="fixed"
                    position={[0, -10, 100]}
                    rotation={[0, -Math.PI, 0]}
                >
                    <Gltf
                        src="/neuro_sama/scene.gltf"
                    />
                </RigidBody>

            </Physics>
        </Canvas>
    );
}

export default Scene