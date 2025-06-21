import { NavLink } from "react-router-dom";
import '../styles/styles.css'; 

const Header = () => {
  return (
    <header className="app-header">
      <nav className="nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/users" className="nav-link">
          Users
        </NavLink>
        <NavLink to="/posts" className="nav-link">
          Posts
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;