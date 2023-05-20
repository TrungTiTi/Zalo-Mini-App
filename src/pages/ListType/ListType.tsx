import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import "./ListType.scss";
import { useParams, useNavigate } from "react-router-dom";
import { Icon, Spinner } from "zmp-ui";
import TypeDetail from "../../components/TypeDetail/TypeDetail";
import { useListCateStore } from "../../stores/listCateStore";
import { useCategoryStore } from "../../stores/categoryStore";

const ListType = () => {
  const params = useParams();
  const listCateStore = useListCateStore();
  const categoryStore = useCategoryStore();
  const [childCateArr, setChildCateArr] = useState<any[]>([]);
  const navigate = useNavigate();
  const cateData = categoryStore.categoryData;
  // const currentIndex = categoryStore.currentIndex;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (params?.id) {
      const indexInStore = categoryStore.categoryData.findIndex(
        (item) => item.id == params.id
      );
      setCurrentIndex(indexInStore);
    }
  }, [params?.id]);

  useEffect(() => {
    listCateStore.getListCates();
    if (params?.id && listCateStore.listCateData) {
      const listChildCate = listCateStore.listCateData.filter(
        (item) => item.cateId === params.id
      );
      setChildCateArr(listChildCate);
    }
  }, [params?.id, listCateStore.listCateData.length]);

  return (
    <div>
      {!listCateStore.loading ? (
        childCateArr.map((item) => {
          return <TypeDetail listCateId={item?.id} title={item?.detailTitle} />;
        })
      ) : (
        <Spinner visible />
      )}
      <div className="list-type-footer">
        <div className="footer-prev footer-item">
          {currentIndex !== 0 && (
            <div
              onClick={() => {
                // categoryStore.setCurrentIndex(currentIndex - 1);
                navigate(`/type/${cateData[currentIndex - 1]?.id}`);
              }}
            >
              <Icon icon={"zi-arrow-left"}></Icon>
              <img src={cateData[currentIndex - 1]?.image} />
            </div>
          )}
        </div>
        <div className="footer-after footer-item">
          {currentIndex !== cateData.length - 1 && (
            <div
              onClick={() => {
                // categoryStore.setCurrentIndex(currentIndex + 1);
                navigate(`/type/${cateData[currentIndex + 1]?.id}`);
              }}
            >
              <img src={cateData[currentIndex + 1]?.image} />
              <Icon icon={"zi-arrow-right"}></Icon>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(ListType);
