import { useEffect, useState } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import ColumnDropdown from "./components/ColumnDropdown";

function App() {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  const [columns, setColumns] = useState({
    SNo: true,
    Name: true,
    Email: true,
    Actions: true,
  });

  // Sync localStorage automatically
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <div className="mx-5  mt-4 ">
      <div className="flex justify-end gap-4">
        <ColumnDropdown columns={columns} setColumns={setColumns} />
        <AddUser setUsers={setUsers} />
      </div>
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
