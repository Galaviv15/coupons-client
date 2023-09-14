import axios from "axios";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ICoupon from "../../../models/ICoupon";
import "./coupon-creator-modal.css";

export interface ICouponCreator{
    closeModal: Function;
}


function CouponCreatorModal(props: ICouponCreator) {

  const serverIP = "34.165.22.160:8080";


  let [name, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [description, setDescription] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");
  let [category, setCategoryID] = useState(0);
  let [company, setCompanyID] = useState(0);
  let [imgURL, setImgURL] = useState("");

  //creating coupon - works
  async function createCoupon() {
    try {
      const response = await axios.post(`https://${serverIP}/coupons`, {
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
      alert("Coupon successfully created !");
      props.closeModal();
    } catch (e) {
      alert(e);
      console.error(e);
    }
  }

  function onCreateCouponClick() {
    //Validation before coupon Deletion
    var answer = window.confirm("Are you sure you want to create this coupon?");
    if (!answer) {
      console.log("Canceled");
      return;
    }
    createCoupon();
  }

  return (
    <div className="CouponCreator">
      <button className="exit-modal-icon" onClick={()=> props.closeModal()}><IoCloseOutline/></button>
      <h2>Coupon Creator</h2>
      <div className="inputs-container">
        <label htmlFor="name"> Coupon Name: </label>
        <br />
        <input
          type="text"
          placeholder="Name"
          spellCheck="false"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="price"> Coupon Price: </label>
        <br />
        <input
          type="text"
          placeholder="Price"
          name="price"
          onChange={(event) => setPrice(+event.target.value)}
        />{" "}
        <br />
        <label htmlFor="description"> Coupon Description: </label>
        <br />
        <input
          type="text"
          placeholder="Description"
          spellCheck="false"
          name="description"
          onChange={(event) => setDescription(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="startDate"> Coupon Start Date: </label>
        <br />
        <input
          type="date"
          placeholder="Start Date"
          name="startDate"
          onChange={(event) => setStartDate(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="endDate"> Coupon End Date: </label>
        <br />
        <input
          type="date"
          placeholder="End Date"
          name="endDate"
          onChange={(event) => setEndDate(event.target.value)}
        />{" "}
        <br />
        <label htmlFor="categoryId"> Coupon Category ID: </label>
        <br />
        <input
          type="text"
          placeholder="Category ID"
          spellCheck="false"
          name="categoryId"
          onChange={(event) => setCategoryID(+event.target.value)}
        />{" "}
        <br />
        <label htmlFor="companyId"> Coupon Company ID: </label>
        <br />
        <input
          type="text"
          placeholder="Company ID"
          spellCheck="false"
          name="companyId"
          onChange={(event) => setCompanyID(+event.target.value)}
        />{" "}
        <br />
        <label htmlFor="imgUrl"> Coupon img URL: </label>
        <br />
        <input
          type="text"
          placeholder="IMG URL"
          spellCheck="false"
          name="imgUrl"
          onChange={(event) => setImgURL(event.target.value)}
        />{" "}
        <br />
        <input
          className="submit-coupon-button"
          type="button"
          value="Create Coupon"
          onClick={()=> onCreateCouponClick()}
        />{" "}
        <br />
      </div>
    </div>
  );
}

export default CouponCreatorModal;
