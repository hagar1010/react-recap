// import { Link } from "react-router-dom";

// const userCard = ({ name, id, phone, email }) => {
//   return (
//     <div
//       style={{
//         display: "flex",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexFlow: "column",
//         }}
//       >
//         <p>{name}</p>
//         <p>{phone}</p>
//         <p>{email}</p>
//       </div>
//       {id ? <Link to={`/users/${id}`}>show more details</Link> : null}
//     </div>
//   );
// };
// export default userCard;



// ✅ UPDATED: UserCard.jsx with user image + modern styling
import { Link } from "react-router-dom";

const UserCard = ({ name, id, phone, email }) => {
  const avatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name || email || id)}`;

  return (
    <div className="user-card">
      <img src={avatarUrl} alt={name} className="avatar" />
      <div className="user-info">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
        {id && (
          <Link to={`/users/${id}`} className="details-link">
            ➕ Show More Details
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserCard;

