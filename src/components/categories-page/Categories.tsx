import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import { AppState } from "../../redux/app-state";
import "./categories.css";

function Categories() {

  const serverIP = "34.165.22.160:8080";

  let dispatch = useDispatch();
  let categoriesList = useSelector((state: AppState) => state.categories);


  useEffect(() => {
    getCategories();
  }, []);

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
      alert("Oops!");
    }
  }

  return (
    <div className="Categories">
      {categoriesList.map((category) =>
      <div className="category-card">
        <p>{category.type}</p>
      </div> 
      )}
    </div>
  );
}

export default Categories;
