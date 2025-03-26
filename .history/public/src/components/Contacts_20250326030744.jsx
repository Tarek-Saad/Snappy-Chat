import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    setCurrentUserName(data?.username);
    setCurrentUserImage(data?.avatarImage);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1e1e2e;
  height: 100%;
  padding: 1rem;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 2.5rem;
    }
    h3 {
      color: white;
      margin-left: 0.5rem;
    }
  }
  .contacts {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem 0;
    .contact {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      border-radius: 8px;
      &:hover {
        background-color: #282a36;
      }
      &.selected {
        background-color: #9a86f3;
      }
      .avatar img {
        height: 3rem;
        border-radius: 50%;
      }
      .username h3 {
        color: white;
      }
    }
  }
  .current-user {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #0d0d30;
    .avatar img {
      height: 4rem;
      border-radius: 50%;
    }
    .username h2 {
      color: white;
    }
  }
`;
