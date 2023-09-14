import { faLocationDot, faLock, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import "./register.css";
import { IoCloseOutline } from "react-icons/io5";



function Register(props: any){

  const serverIP = "34.165.22.160:8080";

let[userName, setUserName]= useState(""); 
let[password, setPassword]= useState("");
let[address, setAddress]= useState("");
let[phoneNumber, setPhoneNumber]= useState("");


async function onRegister() {
  try{
    const response = await axios.post(`https://${serverIP}/customers`, { user:{userName, password}, address, phoneNumber});
    console.log(response);
    alert("Registration completed, please Login");
    props.moveToLoginModal();
  }catch (e: any) {
   if(e.response?.data?.errorMessage){
    alert(e.response.data.errorType);
  }else{
    alert("Registeration failed")
  }
}
}


return (
  <div className="Register">
      <div className="card-box">
        <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
        <div className="card-header">
          <h2>Sign Up</h2>
        </div>
        <div className="card-details">
          <input type="text" placeholder='User Name' spellCheck='false' onChange={event => setUserName(event.target.value)} />
          <FontAwesomeIcon className="icon" icon={faUser}/><br />
          <input type= "password" placeholder='Password' onChange={event => setPassword(event.target.value)} />
          <FontAwesomeIcon className="icon" icon={faLock}/><br />
          <input type= "text" placeholder='Address' spellCheck='false' onChange={event => setAddress(event.target.value)} />  
          <FontAwesomeIcon className="icon" icon={faLocationDot}/><br />
          <input type= "text" placeholder='Phone Number' onChange={event => setPhoneNumber(event.target.value)} />
          <FontAwesomeIcon className="icon" icon={faPhone}/><br />
        </div>
        <div className="activation-buttons">
          <input className='buttonToClick' type= "button" value = "Sign Up" onClick={() => onRegister()} /><br />  
          <p className="register-login-link" onClick={()=> props.moveToLoginModal()} >Already have an account?</p>
        </div>
  </div>
  </div>

);
}

export default Register;