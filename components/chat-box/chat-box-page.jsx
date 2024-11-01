"use client"
import { useState, useEffect } from "react"
import {fetchAllHistoryByUserId, fetchFriendsList} from "../../utils/chatApi"
import {useUser} from "../../context/UserContext"
const ChatBoxPage = () => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const {user} = useUser();

    // useEffect(() => {
    //     const messagesRef = ref(database, "messages");
    //     onValue(messagesRef, (snapshot) => {
    //     const data = snapshot.val();
    //     const chatMessages = data ? Object.values(data) : [];
    //     setMessages(chatMessages);
    //     });
    // }, []);

    // const sendMessage = () => {
    //     if (input.trim()) {
    //     const messagesRef = ref(database, "messages");
    //     push(messagesRef, {
    //         text: input,
    //         timestamp: Date.now(),
    //     });
    //     setInput("");
    //     }
    // };

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         if (user) {
    //             const res = await getUserById(user.id);
    //             if (!res) {
    //                 const res = await initUser(user);
    //             }
    //         }
    //     };

    //     fetchUserData();
    // }, [user]);

    useEffect(async () => {
        const userId = "userId1"
        const friendsList = await fetchFriendsList(userId);
        console.log("friendsList: ", friendsList);
        const history = await fetchAllHistoryByUserId(userId);
        console.log("history: ", history);
    },[])


    return (
        <>
            {/* <div className="chat-box">
            <div className="messages">
                {messages.map((msg, index) => (
                <div key={index} className="message">
                    {msg.text}
                </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
            </div> */}
        </>
    )
}

export default ChatBoxPage; 