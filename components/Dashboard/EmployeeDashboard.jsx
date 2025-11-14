import React, { useContext, useEffect, useState } from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import { AuthContext } from "../../context/AuthProvider";

const EmployeeDashboard = ({ changeUser, data }) => {
  const [userData] = useContext(AuthContext);
  const [employee, setEmployee] = useState(data);

  // keep employee data in sync with context
  useEffect(() => {
    if (!userData || userData.length === 0) return;
    const updated = userData.find((emp) => emp.id === data.id);
    if (updated) setEmployee(updated);
  }, [userData, data.id]);

  if (!employee) return null;

  return (
    <div className="p-10 bg-[#1C1C1C] h-screen">
      <Header changeUser={changeUser} data={employee} />
      <TaskListNumbers data={employee} />
      <TaskList data={employee} />
    </div>
  );
};

export default EmployeeDashboard;
