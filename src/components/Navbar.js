import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-neutral-800 p-6">
      <div className="flex items-center flex-shrink text-white mr-6">
        <span className="font-semibold text-xl tracking-tight ">
          <Link to="/">Todo-App</Link>
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        ></button>
      </div>
      <div
        className={`${
          isOpen ? `block` : `hidden`
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-md flex items-center lg:flex-grow lg:flex lg:justify-between">
          <div>
            <Link
              to="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Home
            </Link>
            <Link
              to="/add-task"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              AddTask
            </Link>
          </div>
          {user ? (
            <div className="flex justify-end ">
              <h2 className="m-2  text-gray-200 px-4 py-2 rounded-md border-2 ">
                {user.name}
              </h2>
              <button
                class="m-2 bg-teal-400 hover:bg-teal-300 text-gray-800 px-4 py-2 font-semibold  rounded-md"
                onClick={handleLogout}
              >
                LogOut
              </button>
            </div>
          ) : (
            <div className="flex justify-end ">
              <Link
                to="/login"
                className="m-2 bg-teal-400 hover:bg-teal-300 text-gray-800 font-semibold px-4 py-2 rounded-md"
              >
                login
              </Link>
              <Link
                to="/signin"
                className="m-2 bg-teal-400 hover:bg-teal-300 text-gray-800 font-semibold  px-4 py-2 rounded-md"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
