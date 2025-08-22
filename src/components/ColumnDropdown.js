import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function ColumnDropdown({ columns, setColumns }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const handleCheckboxChange = (col) => {
    setColumns((prev) => ({ ...prev, [col]: !prev[col] }));
  };

  return (
    <div className="relative inline-block mb-4">
      <button
        onClick={toggleDropdown}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
      >
        Manage Columns
        <MdKeyboardArrowDown className="w-5 h-5 ms-2" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
          <ul className="p-3 space-y-3 text-sm text-gray-700">
            {Object.keys(columns)?.map((col) => (
              <li key={col}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={col}
                    checked={columns[col]}
                    onChange={() => handleCheckboxChange(col)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor={col} className="ms-2 text-sm font-medium">
                    {col}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
