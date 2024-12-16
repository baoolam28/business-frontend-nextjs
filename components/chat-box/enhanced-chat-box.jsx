"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Maximize2, MessageCircle, Smile, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Input } from "../../components/ui/input";
import { fetchFriendsList, fetchAllHistoryByUserId, sendMessage, initUser, getUserById } from "../../utils/chatApi";
import { useUser } from "../../context/UserContext";
import { useChatContext } from "../../context/chatContext";
import ImageAPI from "../../api/upload";
import EmojiPicker from 'emoji-picker-react';
import { useRouter } from "next/navigation";



const  EnhancedChatBox = ({isVisible}) => {
  const router = useRouter();
  const hiddenPages = ["/login", "/register", "/admin","/unauthorized"];
  const shouldShowChatBox = hiddenPages.includes(router.pathname);


  const { isExpanded, setIsExpanded } = useChatContext();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState({});
  const [chatMessagesArray, setChatMessagesArray] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [friends, setFriends] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);
  const { user } = useUser();
  const socketRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [fileSelected, setFileSelected] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  
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

    if (user) {
      setChatInfo({
        userId: user.id,
        name: user.fullName || 'User',
        avatar: user.image || null,
      });
      return;
    }
  }, [user]);

  // Fetch friends list and chat histories when chatInfo changes
  useEffect(() => {
    if (chatInfo?.userId) {
      getListFriend(chatInfo.userId);
      getAllHistories(chatInfo.userId);
    }
  }, [chatInfo]);

  const getListFriend = async (userId) => {
    const res = await fetchFriendsList(userId);
    if (res) {
      setFriends(res);
      setSelectedFriend(res[0] || null);
    }
  };

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
      socketRef.current = new WebSocket(`ws://localhost:8386/${chatInfo.userId}`);

      socketRef.current.onmessage = () => {
        getAllHistories(chatInfo?.userId);
      };

      return () => {
        socketRef.current.close();
      };
    }
  }, [chatInfo]);

  const handleSendMessage = async () => {
    if ((inputMessage.trim() || fileSelected) && selectedFriend) {
      let imageUrl = null;

      // Handle file upload (use Firebase or other service)
      if (fileSelected) {
        imageUrl = await uploadImage(fileSelected);
      }

      const newMessage = {
        senderId: chatInfo.userId,
        text: inputMessage.trim(),
        timestamp: new Date().toISOString(),
        chatId: selectedFriend.chatId,
        image: imageUrl || null,
      };

      await sendMessage(selectedFriend.chatId, newMessage);

      // Send the message through WebSocket
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        const chatIdString = String(selectedFriend.chatId);
        socketRef.current.send(JSON.stringify(chatIdString));
      }

      setMessages((prevMessages) => {
        const currentMessages = Array.isArray(prevMessages[selectedFriend.chatId]) ? prevMessages[selectedFriend.chatId] : [];
        return {
          ...prevMessages,
          [selectedFriend.chatId]: [...currentMessages, newMessage],
        };
      });

      setInputMessage('');
      setImageSelected(null);
      setFileSelected(null);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target.result; 
            setImageSelected(imageUrl);
            setFileSelected(file);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleDeleteImage = () => {
    setImageSelected(null);
    setFileSelected(null);
  };

  const uploadImage = async (file) => {
    if (file) {
      const data = new FormData();
      data.set('image', file);
      const response = await ImageAPI.uploadImage(data);
      if (response.statusCode === 200) {
        const imageUrl = response.data.imageUrl;
        return imageUrl;
      } else {
        return null;
      }
    };
  }

  const handleEmojiClick = (emojiObject) => {
    setInputMessage((prev) => prev + emojiObject.emoji);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    if (selectedFriend && messages[selectedFriend.chatId]) {
      const chatMessages = messages[selectedFriend.chatId];
      setChatMessagesArray(Array.isArray(chatMessages) ? chatMessages : []);
    } else {
      setChatMessagesArray([]);
    }
  }, [messages, selectedFriend]);

    useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessagesArray]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  if(isVisible) return null;

  return (
    <>
      {shouldShowChatBox && (
        <motion.div
          className="fixed bottom-10 right-4 shadow-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 z-50"
          animate={{
            width: isExpanded ? 400 : 56,
            height: isExpanded ? 550 : 56,
            borderRadius: isExpanded ? 8 : 28,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="bg-transparent text-white p-3 flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
            {!isExpanded && (
              <div className="flex items-center justify-center h-full w-full text-white">
                <MessageCircle size={24} />
              </div>
            )}
            <h3 className="font-semibold">Chat</h3>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 transition-colors duration-200"
              onClick={toggleExpand}
            >
              {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </Button>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-b-lg"
              >
                <div className="flex h-[540px]">
                  <ScrollArea className="w-1/3 border-r border-gray-200 p-2">
                    {friends.map((friend) => (
                      <div
                        key={friend.friendId}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                          selectedFriend?.friendId === friend.friendId ? 'bg-purple-100' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedFriend(friend)}
                      >
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
                          {chatMessagesArray.map((message, index) => (
                            <div
                              key={index}
                              className={`mb-2 flex ${message.senderId === chatInfo.userId ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`rounded-lg p-2 max-w-[80%] ${
                                  message.senderId === chatInfo.userId
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-gray-200 text-black'
                                }`}
                              >
                                {message.text && <span>{message.text}</span>}
                                {message.image && (
                                  <img
                                    src={message.image}
                                    alt="Uploaded"
                                    className="mt-2 max-w-[100px] h-auto rounded"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                        </ScrollArea>
                        <div className="flex items-center p-3 bg-gray-100 gap-2">
                          <div className="relative">
                            {imageSelected && (
                              <div className="flex items-center gap-2 mt-2">
                                <img
                                  src={imageSelected}
                                  alt="Selected"
                                  className="max-w-[50px] max-h-[50px] rounded"
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"

                                  onClick={handleDeleteImage}
                                  className="absolute max-w-[20px] max-h-[20px] top-0 right-0"
                                >
                                  <X size={2} />
                                </Button>
                              </div>
                            )}
                          </div>

                          <button onClick={() => setShowPicker(!showPicker)}>
                              {showPicker ? '😡' : '😘'}
                            </button>
                            {showPicker && (
                              <div className="absolute bottom-5 left-0 z-50 bg-white rounded-lg shadow-lg p-4">
                                <EmojiPicker
                                  onEmojiClick={handleEmojiClick}
                                  pickerStyle={{ width: '100%' }}
                                />
                              </div>
                            )}
                          <Button onClick={handleImageUpload} variant="ghost" size="icon">
                            <ImageIcon size={20} />
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                          <Input
                            placeholder="Type a message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          <Button variant="primary" size="icon" onClick={() => handleSendMessage()}>
                            <Send size={20} />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex-grow flex items-center justify-center">
                        <p className="text-gray-400 text-sm">Select a conversation to start chatting</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}

export default EnhancedChatBox;
