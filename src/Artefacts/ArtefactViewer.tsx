import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, PresentationControls, OrbitControls } from '@react-three/drei';
import { Box } from '@mui/material';

function GltfModel({ url }: { url: string }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
}

const ArtefactViewer = ({ modelUrl }: { modelUrl: string }) => {
    return (
        <Box sx={{ width: '100%', height: '500px', bgcolor: '#F2EAD3', borderRadius: '8px' }}>
            <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} style={{ touchAction: 'none' }}>
                <color attach="background" args={['#F2EAD3']} />

                <Suspense fallback={null}>
                    <PresentationControls speed={1.5} polar={[-0.1, Math.PI / 4]} >
                        <Stage environment="forest" intensity={0.01} shadows={false}>
                            <GltfModel url={modelUrl} />
                        </Stage>
                    </PresentationControls>
                </Suspense>

                <OrbitControls makeDefault />
            </Canvas>
        </Box>
    );
};

export default ArtefactViewer;