import ICoupon from "../models/ICoupon";
import ICustomer from "../models/ICustomer";
import IPurchase from "../models/IPurchase";
import ISuccessfulLoginResponse from "../models/ISuccessfulLoginResponse";

export class AppState{
    public coupons:ICoupon[] = [];
    public singleCoupon:ICoupon = {id: 0, name: "",categoryType: "",  categoryID: 0, 
    companyName: "", companyID: 0, price: 0, description: "", imgURL: ""};
    public categories: any[] = [];
    public companies: any[] = [];
    public userDetails: ISuccessfulLoginResponse = {id: 0, userType: "", userName: ""};
    public customerDetails: ICustomer = {userName: "", address: "", phoneNumber: ""};
    public isUserLoggedIn: boolean = false;
    public userPurchases: IPurchase[] = [];
}