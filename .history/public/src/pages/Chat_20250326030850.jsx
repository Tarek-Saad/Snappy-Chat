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
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!storedUser) {
        navigate("/login");
        return;
      }
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
      if (currentUser.isAvatarImageSet) {
        axios.get(`${allUsersRoute}/${currentUser._id}`).then((response) => {
          setContacts(response.data);
        });
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser, navigate]);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={setCurrentChat} />
        {currentChat ? <ChatContainer currentChat={currentChat} socket={socket} /> : <Welcome />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #121212;
  .container {
    width: 90%;
    height: 90%;
    display: grid;
    grid-template-columns: 30% 70%;
    background: #1e1e2d;
    border-radius: 10px;
    overflow: hidden;
  }
`;
