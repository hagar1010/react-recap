import Comment from "./comment";
const Video = ({ video: { id, name, description, comments } }) => {
  return (
    <div key={id} className="video-card">
      <p className="video-title">{name}</p>
      <p className="video-desc">{description}</p>
      <Comment comments={comments} />
    </div>
  );
};

export default Video;
