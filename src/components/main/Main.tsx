import React from "react";

import "./main.css";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import NotFound from "../not-found/Not-Found";
import Categories from "../categories-page/Categories";
import MyAccount from "../my-account-page/MyAccount";

function Main() {
  return (
    <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default Main;
