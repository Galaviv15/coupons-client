import axios from "axios";
import jwtDecode from "jwt-decode";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';
import ICoupon from "../../models/ICoupon";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import CouponCard from "../coupon/Coupon-Card";
import "./home.css";
import ISuccessfulLoginResponse from "../../models/ISuccessfulLoginResponse";

function Home(){

  const serverIP = "34.165.22.160:8080";

    let dispatch = useDispatch();
    let [pageNumber, setPageNumber] = useState(0);
    let couponsList = useSelector((state: AppState) => state.coupons);
  
    useEffect(() => {
      const userToken = localStorage.getItem('token');
      if(userToken){
        let decodedToken: any = jwt_decode(userToken); 
        let successfulLoginResponse: ISuccessfulLoginResponse = JSON.parse(decodedToken.sub);
        console.log(successfulLoginResponse);
        dispatch({type: ActionType.SetUserLogIn, payload: {updateUserLogin: true}});
        dispatch({type: ActionType.SetUserDetails, payload: {successfulLoginResponse}});
      }
    },[]);
  
    useEffect(() => {
      getCouponsByPage(pageNumber)
    },[pageNumber]);
  
    async function getCouponsByPage(pageNumber: number) {
      try {
        const url = `http://${serverIP}/coupons/byPage?pageNumber=${pageNumber}`;
        let response = await axios.get(url);
        let couponsArray = response.data;
        if(couponsArray.length === 0){
          setPageNumber(pageNumber-1);
          return;
        }
        dispatch({type: ActionType.SetCouponsArray, payload: {couponsArray}})
        console.log(couponsArray);
      } catch (e: any) {
        console.error(e, "Failed to get Coupons");
      }
    }

    function scrollToTop() {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }

    function goToNextPage() {
      pageNumber++;
      setPageNumber(pageNumber);
      scrollToTop();
    }
  
    function goToPreviousPage() {
      pageNumber--;
      setPageNumber(pageNumber);
      scrollToTop();
    }
  
  
    return (
      <div className="Home">
        <div className="coupons-container">
           {couponsList.map((coupon: ICoupon) => <CouponCard key={coupon.id} id={coupon.id} name={coupon.name} categoryID={coupon.categoryID}
           categoryType={coupon.categoryType} companyID={coupon.companyID} companyName={coupon.companyName} price={coupon.price} description={coupon.description} 
           startDate={coupon.startDate} endDate={coupon.endDate} imgURL={coupon.imgURL}/>)}
        </div>
        <div className="page-buttons">
          {pageNumber > 0 && (<button onClick={goToPreviousPage}>Previous</button>)}
          <p>Page: {pageNumber + 1 /*because first page is 0*/}</p>
          <button onClick={goToNextPage}>Next</button>
        </div>
      </div>
    );
}

export default Home;