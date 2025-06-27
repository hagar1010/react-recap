import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIClient } from "../api";
import { jwtDecode } from "jwt-decode";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await APIClient.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    const getCurrentUserId = () => {
      const { token } = JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
      if (token) {
        const { id } = jwtDecode(token);
        setCurrentUserId(id);
      }
    };

    fetchPost();
    getCurrentUserId();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await APIClient.delete(`/posts/${id}`);
        navigate("/posts");
      } catch (err) {
        console.error(err);
        alert("Failed to delete post.");
      }
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!post) return <p>No post found.</p>;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2 className="h4 mb-2">{post.title}</h2>
      {/* <p className="mb-3 text-muted">By <strong>{post.user?.name || "Unknown"}</strong></p>
      {post.user?.avatar && (
        <img
          src={post.user.avatar}
          alt="avatar"
          className="rounded-circle mb-3"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />
      )} */}

      <p className="mb-4">{post.content}</p>

      {post.sections?.length > 0 && (
        <div>
          <h5 className="mb-2">Sections</h5>
          {post.sections.map((section) => (
            <div key={section.id} className="mb-3 p-3 border rounded">
              <h6 className="fw-bold">{section.title}</h6>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      )}

      {currentUserId === post.userId && (
        <div className="mt-4 d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/posts/${id}/edit`)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
