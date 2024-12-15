import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { StoreProvider } from "../context/StoreContext";
import { UserProvider } from "../context/UserContext";
import { ChatProvider } from "../context/chatContext"

import EnhancedChatBox from "../components/chat-box/enhanced-chat-box";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body suppressHydrationWarning={true}>
        <SessionProvider>
          <UserProvider>
            <StoreProvider>
              <ChatProvider>
                <EnhancedChatBox isVisible={true}/>
                {children}
              </ChatProvider>
            </StoreProvider>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
