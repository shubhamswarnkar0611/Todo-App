import React, { useEffect, useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import Tasklist from "../../components/Tasklist";
import { AppContext } from "../../context/AppContext";
import { useFetchAllTaskMutation } from "../../services/appApi";
import SearchComponent from "../../components/SearchComponent";

const Home = () => {
  const { user, setUser, tasks, setTasks } =
    useContext(AppContext);
  const [isTaskFound, setIsTaskFound] = useState(false);
  const [filterTasks, setFilterTasks] = useState([]);
  const [fetchAllTask, { isLoading }] = useFetchAllTaskMutation();
  useEffect(() => {
    if (user) {
      getTasks();
    }
  }, [setUser]);

  async function getTasks() {
    try {
      const userId = user._id;
      const response = await fetchAllTask({ userId });
      if (response.data.length === 0) {
        return setIsTaskFound(false);
      }
      setIsTaskFound(true);
      setFilterTasks(response.data);
      setTasks(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    const search=document.getElementById("search").value;
    console.log(search)
    const filteredTasks = filterTasks.filter(task => task.title.toLowerCase().includes(search.toLowerCase()));
    setTasks(filteredTasks);
  }
  return (
    <>
      <Navbar />
      {user ? (
        <>
          <SearchComponent onSearch={handleSearch} />
          <div className="flex justify-center flex-wrap">
            {isTaskFound ? (
              tasks.map((task) => {
                return <Tasklist task={task} key={task._id} />;
              })
            ) : (
              <div className="flex justify-center items-center mt-44 ">
                <h1 className="bg-lime-200 py-10 px-16 text-xl rounded-xl">
                  No Task Found{" "}
                </h1>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-44 rounded-xxl">
          <h1 className="bg-red-400 py-10 px-16 text-xl rounded-xl">
            Please Login First
          </h1>
        </div>
      )}
    </>
  );
};

export default Home;
