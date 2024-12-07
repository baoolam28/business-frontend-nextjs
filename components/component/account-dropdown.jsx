'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { User, Settings, LogOut } from 'lucide-react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onProfileClick = () => {
    router.push('/account');
  };

  const onSettingsClick = () => {};

  const onLogoutClick = async () => {
    await signOut({
      callbackUrl: '/login', // Đường dẫn của trang login
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar
          className="cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <AvatarImage src={user?.image || "/placeholder.svg"} alt="User avatar" />
          <AvatarFallback>{user?.initials || "JD"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64" 
        align="end"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex items-center gap-3 p-3">
          {/* Ensuring the image stays circular */}
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img 
              src={user?.image || "/placeholder.svg"} 
              alt="User profile" 
              className="h-full w-full object-cover rounded-full" 
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {user?.fullName || "John Doe"}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
              {user?.username || "john.doe@example.com"}
            </span>
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
  );
}
