import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ISuccessfulLoginResponse from "../../models/ISuccessfulLoginResponse";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import jwt_decode from "jwt-decode";
import "./my-account.css";
import { useNavigate } from "react-router-dom";
import { MdRefresh } from "react-icons/md";

function MyAccount() {

  const serverIP = "34.165.22.160:8080";

  let dispatch = useDispatch();
  let navigate = useNavigate();

  const userDetails = useSelector((state: AppState) => state.userDetails);
  const customerDetails = useSelector((state: AppState) => state.customerDetails);
  const userPurchases = useSelector((state: AppState) => state.userPurchases);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      let decodedToken: any = jwt_decode(userToken);
      let successfulLoginResponse: ISuccessfulLoginResponse = JSON.parse(decodedToken.sub);
      console.log(successfulLoginResponse);
      dispatch({type: ActionType.SetUserLogIn,payload: { updateUserLogin: true }});
      dispatch({type: ActionType.SetUserDetails,payload: { successfulLoginResponse }});
    } else {
      navigate("/");
    }
  }, []);

  function getDetails(){
    getAllPurchases();
    getCustomerDetails();
  }

  async function getAllPurchases() {
    try {
      const url = `https://${serverIP}/purchases/byCustomerId?customerId=${userDetails.id}`;
      let response = await axios.get(url);
      let purchases = response.data;
      dispatch({
        type: ActionType.SetUserPuchasesArray,
        payload: { purchases },
      });
      console.log(purchases);
    } catch (e: any) {
      //alert("Oops!");
    }
  }

  async function getCustomerDetails() {
    try {
      const url = `http://${serverIP}/customers/${userDetails.id}`;
      let response = await axios.get(url);
      let customer = response.data;
      dispatch({
        type: ActionType.SetCustomerDetails,
        payload: { customer },
      });
      console.log(customer);
    } catch (e: any) {
      //alert("Oops!");
    }
  }

  return (
    <div className="MyAccount">
      <h2 className="welcome-header">Hello {userDetails.userName}!</h2>
      <button onClick={()=> getDetails()}>Get Details <MdRefresh className="get-details-icon"/></button>
      <div className="user-details-component">
        <h4 className="user-details-header">Your Details</h4>
        <table className="user-details-table">
          <tr className="table-header">
            <th>User Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Edit</th>
          </tr>
          <tr className="table-row">
              <td className="user-data">{customerDetails.userName}</td>
              <td className="user-data">{customerDetails.address}</td>
              <td className="user-data">{customerDetails.phoneNumber}</td>
              <td className="user-data"><button className="user-data-button">Reset Password</button></td>
              <td className="user-data"><button className="user-data-button">Edit Details</button></td>
          </tr>
        </table>
      </div>
      <div className="purchases-component">
        <h4 className="purchases-header">Purchases History</h4>
        <table className="purchases-table">
          <tr className="table-header">
            <th>Order Number</th>
            <th>Coupon</th>
            <th>Unit Price</th>
            <th>Amount Purchased</th>
            <th>Total Price</th>
          </tr>
          {userPurchases.map((purchase) => (
            <tr className="table-row">
              <td>{purchase.id}</td>
              <td>{purchase.couponName}</td>
              <td>{purchase.couponPrice}</td>
              <td>{purchase.amountPurchased}</td>
              <td>{purchase.couponPrice * purchase.amountPurchased}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default MyAccount;
