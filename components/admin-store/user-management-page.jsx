'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { ChevronLeft, ChevronRight, Edit, Plus, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Sidebar from '../../components/admin-store/Sidebar';
import adminAPI from '../../api/admin';
import { showSuccessAlert } from '../../utils/reactSweetAlert'
import { format } from 'date-fns';
const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [store, setStore] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredStores, setFilteredStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await adminAPI.store.getAllStore();
        console.log("API Response:", response);

        if (response.statusCode === 200) {
          setStore(response.data);
          setFilteredStores(response.data);
        } else {
          console.error("Error fetching stores:", response.message);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    let filtered = store;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(store => store.active === (activeFilter === 'active'));
    }

    if (searchTerm) {
      filtered = filtered.filter(store =>
        store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.storeEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.storeManagerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStores(filtered);
  }, [activeFilter, searchTerm, store]);

  const handleStatusChange = async (storeId, active) => {
    try {
      const response = await adminAPI.store.updateStore(storeId, active);
      console.log("Response:", response.statusCode);
  
      if (response.statusCode === 200) {
        showSuccessAlert("thành công" , "cập nhật thành công")
        // Gọi lại API để lấy dữ liệu cửa hàng mới
        const updatedStoresResponse = await adminAPI.store.getAllStore();
        if (updatedStoresResponse.statusCode === 200) {
          setStore(updatedStoresResponse.data);
          setFilteredStores(updatedStoresResponse.data); // Làm mới bảng từ dữ liệu mới
        } else {
          showCustomAlert("thành công" , "cập nhật thành công")
        }
      } else {
        alert(`Failed to update store: ${response.message}`);
      }
    } catch (error) {
      console.error("Error updating store status:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 ml-10 max-w-full overflow-x-auto">
        <h1 className="text-2xl font-semibold mb-6">Quảng lý cửa hàng</h1>

        {/* Search and Add User */}
        <div className="flex flex-wrap justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            <Input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 mr-2" />
            <Button variant="outline" onClick={() => setActiveFilter('all')} className="mr-2">
              <Search className="mr-2 h-4 w-4" /> Tất cả
            </Button>
            <Button
              variant={activeFilter === 'active' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('active')}
              className="mr-2">
              Hoạt động
            </Button>
            <Button
              variant={activeFilter === 'inactive' ? 'default' : 'outline'}
              onClick={() => setActiveFilter('inactive')}
              className="mr-2">
              Không hoạt động
            </Button>
          </div>
        </div>

        {/* Store Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Tên </TableHead>
                <TableHead>Địa chỉ </TableHead>
                <TableHead>Thông tin</TableHead>
                <TableHead>Chủ</TableHead>
                <TableHead>Điện thoại</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Thuế</TableHead>
                <TableHead>Ngân hàng</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Chức năng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store, index) => (
                <TableRow key={store.storeId}>
                  {/* Thay store.storeId bằng index + 1 để tạo số thứ tự */}
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{store.storeName}</TableCell>
                  <TableCell>
                    {store.storeLocation}{" "}
                    {store.district}{" "}
                    {store.province}{" "}
                    {store.pickupAddress}
                  </TableCell>
                  <TableCell>{store.storeDescription}</TableCell>
                  <TableCell>{store.storeManagerName}</TableCell>
                  <TableCell>{store.storeManagerPhone}</TableCell>
                  <TableCell>{store.storeEmail}</TableCell>
                  <TableCell>{store.storeTaxCode}</TableCell>
                  <TableCell>{store.storeBankAccount}</TableCell>
                  <TableCell>{format(new Date(store.createdAt), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        store.active ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                      {store.active ? 'Active' : 'Inactive'}
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
                          onClick={() => handleStatusChange(store.storeId, true)}>
                          Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(store.storeId, false)}>
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
    </div>
  );
};

export default UserManagementPage;
