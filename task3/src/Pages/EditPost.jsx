import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIClient } from "../api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await APIClient.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setSections(res.data.sections || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load post.");
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await APIClient.put(`/posts/${id}`, {
        title,
        content,
        sections,
      });
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update post");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="h4 mb-4">Edit Post</h2>
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
          Update Post
        </button>
      </form>
    </div>
  );
}
