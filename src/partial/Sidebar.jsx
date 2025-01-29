import { Link } from "react-router-dom";

export default function Sidebar({ isOpen,logout }) {
    return (
      <div
        className={`fixed z-20 inset-0 bg-gray-800 text-white w-64 transform \
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} \
          transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto lg:w-64`}
      >
        <div className="p-4 text-xl font-bold">Sidebar</div>
        <ul className="p-4 space-y-2">
            <li className="hover:bg-gray-700 p-2 rounded">
              <Link to={"/"}>Dashboard</Link>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <Link to={"/settings"}>Settings</Link>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded" >
              <Link onClick={logout} to={"/logout"}>Logout</Link>
            </li>
          </ul>
      </div>
    );
  }
  