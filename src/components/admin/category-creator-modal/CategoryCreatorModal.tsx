import axios from "axios";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import "./category-creator-modal.css"

export interface ICategoryCreatorModal{
  closeModal: Function;
}

function CategoryCraetorModal(props: ICategoryCreatorModal){

  const serverIP = "34.165.22.160:8080";

    let[type, setType] = useState("");

    //creating category - 
    async function onCreateCategory() {
        try{
          const response = await axios.post(`https://${serverIP}/categories`, { type });
          console.log(response);
          alert("Category successfully created !");
          props.closeModal();
        }catch(e){
            alert(e)
          console.error(e);
        }
      }

    async function onUpdateCategory() {
        try{
          const response = await axios.put(`https://${serverIP}/categories`,{type});
          console.log(response);
          alert("Category successfully updated !");
        }catch(e){
            alert(e)
          console.error(e);
        }
      }

    return(
        <div className="CategoryCraetorModal">
          <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
          <h2>Category Creator</h2>
          <div className="inputs-container">
             <label htmlFor="type"> Category Type: </label><br />
             <input type= "text" placeholder='Category Type' spellCheck='false' name="type" onChange={event => setType(event.target.value)} /> <br/>  
             <input className='category-creation-button' type= "button" value = "Create Category" onClick={()=> onCreateCategory()} /> <br/>  
          </div>
        </div>
    );
}

export default CategoryCraetorModal;