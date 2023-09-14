export default interface ICoupon{
    id: number;
    name: string;
    categoryType: string;
    categoryID: number;
    companyName: string;
    companyID: number;
    price: number;
    description: string;
    startDate?: any;
    endDate?: any;
    imgURL: string;

}