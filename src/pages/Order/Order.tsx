import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import "./Order.scss";
import { Icon, Page } from "zmp-ui";
import { useOrderStore } from "../../stores/orderStore";

const Order = (props) => {
  const orderStore = useOrderStore();

  return (
    <Page>
      <div className="order">
        <div className="order-header">
          <Icon icon={"zi-backup-success-solid"} />
          <p>Thành Công</p>
        </div>
        <div className="order-box">
          <label>Tên chủ xe:</label>
          <strong>{orderStore.orderData?.ownName}</strong>
        </div>
        <div className="order-box">
          <label>Địa chỉ thường chú:</label>
          <strong>{orderStore.orderData?.address}</strong>
        </div>
        <div className="order-box">
          <label>Số điện thoại:</label>
          <strong>{orderStore.orderData?.phoneNumber}</strong>
        </div>
        <div className="order-box">
          <label>Email:</label>
          <strong>{orderStore.orderData?.email}</strong>
        </div>
        <div className="order-box price">
          <label>Tổng tiền:</label>
          <strong>{`${orderStore.orderData?.price}K vnđ`}</strong>
        </div>
      </div>
    </Page>
  );
};

export default observer(Order);
