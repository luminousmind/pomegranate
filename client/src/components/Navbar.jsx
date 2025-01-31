import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <header className="flex-center">
        <nav className="flex-between">
          <Link to="/">
            <h3>superlogo</h3>
          </Link>
          <div className="flex-center auth-div">
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/signup" className="btn cta">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
    </header>
  );
}

export default Navbar;
