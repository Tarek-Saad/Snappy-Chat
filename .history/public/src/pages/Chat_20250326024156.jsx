import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="content-container">
          <ContactsWrapper>
            <Contacts contacts={contacts} changeChat={handleChatChange} />
          </ContactsWrapper>
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainerWrapper>
              <ChatContainer currentChat={currentChat} socket={socket} />
            </ChatContainerWrapper>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f4f8;
`;

const ContactsWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  width: 100%;
  max-width: 350px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  }
`;

const ChatContainerWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  }
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 15px;
  max-width: 1200px;
  width: 100%;
  height: 85vh;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 1080px) {
    grid-template-columns: 1fr 2fr;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const MessageBubble = styled.div`
  display: inline-block;
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: ${({ isSender }) => (isSender ? "#4CAF50" : "#E0E0E0")};
  color: ${({ isSender }) => (isSender ? "#fff" : "#333")};
  font-size: 16px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  align-self: ${({ isSender }) => (isSender ? "flex-end" : "flex-start")};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const MessageInput = styled.input`
  width: 85%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 30px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-right: 10px;

  &:focus {
    border: 2px solid #4CAF50;
  }
`;

const SendButton = styled.button`
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
