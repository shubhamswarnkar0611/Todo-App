import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSignupUserMutation } from "../../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Signin = () => {
  const [error, setError] = useState();
  const [signupUser, { isLoading }] = useSignupUserMutation();
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleSingup(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userDetails = {
      name,
      email,
      password,
    };

    try {
      let userData = await signupUser(userDetails);

      if (userData.error) {
        toast.error(userData?.error?.data);
        return setError(userData?.error?.data);
        //    return alert(userData?.error?.data)
      }
      localStorage.setItem("user", JSON.stringify(userData.data));
      setUser({ ...userData.data });
      toast.success("Login Sucessfully");
      navigate("/");
    } catch (err) {
        toast.error(err.message);
      console.log(err.message);
    }
  }

  return (
    <>
      <div
        style={{
          background:
            "radial-gradient(circle at -8.9% 51.2%, rgb(255, 124, 0) 0%, rgb(255, 124, 0) 15.9%, rgb(255, 163, 77) 15.9%, rgb(255, 163, 77) 24.4%, rgb(19, 30, 37) 24.5%, rgb(19, 30, 37) 66%)",
        }}
        className="flex  justify-center items-center h-screen bg-slate-100 "
      >
        <Toaster />
        <form
          className="flex flex-col space-y-4 lg:m-16 lg:w-1/4 p-10  border-slate-300  bg-neutral-900 rounded-xl"
          onSubmit={handleSingup}
        >
          <h1 className="text-3xl m-auto text-gray-200 font-bold ">Signup</h1>
          <label htmlFor="text" className="text-sm text-gray-200">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
          />
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
          {error && <p className="text-red-500">{error}</p>}
          <p className="text-gray-200 ">
            Already have an account?
            <Link
              className="hover:underline text-gray-200 hover:text-blue-600"
              to="/login"
            >
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="px-3 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300  "
          >
            {isLoading ? "Signing you up..." : "Signup"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;
