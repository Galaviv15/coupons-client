import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ICoupon from "../../models/ICoupon";
import { AppState } from "../../redux/app-state";
import "./coupon-card.css";
import Modal from "react-modal";
import CouponEditorModal from "../admin/coupon-editor/CouponEditorModal";
import axios from "axios";
import { ActionType } from "../../redux/action-type";
import { MdDeleteForever, MdEdit, MdInfoOutline} from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import ExtendedCoupon from "../extended-coupon/ExtendedCoupon";
import Login from "../register-login/login/Login";
import Register from "../register-login/register/Register";
import PurchaseModal from "../purchase/Purchase-Modal";


function CouponCard(coupon: ICoupon) {

  const serverIP = "34.165.22.160:8080";

  let dispatch = useDispatch();
  let userType = useSelector((state: AppState) => state.userDetails.userType);
  let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);

  let [editModalIsOpen, setEditModalIsOpen] = useState(false);
  let [extendedCouponModalIsOpen, setExtendedCouponModalIsOpen] = useState(false);
  let [purchaseCouponModalIsOpen, setPurchaseCouponModalIsOpen] = useState(false);
  let [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  let [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  function openLoginModal(){
    setRegisterModalIsOpen(false);
    setLoginModalIsOpen(true);
  }

  function openRegisterModal(){
    setLoginModalIsOpen(false);
    setRegisterModalIsOpen(true);
  }

  function openPurchaseModal(){
    setPurchaseCouponModalIsOpen(true);
  }

  function closePurchaseModal() {
    setPurchaseCouponModalIsOpen(false);
  }

  function closeLoginModal() {
    setLoginModalIsOpen(false);
  }

  function closeRegisterModal() {
    setRegisterModalIsOpen(false);
  }


  //Works + Renders the coupons List
  async function deleteCouponById(id: number) {
    try {
      const url = `https://${serverIP}/coupons/${id}`;
      let response = await axios.delete(url);
      let couponDeletedId = id;
      dispatch({type: ActionType.DeleteCoupon, payload: {couponDeletedId}})
      console.log(couponDeletedId);
    } catch (e: any) {
      alert("Oops!");
    }
  }


  function onEditClick(id: number) {
    setEditModalIsOpen(true);
  }

  function onInfoClick(id: number) {
    setExtendedCouponModalIsOpen(true);
  }

  function onDeleteClick(id: number) {
    //Validation before coupon Deletion
    var answer = window.confirm("Are you sure you want to delete this coupon?");
    if (!answer) {
      console.log("Canceled");
      return;
    }
    deleteCouponById(id);
  }

  function closeEditorModal() {
    setEditModalIsOpen(false);
  }

  function closeExtendedCouponModal() {
    setExtendedCouponModalIsOpen(false);
  }


  function onBuyNowClick() {
     if (!isUserLoggedIn) {
       alert("You have to login first");
       openLoginModal();
     }else{
       openPurchaseModal();
     }
     //openPurchaseModal();

  }

  const couponEditorModalStyle = {
    content: {
      padding: "5px",
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#2d3e50",
      borderRadius: "10px"
    }
  };

  const extendedCuponModalStyle = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#2d3e50",
      borderRadius: "10px"
    }
  };

  const purchaseCuponModalStyle = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#2d3e50",
      borderRadius: "10px"
    }
  };

  const registerLoginModalStyle = {
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
    <div className="CouponCard">
      <button className="open-extend-coupon-btn" onClick={()=> onInfoClick(coupon.id)}><MdInfoOutline/></button>
      <img className="coupon-img" src={coupon.imgURL} alt="" />
      <div className="coupon-details">
        <h4 className="coupon-name">{coupon.name}</h4>
        <p className="coupon-price">{coupon.price}$</p>
      </div>
      <div className="event-buttons">
        {userType !== "ADMIN" && (
          <button className="buy-now" onClick={()=> onBuyNowClick()}><FaCartPlus/></button>
        )}
        {userType === "ADMIN" && isUserLoggedIn && (
          <button onClick={()=> onEditClick(coupon.id)}><MdEdit/></button>
        )}
        {userType === "ADMIN" && isUserLoggedIn && (
          <button onClick={()=> onDeleteClick(coupon.id)}><MdDeleteForever/></button>
        )}
      </div>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditorModal}
        style={couponEditorModalStyle}
        appElement={document.getElementById('root')}
        contentLabel="Coupon Editor Modal"
      >
        <CouponEditorModal coupon={coupon} closeModal={()=> closeEditorModal()} />
      </Modal>

      <Modal
        isOpen={extendedCouponModalIsOpen}
        onRequestClose={closeExtendedCouponModal}
        style={extendedCuponModalStyle}
        appElement={document.getElementById('root')}
        contentLabel="Extended Coupon Modal"
      >
        <ExtendedCoupon coupon={coupon} closeModal={()=> closeExtendedCouponModal()} 
        openPurchaseModal={()=> {
          closeExtendedCouponModal();
          onBuyNowClick();
          }}/>
      </Modal>

      <Modal
        isOpen={purchaseCouponModalIsOpen}
        onRequestClose={closePurchaseModal}
        style={purchaseCuponModalStyle}
        appElement={document.getElementById('root')}
        contentLabel="Purchase Coupon Modal"
      >
        <PurchaseModal coupon={coupon} closeModal={()=> closePurchaseModal()} />
      </Modal>

      <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
        style={registerLoginModalStyle}
        appElement={document.getElementById('root')}
        contentLabel= "Login Modal"
        > 
        <Login closeModal={()=> closeLoginModal()} moveToRegisterClick={()=> openRegisterModal()}/>
        </Modal>

        <Modal
        isOpen={registerModalIsOpen}
        onRequestClose={closeRegisterModal}
        style={registerLoginModalStyle}
        appElement={document.getElementById('root')}
        contentLabel= "Register Modal"
        > 
          <Register closeModal={()=> closeRegisterModal()} moveToLoginModal={()=> openLoginModal()}/>
        </Modal>
    </div>
  );
}

export default CouponCard;
