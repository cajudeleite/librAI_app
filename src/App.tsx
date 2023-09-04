import { Player } from "@lottiefiles/react-lottie-player";
import folder from "./assets/folder.json";
import airplay from "./assets/airplay.json";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const folderRef = useRef<any>();
  const airplayRef = useRef<any>();
  const inputRef = useRef<any>();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setInterval(() => {
      airplayRef.current?.play();
    }, 1000);
  }, []);

  const handleDrag = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
      console.log("drag enter");
    } else if (event.type === "dragleave") {
      setDragActive(false);
      console.log("drag leave");
    }
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
      console.log(event.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDrop={handleDrop}
      className="h-screen w-screen flex flex-col justify-center items-center bg-background-light text-secondary space-y-4"
    >
      <Player
        ref={airplayRef}
        speed={0.7}
        src={airplay}
        style={{ height: "10rem", width: "10rem" }}
      />
      <p>Drop your picture</p>
      <div className="w-full flex justify-center items-center space-x-2 text-background-dark">
        <div className="h-[2px] w-1/5 bg-background-dark" />
        <p>or</p>
        <div className="h-[2px] w-1/5 bg-background-dark" />
      </div>
      <p>Select it locally</p>
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
          style={{ height: "10rem", width: "10rem" }}
        />
      </div>
      {selectedImage && <img src={selectedImage} alt="Selected Image" />}
    </div>
  );
};

export default App;
