import { useEffect, useState } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  // Sync localStorage automatically
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <div className="mx-5">
      <AddUser setUsers={setUsers} />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
