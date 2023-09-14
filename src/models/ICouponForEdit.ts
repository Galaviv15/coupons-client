export default interface ICouponForEdit{
    id: number;
    name: string;
    categoryId: number;
    companyId: number;
    price: number;
    description: string;
    startDate?: any;
    endDate?: any;
    imgURL: string;
}