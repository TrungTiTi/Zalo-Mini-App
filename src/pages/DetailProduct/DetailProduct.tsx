import React, { useEffect, useState } from "react";
import "./DetailProduct.scss";
import { Page, List, Icon, Box, Slider, Button } from "zmp-ui";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../../stores/productStore";
import { useListCateStore } from "../../stores/listCateStore";
import { useCategoryStore } from "../../stores/categoryStore";
import { Link } from "react-router-dom";

const DetailProduct = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const productStore = useProductStore();
  const listCateStore = useListCateStore();
  const categoryStore = useCategoryStore();
  const [isActive, setIsActive] = useState<any>({
    des: false,
    condition: false,
    case: false,
    payment: false,
  });
  const [data, setData] = useState<any>({
    category: "",
    product: "",
    listCate: "",
  });

  useEffect(() => {
    if (params?.id) {
      const productR = productStore.productData;
      const productFound = productR.filter((item) => item.id === params.id);
      if (productFound.length) {
        const listCateFound = listCateStore.listCateData.filter(
          (item) => item.id === productFound[0]?.listCateId
        );
        const cateFound = categoryStore.categoryData.filter(
          (item) => item.id === productFound[0]?.cateId
        );
        console.log("listCateFound", listCateFound, cateFound);

        setData({
          category: cateFound[0] || "",
          product: productFound[0] || "",
          listCate: listCateFound[0] || "",
        });
        // console.log("productFound", productFound, listCateFound, cateFound);
      }
    }
  }, [params?.id]);

  const handleConvertText = (text: string) => {
    const textSplit = text.split("$$");
    return textSplit || [];
  };

  const renderFileLink = () => {
    return (
      <div className="detail-file">
        <div className="detail-file-img-title">
          <img src={data.product?.image ? data.product?.image : ""} />
        </div>
        <iframe
          src="https://giphy.com/embed/bYOu4G8Ctz3UkuHVQe"
          width="100%"
          height="200"
          frameBorder="0"
          className="giphy-embed"
          // allowFullScreen
        ></iframe>
        <div className="detail-file-content">
          <strong>Để xem file: </strong>
          <a href={data.product.instructFile}>
            {data.product?.name && data.product.name}
          </a>
        </div>
      </div>
    );
  };

  const renderYoutubeLink = () => {
    return (
      <div className="detail-youtube">
        <div>
          <iframe
            width={"100%"}
            height={200}
            src={data.product.youtubeLink}
          ></iframe>
          <h3>Tiêu đề: {data.product?.name && data.product?.name}</h3>
          <p>Đây là video tham khảo hướng dẫn</p>
        </div>
        <div className="detail-youtube-footer">
          <strong>Chúc các bạn xem video vui vẻ</strong>
          <iframe
            src="https://giphy.com/embed/138soHYfxnxfbi"
            width="60"
            height="50"
            frameBorder="0"
            className="giphy-embed"
          ></iframe>
        </div>
      </div>
    );
  };
  console.log("data", data);
  return (
    <Page className={"page-detail-product"}>
      {data?.product?.instructFile && renderFileLink()}
      {data?.product?.youtubeLink && renderYoutubeLink()}
      {!data?.product?.instructFile && !data?.product?.youtubeLink && (
        <>
          <div className="page-detail-product-img-title">
            <img src={data.product?.image ? data.product?.image : ""} />
          </div>

          <List>
            {/* DES */}
            <List.Item
              title="CHI TIẾT SẢN PHẨM"
              suffix={
                <Icon
                  icon={`${isActive.des ? "zi-chevron-down" : "zi-chevron-up"}`}
                />
              }
              className="accordion"
              onClick={() => setIsActive({ ...isActive, des: !isActive.des })}
            />
            <div className={`panel ${isActive.des ? "active" : "unactive"}`}>
              {handleConvertText(data.listCate?.description || "").map(
                (item) => {
                  return (
                    <p>
                      <Icon icon="zi-check" />
                      {item}
                    </p>
                  );
                }
              )}
            </div>
            {/* Condition */}

            <List.Item
              title="ĐIỀU KIỆN/ĐIỀU KHOẢN"
              suffix={
                <Icon
                  icon={`${
                    isActive.condition ? "zi-chevron-down" : "zi-chevron-up"
                  }`}
                />
              }
              className="accordion"
              onClick={() =>
                setIsActive({ ...isActive, condition: !isActive.condition })
              }
            />
            <div
              className={`panel ${isActive.condition ? "active" : "unactive"}`}
            >
              {handleConvertText(data.listCate?.condition || "").map((item) => {
                return (
                  <p>
                    <Icon icon="zi-check" />
                    {item}
                  </p>
                );
              })}
            </div>

            {/* CASE */}
            <List.Item
              title="TRỪ TRƯỜNG HỢP"
              suffix={
                <Icon
                  icon={`${
                    isActive.case ? "zi-chevron-down" : "zi-chevron-up"
                  }`}
                />
              }
              className="accordion"
              onClick={() => setIsActive({ ...isActive, case: !isActive.case })}
            />
            <div className={`panel ${isActive.case ? "active" : "unactive"}`}>
              {handleConvertText(data.listCate?.case || "").map((item) => {
                return (
                  <p>
                    <Icon icon="zi-check" />
                    {item}
                  </p>
                );
              })}
            </div>

            {/* Payment */}
            <List.Item
              title="PHƯƠNG THỨC THANH TOÁN"
              suffix={
                <Icon
                  icon={`${
                    isActive.payment ? "zi-chevron-down" : "zi-chevron-up"
                  }`}
                />
              }
              className="accordion"
              onClick={() =>
                setIsActive({ ...isActive, payment: !isActive.payment })
              }
            />
            <div
              className={`panel ${isActive.payment ? "active" : "unactive"}`}
            >
              {handleConvertText(data.listCate?.paymentMethod || "").map(
                (item) => {
                  return (
                    <p>
                      <Icon icon="zi-check" />
                      {item}
                    </p>
                  );
                }
              )}
            </div>
            <div className="page-detail-footer">
              {data?.product && (
                <Button>
                  <Link
                    to={`/payment/${data?.product?.id && data?.product?.id}`}
                    state={{
                      some: data?.product?.id,
                      price: data?.product?.price,
                      name: data?.product?.name,
                    }}
                  >
                    Tiếp tục
                  </Link>
                </Button>
              )}
            </div>
          </List>
        </>
      )}
    </Page>
  );
};

export default DetailProduct;
