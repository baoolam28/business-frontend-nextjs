'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Edit, Plus, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Sidebar from '@/components/Sidebar'

// Mock user data
const users = [
  { id: 1, tenCuaHang: 'Cửa hàng A', diaChiCuaHang: '123 Đường A', thongTinCuaHang: 'Thông tin cửa hàng A', tenChu: 'John Doe', soDienThoai: '1234567890', email: 'john@example.com', maThue: '1234567890123', nganHang: 'Vietcombank', ngayTao: '2023-01-15', status: 'active' },
  { id: 2, tenCuaHang: 'Cửa hàng B', diaChiCuaHang: '456 Đường B', thongTinCuaHang: 'Thông tin cửa hàng B', tenChu: 'Jane Smith', soDienThoai: '9876543210', email: 'jane@example.com', maThue: '9876543210987', nganHang: 'Techcombank', ngayTao: '2023-02-20', status: 'inactive' },
  { id: 3, tenCuaHang: 'Cửa hàng C', diaChiCuaHang: '789 Đường C', thongTinCuaHang: 'Thông tin cửa hàng C', tenChu: 'Bob Johnson', soDienThoai: '1357924680', email: 'bob@example.com', maThue: '1357924680135', nganHang: 'ACB', ngayTao: '2023-03-10', status: 'active' },
  { id: 4, tenCuaHang: 'Cửa hàng D', diaChiCuaHang: '101 Đường D', thongTinCuaHang: 'Thông tin cửa hàng D', tenChu: 'Alice Brown', soDienThoai: '2468013579', email: 'alice@example.com', maThue: '2468013579246', nganHang: 'VPBank', ngayTao: '2023-04-05', status: 'inactive' },
  { id: 5, tenCuaHang: 'Cửa hàng E', diaChiCuaHang: '102 Đường E', thongTinCuaHang: 'Thông tin cửa hàng E', tenChu: 'Charlie Wilson', soDienThoai: '36912141618', email: 'charlie@example.com', maThue: '3691214161836', nganHang: 'MB Bank', ngayTao: '2023-05-12', status: 'active' },
]

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [userStatuses, setUserStatuses] = useState(users.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {}))
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredUsers = users.filter(user =>
    (activeFilter === 'all' || user.status === activeFilter) &&
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())))

  return (
    (<div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 p-8 ml-16">
        <h1 className="text-2xl font-semibold mb-6">Store Management</h1>

        {/* Search and Add User */}
        <div className="flex justify-between mb-6">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 mr-2" />
            <Button variant="outline" onClick={() => setActiveFilter('all')} className="mr-2">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
            <Button
              variant={activeFilter === 'active' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('active')}
              className="mr-2">
              Active
            </Button>
            <Button
              variant={activeFilter === 'inactive' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('inactive')}
              className="mr-2">
              Inactive
            </Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New User
          </Button>
        </div>

        {/* User Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên cửa hàng</TableHead>
                <TableHead>Địa chỉ cửa hàng</TableHead>
                <TableHead>Thông tin cửa hàng</TableHead>
                <TableHead>Tên chủ</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>mã thuế</TableHead>
                <TableHead>Ngân hàng</TableHead>
                 <TableHead>Ngày tạo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.tenCuaHang}</TableCell>
                  <TableCell>{user.diaChiCuaHang}</TableCell>
                  <TableCell>{user.thongTinCuaHang}</TableCell>
                  <TableCell>{user.tenChu}</TableCell>
                  <TableCell>{user.soDienThoai}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.maThue}</TableCell>
                  <TableCell>{user.nganHang}</TableCell>
                  <TableCell>{user.ngayTao}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setUserStatuses(prev => ({ ...prev, [user.id]: 'active' }))}>
                          Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setUserStatuses(prev => ({ ...prev, [user.id]: 'inactive' }))}>
                          Set Inactive
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <span className="text-sm text-gray-700">
              Showing <span className="font-semibold">1</span> to <span className="font-semibold">5</span> of <span className="font-semibold">50</span> results
            </span>
          </div>
          <div className="flex">
            <Button variant="outline" size="sm" className="mr-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </main>
    </div>)
  );
}

