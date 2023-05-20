import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages/home";
import About from "../pages/about";
import Form from "../pages/form";
import User from "../pages/user";
import Footer from "../common/Footer/Footer";
import ListType from "../pages/ListType/ListType";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import PaymentDefault from "../pages/Payment/PaymentDefault";
import Header from "../common/Header/Header";
import Order from "../pages/Order/Order";
import IntroPage from "../pages/Intro";

const Element = ({ children, isBack }) => {
  return (
    <div className={`element ${isBack && "show-back"}`}>
      {isBack && <Header></Header>}

      {children}
      <Footer></Footer>
    </div>
  );
};

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<IntroPage />}></Route>
              <Route
                path="/home"
                element={
                  <Element isBack={false}>
                    <HomePage></HomePage>
                  </Element>
                }
              ></Route>
              <Route
                path="/about"
                element={
                  <Element isBack={true}>
                    <About></About>
                  </Element>
                }
              ></Route>
              <Route
                path="/form"
                element={
                  <Element isBack={true}>
                    <Form></Form>
                  </Element>
                }
              ></Route>
              <Route
                path="/user"
                element={
                  <Element isBack={true}>
                    <User></User>
                  </Element>
                }
              ></Route>
              <Route
                path="/type/:id"
                element={
                  <Element isBack={true}>
                    <ListType></ListType>
                  </Element>
                }
              ></Route>
              <Route
                path="/detail/:id"
                element={
                  <Element isBack={true}>
                    <DetailProduct></DetailProduct>
                  </Element>
                }
              ></Route>
              <Route
                path="/payment/:id"
                element={
                  <Element isBack={true}>
                    <PaymentDefault></PaymentDefault>
                  </Element>
                }
              ></Route>
              <Route
                path="/order"
                element={
                  <Element isBack={false}>
                    <Order></Order>
                  </Element>
                }
              ></Route>
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
