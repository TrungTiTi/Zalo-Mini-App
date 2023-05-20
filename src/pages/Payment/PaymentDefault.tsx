import React, { useState } from "react";
import "./PaymentDefault.scss";
import { Box, Button, Input, Page, Radio, Text } from "zmp-ui";
import { useLocation, useParams } from "react-router-dom";
import motoOne from "../../../assets-src/moto-a.png";
import motoTwo from "../../../assets-src/motorcycle.png";
import motoThree from "../../../assets-src/motorbike.png";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "../../stores/orderStore";
import { REGEX } from "../../helper";

const typeBH = [
  {
    label: "< 50cc",
    image: motoOne,
    value: 1,
  },
  {
    label: "50cc - 150cc",
    image: motoTwo,
    value: 2,
  },
  {
    label: "> 150cc",
    image: motoThree,
    value: 3,
  },
];

const PaymentDefault = (props) => {
  const { state } = useLocation();
  const idProduct = useParams();
  const navigate = useNavigate();
  const [isNext, setIsNext] = useState<boolean>(false);
  const [infomation, setInfomation] = useState<any>({
    ownName: "",
    address: "",
    phoneNumber: null,
    email: "",
    numberOfSeat: 0,
    licensePlate: null,
    yearOfManu: null,
    typeOfCar: 1,
  });
  const orderStore = useOrderStore();

  const [order, setOrder] = useState({
    price: state?.price,
    label: "< 50cc",
  });

  const handleChange = (fieldType: string, fieldValue: any) => {
    setInfomation({ ...infomation, [fieldType]: fieldValue });
  };

  const handleSubmit = async () => {
    try {
      const orderObject = {
        ownName: infomation.ownName,
        address: infomation.address,
        phoneNumber: infomation.phoneNumber,
        email: infomation.email,
        numberOfSeat: infomation.numberOfSeat,
        licensePlate: infomation.licensePlate,
        yearOfManu: infomation.yearOfManu,
        typeOfCar: infomation.typeOfCar,
        idUser: "2802822499267754069",
        idProduct: idProduct.id,
        price: order.price,
        type: order.label,
      };
      const newOrder = await addDoc(collection(db, "order"), orderObject);
      orderStore.setOrderData(orderObject);
      if (newOrder) {
        navigate("/order");
      }
    } catch (error) {}
  };

  const onChange = (e, label) => {
    console.log("eeee", e.target);
    const numValue = +e.target.value;
    const priceDefault = state?.price || 1;

    switch (numValue) {
      case 1:
        setOrder({ label: label, price: priceDefault });
        break;
      case 2:
        setOrder({ label: label, price: priceDefault + 10 });
        break;
      case 3:
        setOrder({ label: label, price: priceDefault + 20 });
        break;
      default:
        break;
    }
  };
  console.log("state", state, idProduct);
  const handleCheck = (e) => {
    const regex = RegExp("^[0-9]+$");
    // const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    // if (e.match(regexPhoneNumber)) {

    // }

    // return phone.match(regexPhoneNumber) ? true : false;
  };

  const onCheckDisable = () => {
    if (
      onCheckErrorEmail() &&
      infomation.phoneNumber &&
      infomation.address &&
      infomation.ownName
    ) {
      return false;
    }
    return true;
  };

  const onCheckErrorEmail = () => {
    const res = String(infomation.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (res) {
      return true;
    }
    return false;
  };

  const onCheckDisableSubmitBtn = () => {
    if (
      infomation.numberOfSeat &&
      infomation.licensePlate &&
      infomation.yearOfManu
    ) {
      return false;
    }
    return true;
  };
  return (
    <Page>
      <div className="carousel">
        <div
          className={`carousel-box carousel-first ${isNext ? "ml-100" : ""} `}
        >
          <Box>
            <Text.Header>Thong tin co ban</Text.Header>
            <hr />
            <Input
              label="Tên chủ xe *"
              required
              errorText="Field is required!"
              status="success"
              onChange={(e) => handleChange("ownName", e.target.value)}
            />
            <Input
              label="Địa chỉ thường trú *"
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <Input
              label="Số điện thoại"
              errorText="Field is required!"
              onChange={(e) => {
                const number = parseFloat(e.target.value) || 0;
                handleChange("phoneNumber", number);
              }}
              // status="error"
            />
            <Input
              label="Email"
              onChange={(e) => handleChange("email", e.target.value)}
              status={onCheckErrorEmail() ? "success" : "error"}
              errorText="Field is invalid"
            />
          </Box>

          <div className="payment-footer-1">
            <Button onClick={() => setIsNext(true)} disabled={onCheckDisable()}>
              Tiếp tục
            </Button>
          </div>
        </div>
        <div className="carousel-box carousel-two">
          <div>
            <Box>
              <Text.Header>Thông tin xe</Text.Header>
              <hr />
              <Input
                label="Số chỗ ngồi *"
                required
                onChange={(e) => handleChange("numberOfSeat", e.target.value)}
              />
              <Input
                label="Biển số xe *"
                onChange={(e) => handleChange("licensePlate", e.target.value)}
              />
              <Input
                label="Năm sản xuất"
                onChange={(e) => handleChange("yearOfManu", e.target.value)}
              />
            </Box>
            <div className="carousel-box__select">
              {/* <Box > */}
              {typeBH.map((item) => {
                return (
                  <div className="box-radio">
                    {/* <Radio name="moto" value={item.value} /> */}
                    <input
                      type="radio"
                      name="mono"
                      value={item.value}
                      defaultValue={1}
                      defaultChecked={item.value == 1 ? true : false}
                      onChange={(e) => onChange(e, item.label)}
                    />
                    <div>
                      <img src={item.image} />
                      <b>{item.label}</b>
                    </div>
                  </div>
                );
              })}
              {/* </Box> */}
            </div>
            <div className="carousel-box__footer">
              <label>Gia: </label>
              <strong>{order.price}K</strong>
            </div>
          </div>
          <div className="payment-footer-2">
            <Button onClick={() => setIsNext(false)}>Quay lại</Button>
            <Button
              onClick={() => handleSubmit()}
              disabled={onCheckDisableSubmitBtn()}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PaymentDefault;
