import axios from "axios";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ICategory from "../../../models/ICategory";
import "./category-editor-modal.css"

export interface ICategoryEditorModal{
  closeModal: Function;
  category: ICategory;
}

function CategoryEditorModal(props: ICategoryEditorModal){

   const serverIP = "34.165.22.160:8080";

    let[id, setID] = useState(props.category.id);
    let[type, setType] = useState(props.category.type);

    async function onUpdateCategory() {
        try{
          const response = await axios.put(`https://${serverIP}/categories`, {id, type});
          console.log(response);
          alert("Category successfully updated !");
        }catch(e){
            alert("Oops!")
          console.error(e);
        }
      }

    return(
        <div className="CategoryEditorModal">
          <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
          <h2>Category Editor</h2>
          <div className="inputs-container">
             <label htmlFor="type"> Category Type: </label><br />
             <input type= "text" defaultValue={props.category.type} spellCheck='false' name="type" onChange={event => setType(event.target.value)} /> <br/>  
             <input className='category-update-button' type= "button" value = "Update Category" onClick={()=> onUpdateCategory()} /> <br/>  
          </div>
        </div>
    );
}

export default CategoryEditorModal;