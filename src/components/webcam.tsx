import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

const WebcamCapture = () => {
    const webcamRef = useRef<any>(null);
    const [imgSrc, setImgSrc] = useState<any>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                minScreenshotWidth={180}
                minScreenshotHeight={180}
            />
            <button onClick={capture}>Capture Photo</button>
            {imgSrc && <img src={imgSrc} alt="img" />}
        </>
    );
};

export default WebcamCapture