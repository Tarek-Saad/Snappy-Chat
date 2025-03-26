import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts = [], changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      if (data) {
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Container>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h3>Snappy</h3>
      </div>
      <div className="contacts">
        {contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <div
              key={contact._id}
              className={`contact ${index === currentSelected ? "selected" : ""}`}
              onClick={() => {
                setCurrentSelected(index);
                changeChat(contact);
              }}
            >
              <div className="avatar">
                <img src={contact.avatarImage} alt="avatar" />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="no-contacts">No contacts available</p>
        )}
      </div>
      <div className="current-user">
        <div className="avatar">
          <img src={currentUserImage} alt="User Avatar" />
        </div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #1e1e2d;
  color: white;
  height: 100vh;
  width: 100%;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 1rem;
    background: #26263d;
    img {
      height: 2rem;
    }
    h3 {
      font-size: 1.5rem;
      text-transform: uppercase;
    }
  }
  .contacts {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    .contact {
      background: #33334d;
      margin: 0.5rem 0;
      padding: 0.8rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s;
      &:hover, &.selected {
        background: #6a5acd;
      }
      .avatar img {
        height: 3rem;
        border-radius: 50%;
      }
      .username h3 {
        font-size: 1.2rem;
      }
    }
    .no-contacts {
      text-align: center;
      color: gray;
      font-size: 1.2rem;
      margin-top: 2rem;
    }
  }
  .current-user {
    background: #151528;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    .avatar img {
      height: 4rem;
      border-radius: 50%;
    }
    .username h2 {
      font-size: 1.5rem;
    }
  }
`;

