import { Link } from "react-router-dom";

const userCard = ({ name, id, phone, email }) => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column",
        }}
      >
        <p>{name}</p>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
      {id ? <Link to={`/users/${id}`}>show more details</Link> : null}
    </div>
  );
};
export default userCard;
