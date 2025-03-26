import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data?.username);
      setCurrentUserImage(data?.avatarImage);
    };
    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
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
  background-color: #1e1e2f;
  color: white;
  border-radius: 10px;
  overflow: hidden;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 1rem;
    background: linear-gradient(135deg, #6e8efb, #a777e3);
    img {
      height: 2rem;
    }
    h3 {
      font-weight: bold;
    }
  }

  .contacts {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    .contact {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;
      &:hover, &.selected {
        background-color: #3b3b5b;
      }
      .avatar img {
        height: 3rem;
        border-radius: 50%;
      }
    }
  }

  .current-user {
    padding: 1rem;
    background-color: #292945;
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar img {
      height: 3rem;
      border-radius: 50%;
    }
  }
`;
