const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-background-light text-secondary space-y-4">
      <p>Drop your picture</p>
      <div className="w-full flex justify-center items-center space-x-2 text-background-dark">
        <div className="h-[2px] w-1/5 bg-background-dark" />
        <p>or</p>
        <div className="h-[2px] w-1/5 bg-background-dark" />
      </div>
      <p>Select it locally</p>
    </div>
  );
};

export default App;
