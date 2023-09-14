import axios from "axios";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ICompany from "../../../models/ICompany";
import "./company-editor-modal.css";

export interface ICompanyEditorModal {
  closeModal: Function;
  company: ICompany;
}

function CompanyEditorModal(props: ICompanyEditorModal) {

  const serverIP = "34.165.22.160:8080";


  let [id, setID] = useState(props.company.id);
  let [name, setName] = useState(props.company.name);
  let [address, setAddress] = useState(props.company.address);
  let [phoneNumber, setPhoneNumber] = useState(props.company.phoneNumber);

  //Updating company - works
  async function onUpdateCompany() {
    try {
      const response = await axios.put(`https://${serverIP}/companies`, {
        id,
        name,
        address,
        phoneNumber
      });
      console.log(response);
      alert("Company successfully updated !");
    } catch (e) {
      alert("Oops!");
      console.error(e);
    }
  }

  return(
    <div className="CompanyEditorModal">
    <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
    <h2>Company Editor</h2>
    <div className="inputs-container">
       <label htmlFor="name">Company Name:</label><br />
       <input type= "text" defaultValue={props.company.name} spellCheck='false' name="name" onChange={event => setName(event.target.value)} /> <br/>
       <label htmlFor="address">Company Address:</label><br />
       <input type= "text" defaultValue={props.company.address} spellCheck='false' name="address" onChange={event => setAddress(event.target.value)} /> <br/>
       <label htmlFor="number">Phone Number:</label><br />
       <input type= "text" defaultValue={props.company.phoneNumber} spellCheck='false' name="number" onChange={event => setPhoneNumber(event.target.value)} /> <br/> 
       <input className='company-update-button' type= "button" value = "Update Company" onClick={()=> onUpdateCompany()} /> <br/>   
    </div>
  </div>
  )
}

export default CompanyEditorModal;
