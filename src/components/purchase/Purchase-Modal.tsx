import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ICoupon from "../../models/ICoupon";
import "./purchase-modal.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/app-state";

export interface IPurchaseProps {
  coupon: ICoupon;
  closeModal: Function;
}

function PurchaseModal(props: IPurchaseProps) {

  const serverIP = "34.165.22.160:8080";

    let [couponsAmount, setCouponsAmount] = useState(0);
    let [finalPrice, setFinalPrice] = useState(0);
    const userDetails = useSelector((state:AppState) => state.userDetails);

    function increaseCouponsAmount(){
        if(couponsAmount === 5){
            alert("Sorry, Max coupons allowed is 5");
            return;
        }
        setCouponsAmount(couponsAmount +1);
        increaseFinalPrice();
    }

    function decreaseCouponsAmount(){
        if(couponsAmount === 0){
          setFinalPrice(0);
          return;
        }
        setCouponsAmount(couponsAmount-1);
        decreaseFinalPrice();
    }

    function increaseFinalPrice(){
        let updatedFinalPrice = finalPrice + props.coupon.price;
        setFinalPrice(updatedFinalPrice);
    }

    function decreaseFinalPrice(){
      let updatedFinalPrice = finalPrice - props.coupon.price;
      setFinalPrice(updatedFinalPrice);
  }


  async function purchaseCoupon(couponId: number) {
        try {
          await axios.post(`http://${serverIP}/purchases`, {
            amountPurchased: couponsAmount,
            coupon: {
              id: couponId
            }
        });
        alert("Coupon succsessfuly purchased");
      } 
      catch (e: any) {
          alert("Oops!");
          console.log(e);
        }
  }


  return (
    <div className="PurchaseModal">
      <button className="exit-modal-icon" onClick={() => props.closeModal()}><IoCloseOutline /></button>
      <div className="coupon-component">
        <div className="coupon-img-div">
            <img src={props.coupon.imgURL} alt="" className="coupon-img"/>
        </div>
        <div className="coupon-details">
            <h3 className="coupon-name">{props.coupon.name}</h3>
            <h3 className="coupon-price">{props.coupon.price}$</h3>
            <div className="coupon-amount-details">
                <AiOutlineMinus className="amount-changer-icon" onClick={()=> decreaseCouponsAmount()}/>
                <input type="text" min={0} max={5} className="coupon-amount-input" value={couponsAmount}/>
                <AiOutlinePlus className="amount-changer-icon" onClick={() => increaseCouponsAmount()}/>
            </div>
        </div>
      </div>
      <hr className="vertical-line"/>
      <div className="payment-component">
        <div className="shipping-details">
           <h4 className="heading">Shipping:</h4>
           <div className="inputs-container">
             <label htmlFor="address">Shipping Address:</label>
             <input type="text" name="address" placeholder="example 1, tel aviv, IL"/>
           </div>
           <div className="inputs-container">
             <label htmlFor="email">Email:</label>
             <input type="email" placeholder="example@gmail.com"/>
          </div>
        </div>
        <div className="payment-details">
            <h4 className="heading">Payment Details:</h4>
            <div className="inputs-container">
              <label htmlFor="card-number">Card Number:</label>
              <input type="text" name="card-number" placeholder="0000-0000-0000-0000" required/>
            </div>
            <div className="inputs-container">
              <label htmlFor="exp-date">Expiration Date:</label>
              <input type="month" name="exp-date" placeholder="Exp Date" required/>
            </div>
            <div className="inputs-container">
              <label htmlFor="cvv">CVV:</label>
              <input className="cvv-input" type="text" name="cvv" min={0} max={999} placeholder="000" required/>
            </div>
            <div className="terms-conditions">
              <input className="terms-checkbox" type="checkbox" />
              <label className="terms-checkbox-label" htmlFor="">I Accept Terms & Conditions</label>
            </div>

        </div>
        <div className="submition-button">
            <h3 className="purchase-final-price">Total Price: <br />{finalPrice}$</h3>
            <button className="purchase-button" onClick={()=> purchaseCoupon(props.coupon.id)}>Confirm Purchase</button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;
