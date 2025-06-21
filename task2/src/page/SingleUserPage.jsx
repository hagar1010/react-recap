// ✅ UPDATED: SingleUserPage.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserStore from "../store/users";
import Spinner from "../components/Spinner";

const SingleUserPage = () => {
  const { userID } = useParams();
  const { getUser, user, isLoading, hasErrors } = useUserStore();

  useEffect(() => {
    getUser({ id: userID });
  }, [userID]);

  if (isLoading) return <Spinner />;
  if (hasErrors) return <p>{hasErrors.message}</p>;
  if (!user) return <p>No user found</p>;

  const avatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.name || user.email || user.id)}`;
  
  return (
    <div className="user-details">
      <img src={avatarUrl} alt={user.name} className="avatar-large" />
      <h2>User Info</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
    </div>
  );
};

export default SingleUserPage;
