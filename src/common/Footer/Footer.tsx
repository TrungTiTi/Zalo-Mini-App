import React, { useEffect } from "react";
import { Icon } from "zmp-ui";
import "./Footer.scss";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <div className="footer">
      <div className="ft-item footer-home" onClick={() => navigate("/home")}>
        <Icon icon="zi-home"></Icon>
        <b>Trang chủ</b>
      </div>
      <div className="ft-item footer-account" onClick={() => navigate("/user")}>
        <Icon icon="zi-user"></Icon>
        <b>Tài khoản</b>
      </div>
    </div>
  );
};

export default Footer;
