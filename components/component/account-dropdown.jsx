'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { User, Settings, LogOut } from 'lucide-react'
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function UserDropdown({user}) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();

  const onProfileClick = () => {router.push('/account')};

  const onSettingsClick = () => {};

  const onLogoutClick = () => {
    signOut();
    window.location.href = "/login";
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar
          className="cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <AvatarImage src={user?.avatar || "/placeholder.svg?height=40&width=40"} alt="User avatar" />
          <AvatarFallback>{user?.initials || "JD"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56" 
        align="end"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex items-center gap-2 p-2">
          <div className="rounded-full overflow-hidden">
            <img src={user?.image || "/placeholder.svg?height=64&width=64"} alt="User profile" className="h-16 w-16 object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user?.fullName || "John Doe"}</span>
            <span className="text-xs text-muted-foreground">{user?.username || "john.doe@example.com"}</span>
          </div>
        </div>
        <DropdownMenuItem onClick={onProfileClick}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettingsClick}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogoutClick}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
