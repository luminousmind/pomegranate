import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <header className="flex-center bg-[#181818] h-14">
        <nav className="flex-between w-full max-w-6xl">
          <Link to="/" tabIndex="-1">
            <h3 className="font-bold text-lg hocus:text-white" tabIndex="0">
              superlogo
            </h3>
          </Link>
          <div className="flex-center gap-x-2">
            <Link
              to="/login"
              className="cursor-pointer px-3 py-1.5 rounded-xl bg-[#242424] border-[#2e2e2e] border-1 hocus:brightness-125 duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="cursor-pointer px-3 py-1.5 rounded-xl bg-[#17613b] border-[#298255] border-1 hocus:brightness-125 duration-300"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>
    </header>
  );
}

export default Navbar;
