import React, { useState } from "react";

export default function AddUser({ setUsers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
    };

    setUsers((prev) => [...prev, newUser]);
    setForm({ name: "", email: "" });
    setIsOpen(false);
  };

  return (
    <div className="p-5 text-end">
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm font-medium"
      >
        Add User
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold text-gray-900">Add User</h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setForm({ name: "", email: "" });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
              >
                Save User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
