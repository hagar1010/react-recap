import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIClient } from "../api";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await APIClient.get("/posts");
        setPosts(res.data);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4">Post List</h2>
        <Link to="/posts/create" className="btn btn-primary">
          + Create Post
        </Link>
      </div>
      <div className="list-group">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="list-group-item list-group-item-action"
          >
            <h5 className="mb-1">{post.title}</h5>
            <p className="mb-1 text-muted">
              {post.content.slice(0, 100)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

