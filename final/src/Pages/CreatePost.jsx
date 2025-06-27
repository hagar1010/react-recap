import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIClient } from "../api";
import { jwtDecode } from "jwt-decode";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } =
        JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
      const { id: userId } = jwtDecode(token);

      await APIClient.post("/posts", {
        title,
        content,
        userId,
        sections: [],
      });

      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="h4 mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}

        <button type="submit" className="btn btn-success">
          Publish Post
        </button>
      </form>
    </div>
  );
}
