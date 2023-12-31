import { Player } from "@lottiefiles/react-lottie-player";
import folder from "./assets/lotties/folder.json";
import airplay from "./assets/lotties/airplay.json";
import check from "./assets/lotties/check.json";
import error from "./assets/lotties/error.json";
import loadingLottie from "./assets/lotties/loading.json";
import insta from "./assets/lotties/insta.json";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useEffect, useRef, useState } from "react";
import { getImagePrediction } from "./api";
import Logo from "./assets/icons/Logo";

const App = () => {
  const folderRef = useRef<any>();
  const airplayRef = useRef<any>();
  const inputRef = useRef<any>();
  const imageRef = useRef<any>();
  const instaRef = useRef<any>();
  const logoRef = useRef<any>();
  const absoluteLogoRef = useRef<any>();
  const containerRef = useRef<any>();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [dragActive, setDragActive] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    containerRef.current.classList.add("hidden");
    absoluteLogoRef.current.classList.add("hidden");

    setTimeout(() => {
      logoRef.current.classList.add("slide-out-blurred-tl");
    }, 3000);

    setTimeout(() => {
      absoluteLogoRef.current.classList.remove("hidden");
      absoluteLogoRef.current.classList.add("slide-in-blurred-br");
    }, 3500);

    setTimeout(() => {
      logoRef.current.classList.add("hidden");
      containerRef.current.classList.remove("hidden");
      containerRef.current.classList.add("puff-in-center");
    }, 3750);

    setTimeout(() => {
      containerRef.current.classList.remove("puff-in-center");
      absoluteLogoRef.current.classList.remove("slide-in-blurred-br");
    }, 5000);
  }, []);

  const handleDragOver = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(true);
  };

  const handleDragLeave = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    const { files } = event.dataTransfer;

    if (files && files.length) {
      setSelectedImage(files[files.length - 1]);
    }
  };

  const predictImage = async () => {
    setLoading(true);

    try {
      const response: string = await getImagePrediction(selectedImage);

      setPrediction(response);
    } catch (error: any) {
      console.error(error.message);
    }

    setLoading(false);
  };

  const dataURLtoFile = (dataurl: any, filename: string) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`h-screen w-screen overflow-hidden flex justify-center items-center ${
        dragActive ? "bg-background-dark" : "bg-background-light"
      }`}
    >
      <div
        className="absolute top-8 left-8 w-1/6 lg:w-1/12"
        ref={absoluteLogoRef}
      >
        <Logo />
      </div>
      <div className="w-1/3 slide-in-blurred-bottom" ref={logoRef}>
        <Logo />
      </div>
      {!selectedImage && !loading && !showCamera && (
        <div
          className="w-full h-full flex flex-col justify-center items-center space-y-4"
          ref={containerRef}
        >
          <Player
            ref={airplayRef}
            speed={0.7}
            src={airplay}
            className="h-[10vw] w-[10vw] hidden lg:block"
          />
          <div
            onMouseEnter={() => {
              instaRef.current.setPlayerDirection(1);
              instaRef.current.play();
            }}
            onMouseLeave={() => {
              instaRef.current.setPlayerDirection(-1);
              instaRef.current.play();
            }}
            onClick={() => setShowCamera(true)}
            className="cursor-pointer"
          >
            <Player
              ref={instaRef}
              keepLastFrame
              src={insta}
              className="h-[10vw] w-[10vw] lg:hidden"
            />
          </div>
          <p
            className={`text-[2.5vw] lg:text-[1vw] hidden lg:block ${
              dragActive ? "text-white" : "text-secondary"
            }`}
          >
            Drop your picture
          </p>
          <p
            className={`text-[2.5vw] lg:text-[1vw] lg:hidden ${
              dragActive ? "text-white" : "text-secondary"
            }`}
          >
            Take a picture
          </p>
          <div
            className={`w-full flex justify-center items-center space-x-2 ${
              dragActive ? "text-background-light" : "text-background-dark"
            }`}
          >
            <div
              className={`h-[2px] w-1/5 ${
                dragActive ? "bg-background-light" : "bg-background-dark"
              }`}
            />
            <p className="text-[2.5vw] lg:text-[1vw]">or</p>
            <div
              className={`h-[2px] w-1/5 ${
                dragActive ? "bg-background-light" : "bg-background-dark"
              }`}
            />
          </div>
          <p
            className={`text-[2.5vw] lg:text-[1vw] ${
              dragActive ? "text-white" : "text-secondary"
            }`}
          >
            Select it locally
          </p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(event) =>
              setSelectedImage(
                event.currentTarget.files
                  ? event.currentTarget.files[
                      event.currentTarget.files.length - 1
                    ]
                  : undefined
              )
            }
          />
          <div
            onMouseEnter={() => {
              folderRef.current.setPlayerDirection(1);
              folderRef.current.play();
            }}
            onMouseLeave={() => {
              folderRef.current.setPlayerDirection(-1);
              folderRef.current.play();
            }}
            onClick={() => inputRef.current.click()}
            className="cursor-pointer"
          >
            <Player
              ref={folderRef}
              keepLastFrame
              src={folder}
              className="h-[10vw] w-[10vw]"
            />
          </div>
        </div>
      )}
      {selectedImage && !loading && (
        <div
          className="relative h-3/4 flex justify-center"
          style={{ width: containerWidth ? containerWidth : "100%" }}
          onMouseOver={() => setContainerWidth(imageRef.current?.offsetWidth)}
        >
          <button
            className="absolute h-1/5 w-full bg-red-500 opacity-0 hover:opacity-100 bg-opacity-30 transition-all duration-200"
            onClick={() => {
              setSelectedImage(null);
              setContainerWidth(null);
              setPrediction("");
            }}
          >
            <Player autoplay loop src={error} style={{ width: "11%" }} />
          </button>
          <img
            ref={imageRef}
            className="h-full"
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
          />
          {prediction ? (
            <div className="absolute bottom-0 h-4/5 w-full bg-primary bg-opacity-30 flex justify-center items-center space-x-4">
              {prediction.length === 3 ? (
                <>
                  <p className="text-primary-500 text-[5vw] translate-y-8 lg:translate-y-16">
                    {prediction[1]}
                  </p>
                  <p className="text-primary-500 text-[7vw] font-bold">
                    {prediction[0]}
                  </p>
                  <p className="text-primary-500 text-[5vw] translate-y-8 lg:translate-y-16">
                    {prediction[2]}
                  </p>
                </>
              ) : (
                <p className="text-primary-500 text-[7vw]">{prediction}</p>
              )}
            </div>
          ) : (
            <button
              className="absolute bottom-0 h-4/5 w-full bg-primary opacity-0 hover:opacity-100 bg-opacity-30 transition-all duration-200"
              onClick={predictImage}
            >
              <Player autoplay loop src={check} style={{ width: "30%" }} />
            </button>
          )}
        </div>
      )}
      {loading && (
        <Player
          autoplay
          loop
          src={loadingLottie}
          style={{ height: "15vw", width: "15vw" }}
        />
      )}
      {showCamera && (
        <div
          className="relative flex justify-center"
          style={{ width: containerWidth ? containerWidth : "100%" }}
          onMouseOver={() =>
            setContainerWidth(
              document.getElementsByClassName("react-html5-camera-photo")[0]
                .clientWidth
            )
          }
        >
          <button
            className="absolute z-20 h-1/5 w-full bg-red-500 opacity-0 hover:opacity-100 bg-opacity-30 transition-all duration-200"
            onClick={() => {
              setShowCamera(false);
              setContainerWidth(null);
            }}
          >
            <Player
              autoplay
              loop
              src={error}
              style={{ height: "auto", width: "15%" }}
            />
          </button>
          <Camera
            isImageMirror
            onTakePhotoAnimationDone={(dataUri) => {
              const imgFile = dataURLtoFile(dataUri, "photo.jpeg");

              setContainerWidth(null);
              setSelectedImage(imgFile);
              setShowCamera(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
