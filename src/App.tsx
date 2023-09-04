import { Player } from "@lottiefiles/react-lottie-player";
import folder from "./assets/folder.json";
import airplay from "./assets/airplay.json";
import { useEffect, useRef } from "react";

const App = () => {
  const folderRef = useRef<any>();
  const airplayRef = useRef<any>();

  useEffect(() => {
    setInterval(() => {
      airplayRef.current.play();
    }, 1000);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-background-light text-secondary space-y-4">
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
      <div
        onMouseEnter={() => {
          folderRef.current.setPlayerDirection(1);
          folderRef.current.play();
        }}
        onMouseLeave={() => {
          folderRef.current.setPlayerDirection(-1);
          folderRef.current.play();
        }}
        className="cursor-pointer"
      >
        <Player
          ref={folderRef}
          keepLastFrame
          src={folder}
          style={{ height: "10rem", width: "10rem" }}
        />
      </div>
    </div>
  );
};

export default App;
