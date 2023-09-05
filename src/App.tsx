import { Player } from "@lottiefiles/react-lottie-player";
import folder from "./assets/folder.json";
import airplay from "./assets/airplay.json";
import check from "./assets/check.json";
import error from "./assets/error.json";
import loadingLottie from "./assets/loading.json";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const folderRef = useRef<any>();
  const airplayRef = useRef<any>();
  const inputRef = useRef<any>();
  const imageRef = useRef<any>();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [dragActive, setDragActive] = useState(false);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInterval(() => {
      airplayRef.current?.play();
    }, 1000);
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
    console.log("Drop");

    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);

    const { files } = event.dataTransfer;

    if (files && files.length) {
      setSelectedImage(URL.createObjectURL(files[files.length - 1]));
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`h-screen w-screen flex flex-col justify-center items-center space-y-4 ${
        dragActive ? "bg-background-dark" : "bg-background-light"
      }`}
    >
      {!selectedImage && !loading && (
        <>
          <Player
            ref={airplayRef}
            speed={0.7}
            src={airplay}
            style={{ height: "10vw", width: "10vw" }}
          />
          <p
            className={`text-[1vw] ${
              dragActive ? "text-white" : "text-secondary"
            }`}
          >
            Drop your picture
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
            <p className="text-[1vw]">or</p>
            <div
              className={`h-[2px] w-1/5 ${
                dragActive ? "bg-background-light" : "bg-background-dark"
              }`}
            />
          </div>
          <p
            className={`text-[1vw] ${
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
                  ? URL.createObjectURL(
                      event.currentTarget.files[
                        event.currentTarget.files.length - 1
                      ]
                    )
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
              style={{ height: "10vw", width: "10vw" }}
            />
          </div>
        </>
      )}
      {selectedImage && !loading && (
        <div
          className="relative h-3/4 flex justify-center"
          style={{ width: imageWidth ?? "100%" }}
          onMouseOver={() => setImageWidth(imageRef.current?.offsetWidth)}
        >
          <button
            className="absolute h-1/5 w-full bg-red-500 opacity-0 hover:opacity-100 bg-opacity-30 transition-all duration-200"
            onClick={() => setSelectedImage(null)}
          >
            <Player
              autoplay
              loop
              src={error}
              style={{ height: "auto", width: "15%" }}
            />
          </button>
          <img
            ref={imageRef}
            className="h-full"
            src={selectedImage}
            alt="Selected Image"
          />
          <button
            className="absolute bottom-0 h-4/5 w-full bg-primary opacity-0 hover:opacity-100 bg-opacity-30 transition-all duration-200"
            onClick={() => setLoading(true)}
          >
            <Player
              autoplay
              loop
              src={check}
              style={{ height: "auto", width: "30%" }}
            />
          </button>
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
    </div>
  );
};

export default App;
