import React, { useEffect } from "react";
import { Icon } from "zmp-ui";
import "./Header.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useCategoryStore } from "../../stores/categoryStore";

const Header = () => {
  const navigate = useNavigate();
  const categoryStore = useCategoryStore();
  const location = useLocation();
  const currentIndex = categoryStore.currentIndex;

  const onBack = () => {
    console.log("location", location);
    if (location.pathname.includes("type")) {
      categoryStore.setCurrentIndex(currentIndex - 1);
    }
    navigate(-1);
  };

  useEffect(() => {}, []);
  return (
    <div className="header">
      <div onClick={onBack} className="header-icon">
        <Icon icon="zi-arrow-left"></Icon>
        <span>Back</span>
      </div>
    </div>
  );
};

export default Header;
