import React, { useState } from 'react';
import { LayoutDashboard, CheckSquare, Users, FileText, LineChart, Store } from 'lucide-react';

const Sidebar = () => {
  // State để lưu trữ mục hiện tại được chọn
  const [selected, setSelected] = useState();

  return (
    <aside className="w-16 bg-white shadow-md">
      <nav className="mt-5 flex flex-col items-center">
        <a
          href="manage-accounts"
          onClick={() => setSelected('manage-accounts')}
          className={`block p-3 rounded-lg mb-2 ${selected === 'manage-accounts' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          <Users size={24} />
        </a>
        <a
          href="admin-store"
          onClick={() => setSelected('admin-store')}
          className={`block p-3 rounded-lg mb-2 ${selected === 'admin-store' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
        >
          <Store size={24} />
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
