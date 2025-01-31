export default function Navbar({ toggleSidebar }) {
  return (
    <div className="flex items-center bg-blue-600 text-white p-4 shadow-md sticky top-0 z-10">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 mr-4 rounded bg-blue-700 hover:bg-blue-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <div className="text-lg font-bold">Responsive Navbar & Sidebar</div>
    </div>
  );
}
