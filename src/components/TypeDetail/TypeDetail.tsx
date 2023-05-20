import React, { useEffect, useState } from "react";
import { useNavigate } from "zmp-ui";
import { ITypeDetail } from "../../common/constant";
import titleImgOne from "../../images/web-icon.png";
import { useProductStore } from "../../stores/productStore";
import "./TypeDetail.scss";

const TypeDetail: React.FC<ITypeDetail> = (props) => {
  const navigate = useNavigate();
  const { listCateId, title } = props;
  const productStore = useProductStore();
  const [listProduct, setListProduct] = useState<any[]>([]);

  useEffect(() => {
    productStore.getProducts();
  }, []);

  useEffect(() => {
    if (listCateId) {
      handleGetListProduct(listCateId);
    }
  }, [listCateId, productStore.productData.length]);

  const handleGetListProduct = (id: string) => {
    const listProductR = productStore.productData.filter(
      (e) => e.listCateId === id
    );
    setListProduct(listProductR);
  };
  console.log("listCateId", productStore.productData, listProduct);
  return (
    <div className="type-detail">
      <div className="type_title">{title}</div>
      <div className="type_list">
        {listProduct &&
          listProduct.map((item) => {
            return (
              <div className="type_list-item">
                <img
                  src={item.image}
                  onClick={() => navigate(`/detail/${item.id}`)}
                />
                <span>abcabc</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TypeDetail;
