import { IoCloseOutline } from "react-icons/io5";
import ICoupon from "../../models/ICoupon";
import "./extended-coupon.css"

export interface IExtendedCouponProps{
  coupon:ICoupon;
  closeModal: Function;
  openPurchaseModal: Function;
}

function ExtendedCoupon(props: IExtendedCouponProps){

    return(
        <div className="ExtendedCoupon">
            <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
            <div className="coupon-img">
                <img src={props.coupon.imgURL} alt="" />
            </div>
            <div className="extended-coupon-details">
              <div className="coupon-main-details">
                 <h4 className="coupon-name">{props.coupon.name}</h4>
                 <p className="coupon-company">By {props.coupon.companyName}</p>
              </div>
              <div className="coupon-description">
                <p>{props.coupon.description}</p>
              </div>
              <div className="price-purchase">
                <p className="coupon-price">{props.coupon.price}$</p>
                <button className="coupon-purchase-btn" onClick={()=> props.openPurchaseModal()}>Buy Now</button>
              </div>
            </div>
        </div>
    );
}

export default ExtendedCoupon;