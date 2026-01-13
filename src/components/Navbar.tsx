import { NavLink } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

const Navbar = () => {
  const { watchlist } = useWatchlist();

  return (
    <nav className="navbar">
      <h2 className="logo">🎬 CineFlix</h2>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Movies
        </NavLink>

        <NavLink
          to="/watchlist"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Watchlist ❤️ ({watchlist.length})
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
