import React from "react";
import "./user-details.css"
import { IoCloseOutline } from "react-icons/io5";

function UserDetails(props: any){


    return(
        <div className="UserDetails">
            <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
            <h3 className="heading">Admin User -</h3>
            <p className="details">Username: ****** <br /> Password: ******</p>
            <h3 className="heading">Customer User -</h3>
            <p className="details">Username: Customer1 <br /> Password: Customer1!</p>
        </div>
    );
}

export default UserDetails;