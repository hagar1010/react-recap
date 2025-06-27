import { useEffect, useState } from "react";
import { getMe } from "@/api/user";
import { APIClient } from "@/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        setUser(res.data);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          username: res.data.username,
          phone: res.data.phone || "",
        });
      } catch (err) {
        setError("Failed to load user info");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await APIClient.put(`/users/${user.id}`, formData);
      setSuccess("Profile updated successfully.");
      setEditing(false);
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <div className="bg-white shadow rounded p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <div className="text-center mb-4">
        {user.avatar && (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="rounded-circle mb-3"
            style={{ width: "90px", height: "90px", objectFit: "cover" }}
          />
        )}
        <h4 className="fw-bold">{formData.name}</h4>
        <p className="text-muted">{formData.email}</p>
      </div>

      {success && <div className="alert alert-success">{success}</div>}

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          disabled={!editing}
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          name="username"
          disabled={!editing}
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          disabled={!editing}
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          name="phone"
          disabled={!editing}
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value="********"
          disabled
        />
      </div> */}

      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-outline-secondary"
          // onClick={() => alert("You can implement a change password modal here.")}
        >
          Change Password
        </button>

        {editing ? (
          <div>
            <button className="btn btn-secondary me-2" onClick={() => setEditing(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        ) : (
          <button className="btn btn-warning" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

