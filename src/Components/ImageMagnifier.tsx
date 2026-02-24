import {useState} from "react";

export function ImageMagnifier({ src, width, height, zoomLevel = 2 }: { src: string, width?: string | number, height?: string | number, zoomLevel?: number }) {
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);

    return (
        <div style={{ position: "relative", height: height, width: width }}>
            <img
                src={src}
                style={{ height: "100%", width: "100%", borderRadius: '8px' }}
                onMouseEnter={(e) => {
                    const elem = e.currentTarget;
                    const { width, height } = elem.getBoundingClientRect();
                    setSize([width, height]);
                    setShowMagnifier(true);
                }}
                onMouseMove={(e) => {
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();
                    const x = e.pageX - left - window.pageXOffset;
                    const y = e.pageY - top - window.pageYOffset;
                    setXY([x, y]);
                }}
                onMouseLeave={() => setShowMagnifier(false)}
                alt="magnifier"
            />

            <div style={{
                display: showMagnifier ? "" : "none",
                position: "absolute",
                pointerEvents: "none",
                height: `300px`,
                width: `300px`,
                top: `${y - 150}px`,
                left: `${x - 150}px`,
                borderRadius: "50%",
                border: "2px solid white",
                backgroundColor: "white",
                backgroundImage: `url('${src}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                backgroundPosition: `${-x * zoomLevel + 75}px ${-y * zoomLevel + 75}px`,
                boxShadow: "0 0 15px rgba(0,0,0,0.5)",
                zIndex: 2000
            }} />
        </div>
    );
}