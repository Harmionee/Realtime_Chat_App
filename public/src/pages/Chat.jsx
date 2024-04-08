 import React, {useState, useEffect, useRef}from 'react';
 import axios from "axios";
 import styled from "styled-components";
 import {useNavigate} from "react-router-dom";
 import {allUsersRoute, host} from "../util/APIRoutes";
 import Contacts from "../components/Contacts";
 import Welcome from "../components/Welcome";
  import ChatContainer from "../components/ChatContainer";

 function Chat() {
  const[contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [currentChat, setCurrentchat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const currentUser = JSON.parse(
    localStorage.getItem("chat-app-user"));
  useEffect(() => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate("/login");
      } 
      else{
        setIsLoaded(true);
      }
  }, []);

  
  useEffect(() => {

    const idValue = {
      id : currentUser._id
    };
  const{id}=idValue;
    if(currentUser){
      if(currentUser.isAvatarImageSet) {
      async function fetchAPi(){
          const data = await axios.post(`${allUsersRoute}`,{
              id,
            });
            setContacts(data.data);
      }
      fetchAPi();
      }
      else{
        navigate("/setAvatar");
      }
    }
  },[currentUser]);

  const handleChatChange = (chat) => {
    setCurrentchat(chat);
  }
   return (
     <Container> 
     <div className = "container">
     <Contacts contacts = {contacts} currentUser= {currentUser} changeChat = {handleChatChange} />
     {
      isLoaded && currentChat===undefined?
      (<Welcome currentUser ={currentUser}/>):( 
        <ChatContainer currentChat = {currentChat}
        />)
     }
     
     </div>
     </Container>
   );
 }

 const Container = styled.div`
 height: 100vh;
 width: 100vw;
 display: flex;
 flex-direction: column;
 justify-content: center;
 gap: 1rem;
 align-items: center;
 background-color: #131324;
 .container {
   height: 85vh;
   width: 85vw;
   background-color: #00000076;
   display: grid;
   grid-template-columns: 25% 75%;
   @media screen and (min-width: 720px) and (max-width: 1080px) {
     grid-template-columns: 35% 65%;
   }
 }
`;
 
 export default Chat