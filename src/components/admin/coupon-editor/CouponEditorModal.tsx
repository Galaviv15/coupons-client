import axios from "axios";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ICoupon from "../../../models/ICoupon";
import "./coupon-editor-modal.css";

export interface ICouponEditorProps{
  coupon:ICoupon;
  closeModal: Function;
}

function CouponEditorModal(props: ICouponEditorProps) {

  const serverIP = "34.165.22.160:8080";


  let [id, setID] = useState(props.coupon.id);
  let [name, setName] = useState(props.coupon.name);
  let [price, setPrice] = useState(props.coupon.price);
  let [description, setDescription] = useState(props.coupon.description);
  let [startDate, setStartDate] = useState(props.coupon.startDate);
  let [endDate, setEndDate] = useState(props.coupon.endDate);
  let [category, setCategoryID] = useState(props.coupon.categoryID);
  let [company, setCompanyID] = useState(props.coupon.companyID);
  let [imgURL, setImgURL] = useState(props.coupon.imgURL);

  //updating coupon - works
  async function updateCoupon() {
    try {
      const response = await axios.put(`https://${serverIP}/coupons`, {
        id,
        name,
        price,
        description,
        startDate,
        endDate,
        category: { id: category },
        company: { id: company },
        imgURL
      });
      console.log(response);
      alert("Coupon successfully updated !");
      props.closeModal();
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }

  function onUpdateClick() {
    //Validation before coupon Deletion
    var answer = window.confirm("Are you sure you want to update this coupon?");
    if (!answer) {
      console.log("Canceled");
      return;
    }
    updateCoupon();
    props.closeModal();
  }

  return (
    <div className="CouponEditor">
      <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
      <h2>Coupon Editor</h2>
      <div className="inputs-container">
        <label htmlFor="name"> Coupon Name: </label>
        <br />
        <input
          type="text"
          defaultValue={props.coupon.name}
          spellCheck="false"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="price"> Coupon Price: </label>
        <br />
        <input
          type="text"
          defaultValue={`${props.coupon.price}`}
          name="price"
          onChange={(event) => setPrice(+event.target.value)}
        />{" "}
        <br />
        <label htmlFor="description"> Coupon Description: </label>
        <br />
        <input
          type="text"
          defaultValue={props.coupon.description}
          spellCheck="false"
          name="description"
          onChange={(event) => setDescription(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="startDate"> Coupon Start Date: </label>
        <br />
        <input
          type="date"
          defaultValue={props.coupon.startDate}
          placeholder={props.coupon.startDate}
          name="startDate"
          onChange={(event) => setStartDate(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="endDate"> Coupon End Date: </label>
        <br />
        <input
          type="date"
          defaultValue={props.coupon.endDate}
          placeholder={props.coupon.endDate}
          name="endDate"
          onChange={(event) => setEndDate(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="categoryId"> Coupon Category ID: </label>
        <br />
        <input
          type="text"
          defaultValue={`${props.coupon.categoryID}`}
          spellCheck="false"
          name="categoryId"
          onChange={(event) => setCategoryID(+event.target.value)}
        />{" "}
        <br />
        <label htmlFor="companyId"> Coupon Company ID: </label>
        <br />
        <input
          type="text"
          defaultValue={`${props.coupon.companyID}`}
          spellCheck="false"
          name="companyId"
          onChange={(event) => setCompanyID(+event.target.value)}
        />{" "}
        <br />
        <label htmlFor="imgUrl"> Coupon img URL: </label>
        <br />
        <input
          type="text"
          defaultValue={props.coupon.imgURL}
          spellCheck="false"
          name="imgUrl"
          onChange={(event) => setImgURL(event.target.value)}
        />{" "}
        <br />
        <input
          className="submit-coupon-button"
          type="button"
          value="Update Coupon"
          onClick={()=> onUpdateClick()}
        />{" "}
        <br />
      </div>
    </div>
  );
}

export default CouponEditorModal;
