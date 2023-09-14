import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState } from "./app-state";

let appStateInitialValue = new AppState();

export function reduce(
  oldAppState: AppState = appStateInitialValue,
  action: Action
): AppState {
  const newAppState = { ...oldAppState };

  switch (action.type) {
    case ActionType.SetCouponsArray:
      newAppState.coupons = action.payload.couponsArray;
      break;

    case ActionType.SetCategoriesArray:
      newAppState.categories = action.payload.categoriesArray;
      break;

    case ActionType.SetCompaniesArray:
      newAppState.companies = action.payload.companiesArray;
      break;

    case ActionType.SetUserPuchasesArray:
        newAppState.userPurchases = action.payload.purchases;
        break;

    case ActionType.SetCompanyCouponsArray:
      newAppState.coupons = action.payload.companyCouponsArray;
      break;

      
    case ActionType.SetCategoryCouponsArray:
      newAppState.coupons = action.payload.categoryCouponsArray;
      break;

    case ActionType.FilterCouponsBySubText:
        newAppState.coupons = action.payload.filteredCouponsArray;
        break;

    case ActionType.SetUserDetails:
      newAppState.userDetails = action.payload.successfulLoginResponse;
      break;

    case ActionType.SetCustomerDetails:
        newAppState.customerDetails = action.payload.customer;
        break;

    case ActionType.SetUserLogIn:
      newAppState.isUserLoggedIn = action.payload.updateUserLogin;
      break;

    case ActionType.GetSingleCoupon:
      newAppState.singleCoupon = action.payload.coupon;
      break;

    case ActionType.DeleteCoupon:
      let couponId = action.payload.couponDeletedId;
      let couponsArrayAfterDeletion = newAppState.coupons.filter((coupon) => {
        return couponId !== coupon.id;
      });
      newAppState.coupons = couponsArrayAfterDeletion;
      newAppState.coupons = [...newAppState.coupons];
      break;
  }

  return newAppState;
}
