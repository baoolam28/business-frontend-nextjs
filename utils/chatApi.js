// Import Firebase database functions
import exp from "constants";
import { database } from "./firebase"; // Adjust this path to your firebase configuration
import { ref, get, push, update, set, onValue } from "firebase/database";

// Function to initialize a user with a custom ID
export const initUser = async (user) => {
  // Create user data with custom ID as the key
  const userData = {
    name: user?.name || "",
    avatar: user?.image || "",
  };

  const userRef = ref(database, `users/${user.userId}`);

  try {
    await set(userRef, userData);
    console.log("User initialized successfully");
    return userData; 
  } catch (error) {
    console.log("Error initializing user:", error);
    return null;
  }
};

// Function to fetch messages for a specific chat ID
export const fetchMessages = async (chatId) => {
  try {
    const messagesRef = ref(database, `messages/${chatId}`);
    const snapshot = await get(messagesRef);
    return snapshot.exists() ? snapshot.val() : [];
  } catch (error) {
    console.log("Error fetching messages:", error);
    return []; // Return an empty array on error
  }
};

export const createChat = async (myId, friendId) => {
  try {
    // Generate a unique chat ID based on user IDs
    const chatId = `${myId}_${friendId}`;
    const messagesRef = ref(database, `chats/${chatId}`);

    // Set the initial state of the chat (optional, adjust as needed)
    await set(messagesRef, {
      participants: {
        [myId]: true,
        [friendId]: true,
      },
      lastMessage: "", // Initialize with an empty messages array
      lastTimestamp: new Date().toISOString(),
    });

    // Return the chat ID upon successful creation
    return chatId;
  } catch (error) {
    console.log("Error creating chat:", error);
    return null; // Return null on error
  }
};


export const findChat = async (myId, friendId) => {
  try {

    const chatId1 = `${myId}_${friendId}`;
    const chatId2 = `${friendId}_${myId}`;

    const chatRef1 = ref(database, `chats/${chatId1}`);
    const chatSnapshot1 = await get(chatRef1);
    if (chatSnapshot1.exists()) {
      return chatId1;
    }

    const chatRef2 = ref(database, `chats/${chatId2}`);
    const chatSnapshot2 = await get(chatRef2);
    if (chatSnapshot2.exists()) {
      return chatId2; // Return chatId2 if found
    }

    return null;

  } catch (error) {
    return null;
  }
};


// Function to send a message in a specific chat
export const sendMessage = async (chatId, messageData) => {
  try {
    const messagesRef = ref(database, `messages/${chatId}`);
    const newMessageRef = push(messagesRef);

    await set(newMessageRef, messageData); // Use set to push a new message
    console.log("Message sent successfully");

    // Return the messageData with the new message's ID
    return {
      ...messageData,
      id: newMessageRef.key, // Attach the new message ID
    };
  } catch (error) {
    console.log("Error sending message:", error);
    return null;
  }
};

// Function to get user by ID
export const getUserById = async (userId) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("User not found");
      return null; // Return null if user not found
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null; // Return null on error
  }
};


export const getMessageByChatId = async (chatId) => {
  try {
    const messagesRef = ref(database, `messages/${chatId}`);
    const messagesSnapshot = await get(messagesRef);
    const messages = messagesSnapshot.val();

    // Ensure messages is returned as an array of objects
    return messages ? Object.values(messages) : [];

  } catch (error) {
    console.error("Error fetching histories by chatId:", error);
    return null;
  }
};

export const fetchFriendsList = async (userId) => {
  try {

    // Lấy danh sách chat liên quan đến userId
    const chatsRef = ref(database, `chats`);
    const chatsSnapshot = await get(chatsRef);
    const chats = chatsSnapshot.val();

    // Tạo danh sách bạn bè với thông tin avatar và lastMessage
    const friendsList = [];

    for (const chatId in chats) {
      if (chats.hasOwnProperty(chatId) && chatId.includes(userId)) {
        const [friendId] = chatId.split("_").filter((id) => id !== userId); // Tìm ID bạn bè

        const friendData = await getUserById(friendId);
        if (friendData) {
          friendsList.push({
            chatId: chatId,
            friendId,
            friendName: friendData.name,
            avatar: friendData.avatar,
            lastMessage: chats[chatId]?.lastMessage,
            lastTimestamp: chats[chatId]?.lastTimestamp,
          });
        }
      }
    }

    return friendsList; // Trả về danh sách bạn bè
  } catch (error) {
    console.error("Error fetching friends list:", error);
    return []; 
  }
};


export const fetchAllHistoryByUserId = async (userId) => {
  
  try {
    const chatsRef = ref(database, `chats`);
    const chatsSnapshot = await get(chatsRef);
    const chats = chatsSnapshot.val();

    const histories = [];


    for (const chatId in chats) {
      if (chats.hasOwnProperty(chatId) && chatId.includes(userId)) {
        const message = await getMessageByChatId(chatId);
        histories.push({
          chatId: chatId,
          messages: message,
        });
      }
    }

    return histories; 

  } catch (error) {
    console.error("Failed to fetch all history", error);
    return [];  
  }

};

export const listenForNewMessages = (chatId, callback) => {
  const messagesRef = ref(database, `messages/${chatId}`);

  // Thiết lập listener cho các tin nhắn mới
  onValue(
    messagesRef,
    (snapshot) => {
      const messages = snapshot.val();

      // Kiểm tra xem messages có tồn tại và là một đối tượng không
      if (messages && typeof messages === "object") {
        // Sử dụng reduce để tạo đối tượng messagesObject
        const messagesObject = Object.entries(messages).reduce(
          (acc, [messageId, messageData]) => {
            acc[messageId] = messageData; // Gán từng tin nhắn vào đối tượng theo messageId
            return acc;
          },
          {}
        );

        // Gọi callback với đối tượng tin nhắn đã xử lý
        callback(messagesObject);
      } else {
        console.warn("No messages found or messages is not an object.");
        callback({}); // Gọi callback với đối tượng rỗng nếu không có tin nhắn
      }
    },
    {
      onlyOnce: false, // Thiết lập listener hoạt động liên tục
    }
  );
};


// Export all functions
export default { initUser, fetchMessages, sendMessage, getUserById , fetchAllHistoryByUserId, fetchFriendsList};
