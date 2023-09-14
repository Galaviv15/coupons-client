import axios from "axios";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "./company-creator-modal.css"

export interface ICompanyCreatorModal{
  closeModal: Function;
}

function CompanyCreatorModal(props: ICompanyCreatorModal){
  
  const serverIP = "34.165.22.160:8080";


    let[name, setName] = useState("");
    let[address, setAddress] = useState("");
    let[phoneNumber, setPhoneNumber] = useState("");

    //creating company - works
    async function onCreateCompany() {
        try{
          const response = await axios.post(`http://${serverIP}/companies`,{
            name, address, phoneNumber,
          });
          console.log(response);
          alert("Company successfully created !");
          props.closeModal();
        }catch(e){
          alert("Oops!")
          console.error(e);
        }
      }



    return(
        <div className="CompanyCreatorModal">
          <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
          <h2>Company Creator</h2>
          <div className="inputs-container">
             <label htmlFor="name">Company Name:</label><br />
             <input type= "text" placeholder='Company Name' spellCheck='false' name="name" onChange={event => setName(event.target.value)} /> <br/>
             <label htmlFor="address">Company Address:</label><br />
             <input type= "text" placeholder='Company Adress' spellCheck='false' name="address" onChange={event => setAddress(event.target.value)} /> <br/>
             <label htmlFor="number">Phone Number:</label><br />
             <input type= "text" placeholder='Company Phone Number' spellCheck='false' name="number" onChange={event => setPhoneNumber(event.target.value)} /> <br/> 
             <input className='company-creation-button' type= "button" value = "Create Company" onClick={()=> onCreateCompany()} /> <br/>   
          </div>
        </div>
    );
}

export default CompanyCreatorModal;