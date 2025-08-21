import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdCheck, MdClose } from "react-icons/md";

export default function UserList({ users, setUsers }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  // Update both state and localStorage
  const updateUsers = (newUsers) => {
    setUsers(newUsers);
  };

  // Handle actions like edit, cancel, save, and delete
  const handleAction = (type, payload) => {
    switch (type) {
      case "edit":
        setEditId(payload.id);
        setForm({ name: payload.name, email: payload.email });
        break;

      case "cancel":
        setEditId(null);
        setForm({ name: "", email: "" });
        break;

      case "save": {
        const updatedUsers = users.map((u) =>
          u.id === payload.id ? { ...u, name: form.name, email: form.email } : u
        );
        updateUsers(updatedUsers);
        setEditId(null);
        setForm({ name: "", email: "" });
        break;
      }

      case "delete": {
        const filteredUsers = users.filter((u) => u.id !== payload.id);
        updateUsers(filteredUsers);
        break;
      }

      default:
        console.warn("Unknown action type:", type);
    }
  };

  return (
    <table className="w-full border border-gray-200 rounded-lg shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left">SNo</th>
          <th className="px-6 py-3 text-left w-1/3">Name</th>
          <th className="px-6 py-3 text-left w-1/3">Email</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500">
              No records found.
            </td>
          </tr>
        )}

        {users.map((u, i) => (
          <tr key={u.id} className="border-t">
            <td className="px-6 py-4">{i + 1}</td>
            <td className="px-6 py-4 w-1/3">
              {editId === u.id ? (
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border px-2 py-1 rounded-md w-full"
                />
              ) : (
                <span className="inline-block w-full">{u.name}</span>
              )}
            </td>
            <td className="px-6 py-4 w-1/3">
              {editId === u.id ? (
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border px-2 py-1 rounded-md w-full"
                />
              ) : (
                <span className="inline-block w-full">{u.email}</span>
              )}
            </td>
            <td className="px-6 py-4 flex justify-center space-x-3">
              {editId === u.id ? (
                <>
                  <MdCheck
                    fontSize={20}
                    className="text-green-600 hover:text-green-800 cursor-pointer"
                    onClick={() => handleAction("save", { id: u.id })}
                  />
                  <MdClose
                    fontSize={20}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={() => handleAction("cancel")}
                  />
                </>
              ) : (
                <>
                  <FaRegEdit
                    fontSize={20}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleAction("edit", u)}
                  />
                  <MdDelete
                    fontSize={20}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => handleAction("delete", { id: u.id })}
                  />
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
