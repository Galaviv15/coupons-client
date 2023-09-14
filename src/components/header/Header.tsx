import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import "./header.css";
import { TbShoppingCartDiscount } from "react-icons/tb";
import Modal from "react-modal";
import Register from "../register-login/register/Register";
import Login from "../register-login/login/Login";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";

import CouponCreatorModal from "../admin/coupon-creator-modal/CouponCreatorModal";
import SearchCouponsModal from "../search-coupons-modal/SearchCouponsModal";
import CategoryCraetorModal from "../admin/category-creator-modal/CategoryCreatorModal";
import CompanyCreatorModal from "../admin/company-creator-modal/CompanyCreatorModal";
import CategoryEditorModal from "../admin/category-editor/CategoryEditorModal";


//I need to change the hrefs as its not good for navigations

function Header() {

  const serverIP = "34.165.22.160:8080";

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);
  let userType = useSelector((state: AppState) => state.userDetails.userType);
  let userName = useSelector((state: AppState) => state.userDetails.userName);
  let categoriesList = useSelector((state: AppState) => state.categories);
  let companiesList = useSelector((state: AppState) => state.companies);



  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const[openCategoriesMenu, SetOpenCategoriesMenu] = useState(false);
  const[openCompaniesMenu, SetOpenCompaniesMenu] = useState(false);

  const[openAdminActionsMenu, SetOpenAdminActionsMenu] = useState(false);



  let [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  let [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  let [couponCreatorModalIsOpen, setcouponCreatorModalIsOpen] = useState(false);
  let [searchCouponsModalIsOpen, setSearchCouponsModalIsOpen] = useState(false);

  let [companyCreatorModalIsOpen, setCompanyCreatorModalIsOpen] = useState(false);
  let [categoryCreatorModalIsOpen, setCategoryCreatorModalIsOpen] = useState(false);

  let [companyEditorModalIsOpen, setCompanyEditorModalIsOpen] = useState(false);
  let [categoryEditorModalIsOpen, setCategoryEditorModalIsOpen] = useState(false);





  function openLoginModal(){
    setRegisterModalIsOpen(false);
    setLoginModalIsOpen(true);
    closeMobileMenu();
  }

  function openRegisterModal(){
    setLoginModalIsOpen(false);
    setRegisterModalIsOpen(true);
    closeMobileMenu();
  }

  function openCouponCreatorModal(){
    setcouponCreatorModalIsOpen(true);
  }

  function closeLoginModal() {
    setLoginModalIsOpen(false);
  }

  function closeRegisterModal() {
    setRegisterModalIsOpen(false);
  }

  function closeCouponCreatorModal(){
    setcouponCreatorModalIsOpen(false);
  }

  function openSearchModal(){
    setSearchCouponsModalIsOpen(true);
    closeMobileMenu();
  }

  function closeSearchModal(){
    setSearchCouponsModalIsOpen(false);
  }

  function openCategoryCreatorModal(){
    setCategoryCreatorModalIsOpen(true);
  }

  function closeCategoryCreatorModal(){
    setCategoryCreatorModalIsOpen(false);
  }

  function openCompanyCreatorModal(){
    setCompanyCreatorModalIsOpen(true);
  }

  function closeCompanyCreatorModal(){
    setCompanyCreatorModalIsOpen(false);
  }

  function openCategoryEditorModal(){
    setCategoryEditorModalIsOpen(true);
  }

  function closeCategoryEditorModal(){
    setCategoryEditorModalIsOpen(false);
  }

  function openCompanyEditorModal(){
    setCompanyEditorModalIsOpen(true);
  }

  function closeCompanyEditorModal(){
    setCompanyEditorModalIsOpen(false);
  }

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    //getCategories();
    //getCompanies();
    check();
  }, []);

  function onLogoutClick(){
    localStorage.clear();
    dispatch({type: ActionType.SetUserLogIn, payload: {userLoggedOut: false}});
    navigate("/");
}

  //try to scroll to Contact Us by click on this button
  function scrollToBottom() {
    window.scrollTo({
      top: 10000,
      behavior: "smooth",
    });
  }

  function scrollToTop() {
    closeMobileMenu();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }

  function openAdminActionsMenuOnHover(){
    SetOpenAdminActionsMenu(true);
  }

  function closeAdminActionsMenuOnHover(){
    SetOpenAdminActionsMenu(false);
  }

  function openCategoriesMenuOnHover(){
    SetOpenCategoriesMenu(true);
    console.log(categoriesList);
  }

  function closeCategoriesMenu(){
    SetOpenCategoriesMenu(false);
  }

  function openCompaniesMenuOnHover(){
    SetOpenCompaniesMenu(true);
  }

  function closeCompaniesMenu(){
    SetOpenCompaniesMenu(false);
  }

  

  window.addEventListener("resize", showButton);

  const customStyles = {
    content: {
      padding: "0",
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#2d3e50",
      borderRadius: "10px"
    }
  }

  const customStyles2 = {
    content: {
      padding: "0",
      top: "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#2d3e50",
      borderRadius: "10px"
    }
  }

  const searchModalStyles = {
    content: {
      padding: "0",
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#2d3e50",
      borderRadius: "10px"
    }
  }


  async function getCategories() {
    try {
      const url = `https://${serverIP}/categories`;
      let response = await axios.get(url);
      let categoriesArray = response.data;
      dispatch({
        type: ActionType.SetCategoriesArray,
        payload: { categoriesArray },
      });
      console.log(categoriesArray);
    } catch (e: any) {
      console.error(e, "Failed to get Categories");
    }
  }

    async function getCompanies() {
    try {
      const url = `https://${serverIP}/companies`;
      let response = await axios.get(url);
      let companiesArray = response.data;
      dispatch({
        type: ActionType.SetCompaniesArray,
        payload: { companiesArray },
      });
      console.log(companiesArray);
    } catch (e: any) {
      console.error(e, "Failed to get Companies");
    }
  }

  async function check() {
    try {
      console.log("server IP", serverIP);
      const url = `http://${serverIP}/companies`;
      console.log("url", url);
      let response = await axios.get(url);
      console.log(response.data);
    } catch (e: any) {
      console.error(e);
      console.log("failed to send http request");
    }
  
  }


  async function getCouponsByCompany(id: number) {
    try {
      const url = `https://${serverIP}/coupons/byCompanyId?companyId=${id}`;
      let response = await axios.get(url);
      let companyCouponsArray = response.data;
      dispatch({
        type: ActionType.SetCompanyCouponsArray,
        payload: { companyCouponsArray },
      });
      console.log(companyCouponsArray);
    } catch (e: any) {
      console.error(e, "Failed to get Company Coupons");
    }
  }

  async function getCouponsByCategory(id: number) {
    try {
      const url = `https://${serverIP}/coupons/byCategoryId?categoryId=${id}`;
      let response = await axios.get(url);
      let categoryCouponsArray = response.data;
      dispatch({
        type: ActionType.SetCategoryCouponsArray,
        payload: { categoryCouponsArray },
      });
      console.log(categoryCouponsArray);
    } catch (e: any) {
      console.error(e, "Failed to get a single Category");
    }
  }

  async function getAllCoupons() {
    try {
      const url = `https://${serverIP}/coupons/byPage?pageNumber=${0}`;
      let response = await axios.get(url);
      let couponsArray = response.data;

      dispatch({type: ActionType.SetCouponsArray, payload: {couponsArray}})
      console.log(couponsArray);
    } catch (e: any) {
      console.error(e, "Failed to get Coupons");
    }
  }




  return (
    <>
      <nav className="Header">
        <Link to="/" className="header-logo" onClick={()=> {scrollToTop(); getAllCoupons();}}>
          COUPONS4U <TbShoppingCartDiscount className="web-logo"/>
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "header-menu active" : "header-menu"}>
          <li className="header-item" onMouseOver={openAdminActionsMenuOnHover} onMouseOut={closeAdminActionsMenuOnHover} onClick={()=> getAllCoupons()}>
            <Link to="/" className="header-links" onClick={closeMobileMenu}>
              Coupons
            </Link>
            {userType === "ADMIN" && <div className={openAdminActionsMenu ? "admin-actions-dropdown-menu" : "admin-actions-dropdown-menu-undisplay"}>
              <ul className="admin-actions-list">
                <li className="admin-create-coupon" onClick={openCouponCreatorModal}><p>Create Coupon</p></li>
              </ul>
            </div>}
          </li>
          <li className="header-item" onMouseOver={openCategoriesMenuOnHover} onMouseOut={closeCategoriesMenu}>
            <Link to="/" className="header-links" onClick={closeMobileMenu}>
              Categories
            </Link>
            <div className={openCategoriesMenu? "categories-dropdown-menu" : "categories-dropdown-menu-undisplay"}>
              <ul className="categories-list">
                {userType === "ADMIN" && <li className="categories-item" onClick={()=> openCategoryCreatorModal()}>Category Creator</li>}
                {categoriesList.map((category, index) => <li onClick={()=> getCouponsByCategory(category.id)} className="categories-item" key={index}><p> {category.type}</p></li>)}
              </ul>
            </div>
          </li>
          <li className="header-item" onMouseOver={openCompaniesMenuOnHover} onMouseOut={closeCompaniesMenu}>
            <Link to="/" className="header-links" onClick={closeMobileMenu}>
              Companies
            </Link>
            <div className={openCompaniesMenu? "companies-dropdown-menu" : "companies-dropdown-menu-undisplay"}>
              <ul className="companies-list">
                {userType === "ADMIN" && <li className="companies-item" onClick={()=> openCompanyCreatorModal()}>Comany Creator</li>}
                {companiesList.map((company, index) => <li onClick={()=> getCouponsByCompany(company.id)} className="companies-item" key={index}><p> {company.name}</p></li>)}
              </ul>
            </div>
          </li>
          <li className="header-item last-item">
            <Link to="/" className="header-links" onClick={()=> {closeMobileMenu(); scrollToBottom();}}>
              Contact Us
            </Link>
          </li>
          <li className="header-item last-item" onClick={openSearchModal}>
            <Link to="/" className="header-links" onClick={()=> {closeMobileMenu()}}>
               <FaSearch />
            </Link>
          </li>
          {!isUserLoggedIn && <li>
            <Link
              to="/"
              className="header-links-mobile"
              onClick={openLoginModal}
            >
              Login
            </Link>
          </li>}
          {!isUserLoggedIn && <li>
            <Link
              to="/"
              className="header-links-mobile"
              onClick={openRegisterModal}
            >
              Sign Up
            </Link>
          </li>}
          {isUserLoggedIn && <li>
            <Link
              to="/"
              className="header-links-mobile"
              onClick={()=>
                {closeMobileMenu();
                 onLogoutClick();
                }}
            >
              Logout
            </Link>
          </li>}
          {isUserLoggedIn && <li>
            <Link
              to="/my-account"
              className="header-links-mobile"
              onClick={()=>
                {closeMobileMenu();}}
            >
              My Account
            </Link>
          </li>}
          {isUserLoggedIn && <li className="header-links-mobile-welcome">
              Welcome Back: {userName}
          </li>}
        </ul>
        <div className="active-buttons">
         {button && !isUserLoggedIn && <button className="login-logout login" onClick={openLoginModal}>Login</button>}
         {button && !isUserLoggedIn &&  <button className="login-logout register" onClick={openRegisterModal}>Sign Up</button>}
         {button && isUserLoggedIn && <button className="login-logout logout" onClick={onLogoutClick}>Logout</button>}
         {button && isUserLoggedIn && <button className="login-logout logout" onClick={()=> navigate("/my-account")}> <MdAccountBox /></button>}
        </div>

        <Modal
        isOpen={loginModalIsOpen}
        onRequestClose={closeLoginModal}
        style={customStyles}
        appElement={document.getElementById('root')}
        contentLabel= "Login Modal"
        > 
          <Login moveToRegisterClick={()=> openRegisterModal()} closeModal={()=> closeLoginModal()}/>
        </Modal>

        <Modal
        isOpen={registerModalIsOpen}
        onRequestClose={closeRegisterModal}
        style={customStyles}
        appElement={document.getElementById('root')}
        contentLabel= "Register Modal"
        > 
          <Register moveToLoginModal={()=> openLoginModal()} closeModal={closeRegisterModal}/>
        </Modal>

        <Modal
        isOpen={couponCreatorModalIsOpen}
        onRequestClose={closeCouponCreatorModal}
        style={customStyles}
        appElement={document.getElementById('root')}
        contentLabel= "Coupon Creator Modal"
        > 
          <CouponCreatorModal closeModal={()=> closeCouponCreatorModal()} />
        </Modal>

        <Modal
        isOpen={searchCouponsModalIsOpen}
        onRequestClose={closeSearchModal}
        style={searchModalStyles}
        appElement={document.getElementById('root')}
        contentLabel= "Search Coupons Modal"
        > 
          <SearchCouponsModal closeModal={()=> closeSearchModal()}/>
        </Modal>

        <Modal
        isOpen={companyCreatorModalIsOpen}
        onRequestClose={closeCompanyCreatorModal}
        style={customStyles2}
        appElement={document.getElementById('root')}
        contentLabel= "Company Creator Modal"
        > 
          <CompanyCreatorModal closeModal={()=> closeCompanyCreatorModal()}/>
        </Modal>

        <Modal
        isOpen={categoryCreatorModalIsOpen}
        onRequestClose={closeCategoryCreatorModal}
        style={customStyles2}
        appElement={document.getElementById('root')}
        contentLabel= "Category Creator Modal"
        > 
          <CategoryCraetorModal closeModal={()=> closeCategoryCreatorModal()}/>
        </Modal>



      

      </nav>
    </>
  );
}

export default Header;
