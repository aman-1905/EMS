import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AcceptTask = ({ data }) => {
  const [userData, setUserData] = useContext(AuthContext);

  // Helper function to update task state
  const updateTaskStatus = (taskId, statusKey) => {
    const updatedUsers = userData.map((emp) => {
      const updatedTasks = emp.tasks.map((task) => {
        if (task.taskTitle === taskId) {
          // Reset all task status flags first
          const updatedTask = {
            ...task,
            active: false,
            completed: statusKey === "completed",
            failed: statusKey === "failed",
            newTask: false,
          };
          return updatedTask;
        }
        return task;
      });

      // Recalculate taskCounts
      const newCounts = {
        newTask: updatedTasks.filter((t) => t.newTask).length,
        active: updatedTasks.filter((t) => t.active).length,
        completed: updatedTasks.filter((t) => t.completed).length,
        failed: updatedTasks.filter((t) => t.failed).length,
      };

      return { ...emp, tasks: updatedTasks, taskCounts: newCounts };
    });

    setUserData(updatedUsers);
    localStorage.setItem("employees", JSON.stringify(updatedUsers));
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-red-400 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-sm px-3 py-1 rounded">{data.category}</h3>
        <h4 className="text-sm">{data.taskDate}</h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
      <p className="text-sm mt-2">{data.taskDescription}</p>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => updateTaskStatus(data.taskTitle, "completed")}
          className="bg-green-500 rounded font-medium py-1 px-2 text-xs hover:bg-green-600"
        >
          Mark as Completed
        </button>
        <button
          onClick={() => updateTaskStatus(data.taskTitle, "failed")}
          className="bg-red-500 rounded font-medium py-1 px-2 text-xs hover:bg-red-600"
        >
          Mark as Failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
