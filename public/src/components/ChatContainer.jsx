import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import Messages from "./Messages"
import axios from 'axios';
import Chat from "../pages/Chat";
import { sendMessageRoute, getAllMessagesRoute } from '../util/APIRoutes';
import { v4 as uuidv4 } from "uuid";




export default function ChatContainer({currentChat}) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    
    const currentUser = JSON.parse(
        localStorage.getItem('chat-app-user')
      );

      
    
    useEffect( () => {
        if(currentChat && currentUser){
            const values = {
                from : currentUser._id,
                to : currentChat._id
            }
            const {from, to} = values;
            async function fetchAPi(){
                const response = await axios.post(getAllMessagesRoute, {
                    from, to,
                  });
                setMessages(response.data);
            }
            fetchAPi();
        }  
    },[currentChat]);
    
    const handleSendMsg = async (msg) =>{
        if (currentChat && currentUser){
        const values = {
            from : currentUser._id,
            to : currentChat._id
            
        }
        const {from, to} = values;
        const setMsg = {
            message : msg
        }
        const {message} = setMsg;

        await axios.post(sendMessageRoute, {
            from, to, message,
          });
    };   
    };


    
    
    
    
  return (
    <>
    { currentChat && (
        <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
    )} 
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
