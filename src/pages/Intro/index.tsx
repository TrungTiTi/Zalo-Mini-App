import React, { useEffect, useState } from "react";
import { List, Page, Icon, useNavigate, Box, Button } from "zmp-ui";
import "./index.scss";
import { useRecoilValue } from "recoil";
// import { userInfo } from "zmp-sdk";
import { userState } from "../../state";
import motocycle from "../../../assets-src/motocycle.jpg";
import estate from "../../../assets-src/estate.jpg";
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../stores/userStore";
import { getUserInfo } from "zmp-sdk/apis";
import { login } from "zmp-sdk/apis";
import { getAccessToken } from "zmp-sdk/apis";

const IntroPage: React.FunctionComponent = observer(() => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const userStore = useUserStore();
  const [isNext, setIsNext] = useState<boolean>(false);

  const handleGetUser = async () => {
    try {
      const { userInfo } = await getUserInfo({});
      userStore.setUser(userInfo);
      navigate("/home");
    } catch (error) {}
  };

  return (
    <Page className="page-intro">
      <div className="intro-title">
        <h1>BH_KMA</h1>
      </div>
      <div className="carousel">
        <div className={`carousel-box carousel-one ${isNext ? "ml-50" : ""}`}>
          <div className="intro-header">
            <img src={estate} />
          </div>
          <div>
            <h3>Trải Nghiệm Mới</h3>
          </div>
          <div>
            <p>Trải nghiệm với những sản phẩm, video thú vị</p>
          </div>
          <div style={{ flex: "1 1" }}></div>
          <div className="intro-footer-1">
            <Button onClick={() => setIsNext(true)}>Tiếp tục</Button>
          </div>
        </div>
        <div className="carousel-box carousel-two">
          <div className="intro-header">
            <img src={motocycle} />
          </div>
          <div>
            <h3>Trải Nghiệm Mới</h3>
          </div>
          <div>
            <p>Trải nghiệm với những sản phẩm, video thú vị</p>
          </div>
          <div style={{ flex: "1 1" }}></div>
          <div className="intro-footer-1">
            <Button onClick={() => setIsNext(false)}>Quay lại</Button>
            <Button onClick={() => handleGetUser()}>Tiếp tục</Button>
          </div>
        </div>
      </div>
    </Page>
  );
});

export default IntroPage;
