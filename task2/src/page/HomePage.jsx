import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";
import useUserStore from "../store/users";

const HomePage = () => {
  const [prams, setParms] = useState([1]);
  const selectRef = useRef(null);
  const { getUser, user, hasErrors } = useUserStore();
  const handleSearch = async (e) => {
    await getUser({ [selectRef.current.value]: e.target.value });
  };

  return (
    <div>
      <Link to={"/users"}>users</Link>
      <div>or you can search for a user</div>
      {prams.map(() => (
        <div>
          <select name="search pram" defaultValue={"name"} ref={selectRef}>
            <option value="email">email</option>
            <option value="name">name</option>
            <option value="id">id</option>
            <option value="phone">phone</option>
          </select>
          <input type="search" onChange={handleSearch} />
        </div>
      ))}
      <button onClick={() => setParms((prev) => [...prev, 1])}>
        add more parm
      </button>

      <UserCard {...user} />
      {hasErrors ? <p>{hasErrors.message}</p> : null}
    </div>
  );
};

export default HomePage;
