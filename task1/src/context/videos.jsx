import { createContext, useState } from "react";

export const VideosContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      name: "first video",
      description: "first video description",
      comments: [
        {
          userId: 1,
          text: "great",
        },
        {
          userId: 2,
          text: "good",
        }]
    },
    {
      id: 2,
      name: "second video",
      description: "second video description",
      comments: [
        {
          userId: 2,
          text: "bad",
        }]
    },
    {
      id: 3,
      name: "third video",
      description: "third video description",
      comments: [
        {
          userId: 2,
          text: "not bad",
        },
        {
          userId: 1,
          text: "it's ok",
        }]
    },
  ]);
  return (
    <VideosContext value={{ videos, setVideos }}>{children}</VideosContext>
  );
};

export default VideoProvider;
