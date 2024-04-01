import toast, { Toaster } from "react-hot-toast";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/appApi";
import { AppContext } from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const { user, setUser } = useContext(AppContext);

  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userDetails = {
      email,
      password,
    };
    console.log(userDetails);
    try {
      const userData = await loginUser(userDetails);
      console.log(userData.error);
      if (userData.error) {
        return alert(userData?.error?.data);
      }
      localStorage.setItem("user", JSON.stringify(userData.data));
      setUser(userData.data);
      alert("Login successfully");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <div
        style={{
          background:
            "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
        }}
        className="flex justify-center items-center h-screen bg-slate-100 w-full"
      >
        <form
          className="flex flex-col space-y-4 lg:m-16 lg:w-1/4  p-10  border-slate-300  bg-neutral-900 rounded-xl"
          onSubmit={handleLogin}
        >
          
          <h1 className="text-3xl m-auto text-gray-200 font-bold">Login</h1>
          <label htmlFor="email" className="text-sm text-gray-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
          />

          <label htmlFor="password" className="text-sm text-gray-200">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300 "
          />

          <p className="text-gray-200 ">
            Don't have an account?
            <Link
              className="hover:underline text-gray-200 hover:text-blue-600"
              to="/signin"
            >
              Register
            </Link>
          </p>

          <button
            type="submit"
            className="px-3 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300  "
          >
            {isLoading ? "loging you up..." : "login"}
          </button>
        </form>
        <Toaster />
      </div>
    </>
  );
};

export default Login;
