import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useUpdateTaskMutation,useFetchAllTaskMutation } from "../services/appApi";

const EditModal = ({ task, closeModal }) => {
  const { user, setTasks } = useContext(AppContext);
  const [updateTask, { isLoading }] = useUpdateTaskMutation(); 
  const [fetchAllTask] = useFetchAllTaskMutation(); 

  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditedTask((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  async function handleUpdateTask(e) {
    e.preventDefault();
    try {
      const updatedTask = await updateTask({
        userId: user._id,
        ...editedTask,
        taskId: task._id,
      });
      if (updateTask) {
        const userId = user._id;
        const response = await fetchAllTask({ userId });
        setTasks(response.data);
        closeModal();
      }
      
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 ">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleUpdateTask}>
          <div className="mb-4 ">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 p-2 border rounded-md w-full"
              value={editedTask.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="mt-1 p-2 border rounded-md w-full"
              value={editedTask.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="mt-1 p-2 border rounded-md w-full"
              value={editedTask.dueDate}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {isLoading ? "Please Wait..." : "Save"}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
