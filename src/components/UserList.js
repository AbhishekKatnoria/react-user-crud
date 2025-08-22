import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdCheck, MdClose } from "react-icons/md";

export default function UserList({ users, setUsers, columns }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });

  // Update both state and localStorage
  const updateUsers = (newUsers) => {
    setUsers(newUsers);
  };

  const resetForm = () => {
    setForm({ name: "", email: "" });
    setErrors({ name: "", email: "" });
    setEditId(null);
  };

  // Validate form before saving
  const validateForm = () => {
    const newErrors = { name: "", email: "" };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle actions like edit, cancel, save, and delete
  const handleAction = (type, payload) => {
    switch (type) {
      case "edit":
        setEditId(payload.id);
        setForm({ name: payload.name, email: payload.email });
        break;

      case "cancel":
        resetForm();
        break;

      case "save":
        if (!validateForm()) return;

        const updatedUsers = users.map((u) =>
          u.id === payload.id ? { ...u, name: form.name, email: form.email } : u
        );
        updateUsers(updatedUsers);
        resetForm();
        break;

      case "delete":
        const filteredUsers = users.filter((u) => u.id !== payload.id);
        updateUsers(filteredUsers);
        break;

      default:
        console.warn("Unknown action type:", type);
    }
  };

  if (!columns || !Object.values(columns).includes(true)) {
    return (
      <div className="text-center py-4 text-gray-500">No columns selected.</div>
    );
  }

  return (
    <table className="w-full border border-gray-200 rounded-lg shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          {columns["SNo"] && <th className="px-6 py-3 text-left">SNo</th>}
          {columns["Name"] && (
            <th className="px-6 py-3 text-left w-1/3">Name</th>
          )}
          {columns["Email"] && (
            <th className="px-6 py-3 text-left w-1/3">Email</th>
          )}
          {columns["Actions"] && (
            <th className="px-6 py-3 text-center">Actions</th>
          )}
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

        {users.map((user, index) => (
          <tr key={user?.id} className="border-t">
            {columns["SNo"] && <td className="px-6 py-4">{index + 1}</td>}

            {columns["Name"] && (
              <td className="px-6 py-4 w-1/3">
                {editId === user?.id ? (
                  <>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className={`border px-2 py-1 rounded-md w-full ${
                        errors?.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors?.name}</p>
                    )}
                  </>
                ) : (
                  <span className="inline-block w-full">{user?.name}</span>
                )}
              </td>
            )}

            {columns["Email"] && (
              <td className="px-6 py-4 w-1/3">
                {editId === user?.id ? (
                  <>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className={`border px-2 py-1 rounded-md w-full ${
                        errors?.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors?.email}
                      </p>
                    )}
                  </>
                ) : (
                  <span className="inline-block w-full">{user?.email}</span>
                )}
              </td>
            )}
            {columns["Actions"] && (
              <td className="px-6 py-4 flex justify-center space-x-3">
                {editId === user?.id ? (
                  <>
                    <MdCheck
                      fontSize={20}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                      onClick={() => handleAction("save", { id: user?.id })}
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
                      onClick={() => handleAction("edit", user)}
                    />
                    <MdDelete
                      fontSize={20}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => handleAction("delete", { id: user?.id })}
                    />
                  </>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
