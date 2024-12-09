import React from 'react'
import { LayoutDashboard, CheckSquare, Users, FileText, LineChart } from 'lucide-react'

const Sidebar = () => {
  return (
    (<aside className="w-16 bg-white shadow-md">
      <nav className="mt-5 flex flex-col items-center">
        <a
          href="#"
          className="block p-3 text-gray-600 hover:bg-gray-200 rounded-lg mb-2">
          <LayoutDashboard size={24} />
        </a>
        <a
          href="#"
          className="block p-3 text-gray-600 hover:bg-gray-200 rounded-lg mb-2">
          <CheckSquare size={24} />
        </a>
        <a href="#" className="block p-3 bg-blue-500 text-white rounded-lg mb-2">
          <Users size={24} />
        </a>
        <a
          href="#"
          className="block p-3 text-gray-600 hover:bg-gray-200 rounded-lg mb-2">
          <FileText size={24} />
        </a>
        <a
          href="#"
          className="block p-3 text-gray-600 hover:bg-gray-200 rounded-lg mb-2">
          <LineChart size={24} />
        </a>
      </nav>
    </aside>)
  );
}

export default Sidebar

