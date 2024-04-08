import React, {useState, useEffect}from 'react';
import axios from "axios";
import {testRoute} from "../util/APIRoutes";
import {allUsersRoute } from "../util/APIRoutes";
const user = JSON.parse(
    localStorage.getItem("chat-app-user"));
    
     
function Test() {
    useEffect(() => {
        const idValue = {
            id : user._id
          };
        const{id}=idValue;
        async function fetchAPi(){
            const {data} = await axios.post(`${allUsersRoute}`,{
                id,
              });
            console.log(data);
        }
        fetchAPi();
      }, []);
  
  return (
    <div>
    Test
    </div>
  )
}

export default Test