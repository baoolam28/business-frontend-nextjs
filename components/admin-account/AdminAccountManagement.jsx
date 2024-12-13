"use client"
import { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { toast } from "../../components/admin-account/use-toast"
import Sidebar from '../../components/admin-store/Sidebar'
import adminAPI from '../../api/admin'
import { showSuccessAlert ,showErrorAlert } from '../../utils/reactSweetAlert'
const AdminAccountManagement = () => {
  const [accounts, setAccounts] = useState([])
  const [newAccount, setNewAccount] = useState({
    username: '',
    phoneNumber: '',
    fullName: '',
    email: '',
    password: '',
  })

  // Fetch all accounts from the API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await adminAPI.account.getAllAccountAdmin() // Gọi API để lấy danh sách tài khoản
        console.log("API Response:", response)

        if (response.statusCode === 200) {
          setAccounts(response.data) // Cập nhật state với dữ liệu trả về
        } else {
          console.error("Error fetching accounts:", response.message)
        }
      } catch (error) {
        console.error("Error fetching accounts:", error)
        toast({
          title: "Error",
          description: "There was an issue fetching the accounts.",
          variant: "destructive",
        })
      }
    }

    fetchAccounts() // Gọi hàm fetchAccounts khi component render
  }, []) // Chỉ gọi 1 lần khi component được mount

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAccount((prev) => ({ ...prev, [name]: value }))
  }

  const addAccount = async (e) => {
    e.preventDefault()
    if (newAccount.username && newAccount.phoneNumber && newAccount.fullName && newAccount.email && newAccount.password) {
      try {
        // Gọi API để tạo tài khoản
        const response = await adminAPI.account.createAccount(newAccount)

        if (response.statusCode === 200) { 
          setAccounts([...accounts, response.data])  
          setNewAccount({ username: '', phoneNumber: '', fullName: '', email: '', password: '' })
          showSuccessAlert("thành công", "Thêm thành công")
        } else {
          showErrorAlert("Thất bại" , "Thêm thất bại")
        }
      } catch (error) {
        showErrorAlert("Thất bại" , "Thêm thất bại")
      }
    }
  }

  const deleteAccount = async(userId) => {
    try {
      const response = await adminAPI.account.deleteAccount(userId); 
      if(response.statusCode === 200) {
        setAccounts(updatedAccountsResponse.data);
        showSuccessAlert("thành công", "Xóa thành công")
      }else { 
        showErrorAlert("Thất bại" , "Xóa thất bại")
      }
    } catch (error) {
      showErrorAlert("Thất bại" , "Xóa thất bại")
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        <form onSubmit={addAccount} className="space-y-4">
          <h2 className="text-xl font-semibold">Thêm tài khoản admin</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Username"
              name="username"
              value={newAccount.username}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Phone Number"
              name="phoneNumber"
              value={newAccount.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Full Name"
              name="fullName"
              value={newAccount.fullName}
              onChange={handleInputChange}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={newAccount.email}
              onChange={handleInputChange}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={newAccount.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Thêm</Button>
          </div>
        </form>

        <div>
          <h2 className="text-xl font-semibold mb-4">Thông tin các tài khoản</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tài khoản</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.userId}>
                  <TableCell>{account.username}</TableCell>
                  <TableCell>{account.phoneNumber}</TableCell>
                  <TableCell>{account.fullName}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => deleteAccount(account.userId)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default AdminAccountManagement
