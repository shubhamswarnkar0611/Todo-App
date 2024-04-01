import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useCreateTaskMutation } from "../../services/appApi";

const AddTask = () => {
  const { user, setUser } = useContext(AppContext);
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const navigate = useNavigate();

  async function handleAddTask(e) {
    e.preventDefault();
    if (!user) throw new Error("Invalid User");
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;

    try {
      const task = await createTask({
        userId: user._id,
        title,
        description,
        dueDate,
      });
      if (!task) throw new Error("Error creating the Task");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <Navbar />
      {user ? (
        <div className="flex  justify-center items-center h-[90vh]  ">
          <form
            className="flex flex-col space-y-4 lg:m-16 lg:w-1/4  p-10  border-slate-300  bg-neutral-900 rounded-xl"
            onSubmit={handleAddTask}
          >
            <h1 className="text-3xl m-auto text-gray-200 font-bold ">
              Add New Todo
            </h1>
            <label htmlFor="title" className="text-sm text-gray-200">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
            />
            <label htmlFor="description" className="text-sm text-gray-200">
              Description
            </label>
            <input
              type="textarea"
              id="description"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
            />

            <label htmlFor="dueDate" className="text-sm text-gray-200">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300 "
            />

            <button
              type="submit"
              className="px-3 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300  "
            >
              {isLoading ? "Adding Task..." : "Add Task"}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-44 rounded-xl  ">
          <h1 className="bg-red-400 py-10 px-16 text-xl rounded-xl">Please Login First</h1>
        </div>
      )}
    </>
  );
};

export default AddTask;
