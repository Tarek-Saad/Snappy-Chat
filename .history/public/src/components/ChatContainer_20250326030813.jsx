import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    axios.post(recieveMessageRoute, {
      from: currentChat._id,
      to: currentChat._id,
    }).then(response => {
      setMessages(response.data);
    });
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentChat._id,
      to: currentChat._id,
      message: msg,
    });
    setMessages([...messages, { fromSelf: true, message: msg }]);
  };

  return (
    <Container>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={uuidv4()} className={`message ${message.fromSelf ? "sent" : "received"}`}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  background-color: #1e1e2e;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  .message {
    background-color: #44475a;
    padding: 1rem;
    border-radius: 8px;
  }
`;
