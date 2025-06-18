import { useContext } from "react";
import VideoList from "./components/VideoList";
import { VideosContext } from "./context/videos";
import "./App.css";

function App() {
  const { videos, setVideos } = useContext(VideosContext);
  const count = videos.length;
  let heading;
  if (count > 0) {
    const noun = count > 1 ? "Videos" : "Video";
    heading = count + " " + noun;
  }
  return (
    <>
      <h1>Video App</h1>
      <p>There are {count} videos in the list.</p>
      <button
        onClick={() => {
          setVideos(videos.slice(0, 1));
        }}
      >
        Show only the first video
      </button>
      <h2>{heading}</h2>
      <VideoList />
    </>
  );
}

export default App;
