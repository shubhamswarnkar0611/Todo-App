import React, { useState, useContext } from "react";
import EditModal from "./EditModal";
import { AppContext } from "../context/AppContext";
import {
  useDeleteTaskMutation,
  useFetchAllTaskMutation,
} from "../services/appApi";

const Tasklist = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setTasks } = useContext(AppContext);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const [fetchAllTask] = useFetchAllTaskMutation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  async function handleDeleteTask(e) {
    try {
      e.preventDefault();
      await deleteTask({ userId: user._id, taskId: props.task._id });
      const userId = user._id;
      const response = await fetchAllTask({ userId });
      setTasks(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div class="w-96 bg-neutral-100 border-teal-300 border-2 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-10 hover:shadow-sm">
        <div class="px-6 py-4">
          <div class="flex justify-between">
            <a class="text-xl text-neutral-800 hover:underline font-semibold p-2 truncate">
              {props.task.title}
            </a>
            <p class="border-slate-200 border-2 text-sm rounded-xl  p-2 text-red-500">
              Due:-{props.task.dueDate}
            </p>
          </div>
          <p class="text-slate-500 px-3 py-5  truncate flex justify-center">
            {props.task.description}
          </p>
        </div>
        <div class="px-6 py-4">
          <div class="flex w-full justify-evenly">
            <button
              class="bg-teal-400 px-4 py-2 w-1/4 rounded-lg text-center text-slate-100 mr-2 my-2 flex items-center justify-center hover:bg-blue-600"
              onClick={toggleModal}
            >
              Edit
            </button>
            <button
              class="bg-red-500 w-1/4 rounded-lg hover:bg-red-600 text-center text-slate-100 my-2 flex items-center justify-center"
              onClick={handleDeleteTask}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <EditModal task={props.task} closeModal={toggleModal} />}
    </>
  );
};

export default Tasklist;
