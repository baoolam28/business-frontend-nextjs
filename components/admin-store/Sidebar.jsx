import React, { useState } from 'react';
import { LayoutDashboard, CheckSquare, Users, FileText, LineChart, Store } from 'lucide-react';
import IconButton from "../../components/component/IconButton";
import AccountDropdown from "../../components/component/account-dropdown";
import { useUser } from "../../context/UserContext"
const Sidebar = () => {
  // State để lưu trữ mục hiện tại được chọn
  const [selected, setSelected] = useState();
  const {user} = useUser();

  return (
    <aside className="w-16 bg-white shadow-md">
      <nav className="mt-5 flex flex-col items-center">
        <div>
          {user ? ( // Nếu có thông tin user thì hiển thị dropdown
            <AccountDropdown user={user} />
          ) : ( // Nếu chưa có user thì hiển thị nút đăng nhập
            <a href="/login">
              <IconButton
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/505a01368e57ac667ecd551fd161eb3fa8202cee72841e5b11d9f712055e4607?placeholderIfAbsent=true&apiKey=907845159c31450ca87b5b226dbf1f02"
                alt="User profile"
              />
            </a>
          )}
        </div>
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
