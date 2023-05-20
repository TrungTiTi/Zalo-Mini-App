import React, { useEffect } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import "./index.scss";
import { useRecoilValue } from "recoil";
// import { userInfo } from "zmp-sdk";
import { userState } from "../../state";
import homeIntro from "../../../assets-src/intro_home.jpg";
import UserCard from "../../components/user-card";
import { observer } from "mobx-react-lite";
import { useCategoryStore } from "../../stores/categoryStore";
import { getUserInfo } from "zmp-sdk/apis";
import { login } from "zmp-sdk/apis";
import { getAccessToken } from "zmp-sdk/apis";
import { useUserStore } from "../../stores/userStore";

const HomePage: React.FunctionComponent = observer(() => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const categoryStore = useCategoryStore();
  const userStore = useUserStore();

  const getUser = async () => {
    try {
      const { userInfo } = await getUserInfo({});
      console.log("ủe", userInfo);
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  const test = async () => {
    try {
      const accessToken = await getAccessToken({});
      console.log("accessToken", accessToken);
    } catch (error) {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
  };

  useEffect(() => {
    categoryStore.getCates();
  }, []);

  const handleLogin = async () => {
    try {
      await login({});
      // login thành công
    } catch (error) {
      // login thất bại
      console.log(error);
    }
  };

  return (
    <Page className="page">
      <div className="section-container">
        <UserCard user={userStore.user} />
      </div>
      <div className="section-container-img">
        <img src={homeIntro} />
      </div>
      <div className="text-title">
        <p>Bảo hiểm Việt: Chăm sóc tận tâm, Hỗ trợ 24/7</p>
      </div>
      <div className="home-content">
        {categoryStore?.categoryData &&
          categoryStore.categoryData.map((item: any, index: number) => {
            return (
              <div className="home-content-item">
                <img
                  src={item?.image}
                  onClick={() => {
                    categoryStore.setCurrentIndex(index);
                    navigate(`/type/${item.id}`);
                  }}
                />
                <p>{item?.name}</p>
              </div>
            );
          })}
      </div>
    </Page>
  );
});

export default HomePage;
