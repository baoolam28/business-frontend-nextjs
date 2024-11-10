import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import userAPI from "../../api/auth";

const PasswordChangeModalComponent = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Kiểm tra độ dài và khớp của mật khẩu
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }

    console.log(confirmPassword)
    console.log(newPassword)
    console.log(currentPassword)
    try {
      const fromData = {
        oldPassword: currentPassword , 
        password: newPassword 
      }
      const response = await userAPI.user.updatePassUser(userData.userId, fromData)
      if (response.statusCode === 200) {
        setSuccess(true)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        
        // Đóng modal sau 2 giây khi thành công
        setTimeout(() => {
          setIsOpen(false)
          setSuccess(false)
        }, 2000)
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Thay đổi mật khẩu</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thay đổi mật khẩu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Nhập mật khẩu cũ</Label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Mật khẩu mới</Label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Nhập lại mật khẩu mới</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required />
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-600" role="alert">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          {success && (
            <div className="flex items-center space-x-2 text-green-600" role="alert">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Mật khẩu đã được thay đổi thành công!</span>
            </div>
          )}
          <Button  className="w-full">
            Xác nhận thay đổi
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PasswordChangeModalComponent;
