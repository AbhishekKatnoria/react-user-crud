import { MdDelete, MdOutlineEdit } from "react-icons/md";

export default function UserList({ users }) {
  return (
    <div
      className="relative shadow-md sm:rounded-lg"
      style={{ maxHeight: "600px", overflowY: "auto" }}
    >
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Id</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{row?.name}</td>
                <td className="px-6 py-4">{row?.email}</td>
                <td className="px-6 py-4 space-x-2 flex gap-1 cursor-pointer">
                  <MdOutlineEdit fontSize={20} />
                  <MdDelete fontSize={20} />
                </td>
              </tr>
            ))}
          {users?.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
