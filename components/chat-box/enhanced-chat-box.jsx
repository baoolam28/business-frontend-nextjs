"use client";
import { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Maximize2, MessageCircle  } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Input } from "../../components/ui/input";
import { fetchFriendsList, fetchAllHistoryByUserId, sendMessage, initUser, getUserById } from "../../utils/chatApi"; 
import { useStore } from "../../context/StoreContext";
import { useUser } from "../../context/UserContext";
import {useChatContext} from "../../context/chatContext"
export default function EnhancedChatBox() {
  const {isExpanded, setIsExpanded} = useChatContext();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({});
  const [chatMessagesArray, setChatMessagesArray] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [friends, setFriends] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);
  const { store } = useStore();
  const { user } = useUser();
  const socketRef = useRef(null); // Reference for the WebSocket

  // Initialize user for chat
  useEffect(() => {
    const initChatUser = async () => {
      if (chatInfo) {
        const existsUser = await getUserById(chatInfo.userId);
        if (!existsUser) {
          await initUser(chatInfo);
        }
      }
    };
    initChatUser();
  }, [chatInfo]);

  // Set chat information based on store or user context
  useEffect(() => {
    if (store && user) {
      setChatInfo({
        userId: store.storeId,
        name: store.storeName || "",
        avatar: store.image || null,
      });
      return
    } 
    
    if (user) {
      setChatInfo({
        userId: user.id,
        name: user.fullName || 'User',
        avatar: user.image || null,
      });
      return
    }
  }, [store, user]);

  // Fetch friends list and chat histories when chatInfo changes
  useEffect(() => {
    if (chatInfo?.userId) {
      getListFriend(chatInfo.userId);
      getAllHistories(chatInfo.userId);
    }
  }, [chatInfo]);

  // Fetch the list of friends for the current user
  const getListFriend = async (userId) => {
    const res = await fetchFriendsList(userId);
    if (res) {
      setFriends(res);
      setSelectedFriend(res[0] || null); // Automatically select the first friend
    }
  };

  // Fetch all chat histories for the current user
  const getAllHistories = async (userId) => {
    const res = await fetchAllHistoryByUserId(userId);
    if (res && Array.isArray(res)) {  
      const messagesObject = res.reduce((acc, { chatId, messages }) => {
        acc[chatId] = messages || [];
        return acc;
      }, {});
      setMessages(messagesObject);  
    }
  };

  // Establish WebSocket connection
  useEffect(() => {
    if (chatInfo) {
      socketRef.current = new WebSocket(`ws://localhost:8386/${chatInfo.userId }`); // Use 'ws' for WebSocket

      socketRef.current.onmessage = (event) => {
        console.log("received message")
        getAllHistories(chatInfo?.userId)
      };

      return () => {
        socketRef.current.close(); // Close WebSocket connection on cleanup
      };
    }
  }, [chatInfo]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (inputMessage.trim() && selectedFriend) {
      const newMessage = {
        senderId: chatInfo.userId,
        text: inputMessage.trim(),
        timestamp: new Date().toISOString(),
        chatId: selectedFriend.chatId // Include chatId
      };

      await sendMessage(selectedFriend.chatId, newMessage);

      // Send the message through WebSocket
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        const chatIdString = String(selectedFriend.chatId);
        socketRef.current.send(JSON.stringify(chatIdString));
      }

      // Update local messages state
      setMessages((prevMessages) => {
        const currentMessages = Array.isArray(prevMessages[selectedFriend.chatId]) ? prevMessages[selectedFriend.chatId] : [];
        return {
          ...prevMessages,
          [selectedFriend.chatId]: [...currentMessages, newMessage],
        };
      });

      setInputMessage('');

    }
  };

  // Scroll to the bottom of messages whenever messages or selectedFriend changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    if (selectedFriend && messages[selectedFriend.chatId]) {
      const chatMessages = messages[selectedFriend.chatId];
      setChatMessagesArray(Array.isArray(chatMessages) ? chatMessages : []);
    } else {
      setChatMessagesArray([]); // Reset chat messages if no friend is selected
    }
  }, [messages, selectedFriend]);

  // Toggle chat box expansion
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      className="fixed bottom-10 right-4 shadow-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 z-50"
      animate={{ 
        width: isExpanded ? 400 : 56, 
        height: isExpanded ? 550 : 56,
        borderRadius: isExpanded ? 8 : 28
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}>
      <div
        className="bg-transparent text-white p-3 flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}>
        {!isExpanded && (
          <div className="flex items-center justify-center h-full w-full text-white">
            <MessageCircle  size={24} /> {/* Thay ChatIcon bằng biểu tượng chat bạn muốn */}
          </div>
        )}  
        <h3 className="font-semibold">Chat</h3>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 transition-colors duration-200"
          onClick={toggleExpand}>
          {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </Button>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-b-lg">
            <div className="flex h-[540px]">
              <ScrollArea className="w-1/3 border-r border-gray-200 p-2">
                {friends.map((friend) => (
                  <div
                    key={friend.friendId}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${selectedFriend?.friendId === friend.friendId ? 'bg-purple-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedFriend(friend)}>
                    <Avatar>
                      <AvatarImage src={friend.avatar} alt={friend.friendName} />
                      <AvatarFallback>{friend.friendName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium truncate">{friend.friendName}</span>
                  </div>
                ))}
              </ScrollArea>
              <div className="w-2/3 flex flex-col">
                {selectedFriend ? (
                  <>
                    <div className="p-3 bg-purple-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={selectedFriend.avatar} alt={selectedFriend.friendName} />
                          <AvatarFallback>{selectedFriend.friendName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{selectedFriend.friendName}</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedFriend(null)}>
                        <X size={20} />
                      </Button>
                    </div>
                    <ScrollArea className="flex-grow p-4">
                      {chatMessagesArray.map((message) => (
                        <div
                          key={message.timestamp}
                          className={`mb-2 flex ${message.senderId === chatInfo.userId ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={`rounded-lg p-2 max-w-[80%] ${message.senderId === chatInfo.userId ? 'bg-purple-500 text-white' : 'bg-gray-200 text-black'}`}>
                            {message.text}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </ScrollArea>
                    <div className="flex items-center p-2 border-t">
                      <Input
                        type="text"
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} className="ml-2">
                        <Send />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400">Select a friend to chat</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
