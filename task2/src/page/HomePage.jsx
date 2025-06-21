// import { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import UserCard from "../components/UserCard";
// import useUserStore from "../store/users";

// const HomePage = () => {
//   const [prams, setParms] = useState([1]);
//   const selectRef = useRef(null);
//   const { getUser, user, hasErrors } = useUserStore();
//   const handleSearch = async (e) => {
//     await getUser({ [selectRef.current.value]: e.target.value });
//   };

//   return (
//     <div>
//       <Link to={"/users"}>users</Link>
//       <div>or you can search for a user</div>
//       {prams.map(() => (
//         <div>
//           <select name="search pram" defaultValue={"name"} ref={selectRef}>
//             <option value="email">email</option>
//             <option value="name">name</option>
//             <option value="id">id</option>
//             <option value="phone">phone</option>
//           </select>
//           <input type="search" onChange={handleSearch} />
//         </div>
//       ))}
//       <button onClick={() => setParms((prev) => [...prev, 1])}>
//         add more parm
//       </button>

//       <UserCard {...user} />
//       {hasErrors ? <p>{hasErrors.message}</p> : null}
//     </div>
//   );
// };

// export default HomePage;



























// // ✅ UPDATED: HomePage.jsx
// import { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import UserCard from "../components/UserCard";
// import useUserStore from "../store/users";

// const HomePage = () => {
//   const [paramsList, setParamsList] = useState([{ key: "name", value: "" }]);
//   const { getUser, user, hasErrors } = useUserStore();

//   const handleParamChange = (index, field, val) => {
//     const newList = [...paramsList];
//     newList[index][field] = val;
//     setParamsList(newList);
//   };

//   const handleSearch = async () => {
//     const query = {};
//     paramsList.forEach(({ key, value }) => {
//       if (value) query[key] = value;
//     });
//     await getUser(query);
//   };

//   return (
//     <div className="homepage">
//       <Link to="/users" className="link">See All Users</Link>
//       <h2>Search for a User</h2>

//       {paramsList.map((param, index) => (
//         <div key={index} className="search-group">
//           <select
//             value={param.key}
//             onChange={(e) => handleParamChange(index, "key", e.target.value)}
//           >
//             <option value="name">Name</option>
//             <option value="email">Email</option>
//             <option value="id">ID</option>
//             <option value="phone">Phone</option>
//           </select>
//           <input
//             type="text"
//             value={param.value}
//             onChange={(e) => handleParamChange(index, "value", e.target.value)}
//             placeholder={`Search by ${param.key}`}
//           />
//         </div>
//       ))}

//       <button onClick={() => setParamsList([...paramsList, { key: "name", value: "" }])}>
//         ➕ Add More
//       </button>
//       <button onClick={handleSearch} className="search-button">🔍 Search</button>

//       <div className="result">
//         {user && <UserCard {...user} />}
//         {hasErrors && <p className="error">{hasErrors.message}</p>}
//       </div>
//     </div>
//   );
// };

// export default HomePage;



















import { useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";
import useUserStore from "../store/users";

const HomePage = () => {
  const [paramsList, setParamsList] = useState([{ key: "name", value: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const { getUser, user, hasErrors } = useUserStore();

  const handleParamChange = (index, field, val) => {
    const newList = [...paramsList];
    newList[index][field] = val;
    setParamsList(newList);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      // Filter out empty parameters
      const nonEmptyParams = paramsList.filter(
        (param) => param.value.trim() !== ""
      );

      // If all inputs are empty, don't search
      if (nonEmptyParams.length === 0) {
        alert("Please enter at least one search criteria");
        return;
      }

      // Build query only with non-empty params
      const query = {};
      nonEmptyParams.forEach(({ key, value }) => {
        query[key] = key === "id" ? Number(value) : value;
      });

      await getUser(query);
    } finally {
      setIsLoading(false);
    }
  };

  const removeParam = (index) => {
    const newList = paramsList.filter((_, i) => i !== index);
    setParamsList(newList.length > 0 ? newList : [{ key: "name", value: "" }]);
  };

  // Fields available in JSONPlaceholder users endpoint
  const availableFields = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "id", label: "ID" },
    { value: "phone", label: "Phone" },
  ];

  return (
    <div className="homepage">
      <Link to="/users" className="link">
        See All Users
      </Link>
      <h2>Search for a User</h2>

      <div className="search-container">
        {paramsList.map((param, index) => (
          <div key={index} className="search-group">
            <select
              value={param.key}
              onChange={(e) => handleParamChange(index, "key", e.target.value)}
              className="field-select"
            >
              {availableFields.map((field) => (
                <option key={field.value} value={field.value}>
                  {field.label}
                </option>
              ))}
            </select>

            <input
              type={param.key === "id" ? "number" : "text"}
              value={param.value}
              onChange={(e) =>
                handleParamChange(index, "value", e.target.value)
              }
              placeholder={`Search by ${param.key}`}
              className="search-input"
            />

            {paramsList.length > 1 && (
              <button
                onClick={() => removeParam(index)}
                className="remove-param"
                aria-label="Remove search parameter"
              >
                ×
              </button>
            )}
          </div>
        ))}

        <div className="button-group">
          <button
            onClick={() =>
              setParamsList([...paramsList, { key: "name", value: "" }])
            }
            className="add-param"
          >
            ➕ Add Search Parameter
          </button>
          <button
            onClick={handleSearch}
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? "🔍 Searching..." : "🔍 Search"}
          </button>
        </div>
      </div>

      <div className="result">
        {isLoading && <p className="loading">Loading...</p>}
        {user && <UserCard {...user} />}
        {hasErrors && <p className="error">{hasErrors.message}</p>}
        {!user && !hasErrors && !isLoading && (
          <p className="info">Enter search criteria to find users</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
