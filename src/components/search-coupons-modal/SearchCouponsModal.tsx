import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import "./search-coupons-modal.css";


export interface ISearchModal{
    closeModal: Function;
}

function SearchCouponsModal(props: ISearchModal){
    let dispatch = useDispatch();
    let[userSubText, setUserSubText] = useState("");

    let couponsArray = useSelector((state: AppState) => state.coupons);


    function filterCouponsByText(){
        let filteredCouponsArray = couponsArray.filter((coupon) => 
        coupon.name.toLowerCase().includes(userSubText.toLocaleLowerCase()))
        console.log(filteredCouponsArray);
        if(filteredCouponsArray.length === 0){
            alert("No Coupons Found, Please search again!");
            return;
        }
        dispatch({type: ActionType.FilterCouponsBySubText, payload:{filteredCouponsArray}});
        props.closeModal();
    }


    return(
        <div className="SearchCouponsModal">
            <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
            <h3 className="search-header">Search For Coupons</h3>
            <p className="search-message">*The search submits on coupons on this page, to filter on all coupons please refresh the page.</p>
            <input className="search-box" type="text" onChange={(event)=> setUserSubText(event.target.value)}/> <br />
            <button className="search-submit" onClick={()=> filterCouponsByText()}>Submit</button>
        </div>
    );
}

export default SearchCouponsModal;