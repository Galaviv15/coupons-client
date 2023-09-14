import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import "./login.css";
import jwt_decode from 'jwt-decode';
import ISuccessfulLoginResponse from "../../../models/ISuccessfulLoginResponse";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../redux/action-type";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "react-modal";
import UserDetails from "../../../user-details/UserDetails";


    //I need to change the hrefs as its not good for navigations

function Login(props: any) {

  const serverIP = "34.165.22.160:8080";

  const dispatch = useDispatch();
  let navigate = useNavigate();

  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  
  let [userDetailsModalIsOpen, setUserDetailsModalIsOpen] = useState(false);



  async function onLogin(event: any) {
    try {
      const response = await axios.post(`http://${serverIP}/users/login`, { userName, password});
      let token: string = response.data.token;      
      let decodedToken: any = jwt_decode(token); 
      console.log(decodedToken);
      let strSuccessfulLoginResponse: string = decodedToken.sub;
      let successfulLoginResponse: ISuccessfulLoginResponse = JSON.parse(strSuccessfulLoginResponse);
      dispatch({type: ActionType.SetUserDetails, payload: {successfulLoginResponse}})
      dispatch({type: ActionType.SetUserLogIn, payload: {updateUserLogin: true}})
      axios.defaults.headers.common['Authorization'] = token; //Or `Bearer ${token}`
      localStorage.setItem('token', token);
      props.closeModal();
      navigate("/");
    } catch (e: any) {
      console.error(e);
     if(e.response?.data?.errorMessage){
      alert(e.response.data.errorType);
      console.log(e.response.data.error.message);
    }else{
      alert("Login invalid")
    }
  }
}


  function openUserDetailsModal(){
    setUserDetailsModalIsOpen(true);
  }

  function closeUserDetailsModal(){
    setUserDetailsModalIsOpen(false);
  }

  const customStyles = {
    content: {
      padding: "0",
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#2d3e50",
      borderRadius: "10px"
    }
  }


  return (  
    <div className="Login">
      <div className="card-box">
      <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
        <div className="card-header">
          <h2>Login</h2>
        </div>
        <div className="card-details">
         <input type="text" placeholder='User Name' spellCheck='false' onChange={event => setUserName(event.target.value)} />
         <FontAwesomeIcon className="icon" icon={faUser}/> <br />
         <input type= "password" placeholder='Password' onChange={event => setPassword(event.target.value)} />
         <FontAwesomeIcon className="icon" icon={faLock}/> <br />
        </div>
        <div className="activation-buttons">
          <input className='buttonToClick' type= "button" value = "Login" onClick={onLogin} /><br />  
          <p className="register-login-link" onClick={()=> props.moveToRegisterClick()}>Don't have an account? Regsiter now!</p>
        </div>
        <button onClick={openUserDetailsModal} className="get-user-details">Get User</button>

     </div>


     <Modal
        isOpen={userDetailsModalIsOpen}
        onRequestClose={closeUserDetailsModal}
        style={customStyles}
        appElement={document.getElementById('root')}
        contentLabel= "User Details Modal"
        > 
          <UserDetails closeModal={closeUserDetailsModal}/>
        </Modal>
    </div>

    

  );
}


export default Login;




