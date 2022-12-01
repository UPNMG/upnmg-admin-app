/* eslint-disable  */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { productActionCreators } from "../../services/Actions";
import axiosInstance from "../../services/Axios/axios";
import "../css/hirepurchase.css";
import RenderHirePurchasePage from "../RenderHirePurchasePage";
import Loader from "../../Components/Loader";
import "./OrderDetailed.css";

function OrderDetailed() {
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("history", history);
  const order = history.location.state;
  const productStore = useSelector((state) => state.product);
  const { isLoading, response } = productStore;

  const {
    UpdateOrderToInitiated,
    UpdateOrderToRejected,
    UpdateOrderToShipped,
    UpdateOrderToApproved,
    ResetProductResponse,
  } = bindActionCreators(productActionCreators, dispatch);

  useEffect(() => {
    if (response?.state === "SUCCESS") {
      toast.success(response?.message);
      setTimeout(() => {
        ResetProductResponse();
        history.goBack();
      }, 1500);
    } else if (response?.state === "ERROR") {
      toast.error(response?.message);
      setTimeout(() => {
        ResetProductResponse();
      }, 1500);
    }
  }, [response?.state, response?.message]);

  return (
    <div className="OrderDetailed">
      <RenderHirePurchasePage>
        {isLoading && <Loader />}
        <button className="backbtn" onClick={() => history.goBack()}>
          Back
        </button>
        <div
          className="user_profile_section"
          style={{
            background: `url(${
              order?.user_id?.profile_image
                ? order?.user_id?.profile_image
                : "/images/dev/del.png"
            }) no-repeat center center/cover`,
          }}
        >
          <div className="overlay">
            {/* <h2>User Information</h2> */}
            <div className="profile">
              <div className="items">
                <div className="image">
                  <img src={order?.user_id?.profile_image} alt="product" />
                </div>
                <div className="profile-name">{order?.user_id?.name}</div>
                <div className="staff_id">
                  Staff Id: <span>{order?.user_id?.staff_id}</span>
                </div>

                <div className="ordered_date">
                  Facility: <span>{order?.user_id?.facility}</span>
                </div>
                <button onClick={() => history.push("/mart/order-detailed")}>
                  view detail
                </button>
              </div>
              <div
                className="pb-3"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <button
                  className="processBtn"
                  onClick={() => {
                    const payload = {
                      status: true,
                    };
                    UpdateOrderToInitiated(order?._id, payload);
                  }}
                >
                  process
                </button>
                <button
                  className="approvedBtn"
                  onClick={() => {
                    const payload = {
                      status: true,
                    };
                    // UpdateOrderToInitiated(order?._id, payload)
                  }}
                >
                  approved
                </button>
                <button
                  className="shippedBtn"
                  onClick={() => {
                    const payload = {
                      status: true,
                    };
                    // UpdateOrderToInitiated(order?._id, payload)
                  }}
                >
                  shipped
                </button>
                <button
                  className="rejectBtn"
                  onClick={() => {
                    const payload = {
                      status: true,
                    };
                    // UpdateOrderToInitiated(order?._id, payload)
                  }}
                >
                  reject
                </button>
              </div>
            </div>
          </div>
        </div>
        {order?.order?.map((ord, idx) => {
          console.log("ord", ord);
          // const product = await axiosInstance.get(`/products/${ord?.product_id}`)
          // console.log('product', product.data)
          return (
            <div key={idx} className="orderCover">
              <img
                src={
                  ord?.product_img
                    ? ord?.product_img[0]?.url
                    : "/images/dev/del.png"
                }
                alt="image"
                className="product_image"
              />
              <div className="product_info">
                <p>
                  Order Data: <span>Jan 32, 2022</span>
                </p>
                {ord?.product_quantity > 0 ? (
                  <p className="stock">In stock</p>
                ) : (
                  <p className="stock">Out of stock</p>
                )}

                {/* <h3 className="name">{ord?.product_name}</h3> */}
                <p className="proce">
                  Product Name: <span>{ord?.product_name}</span>
                </p>
                <p className="proce">
                  Period: <span>{ord?.period}</span>
                </p>
                <p className="proce">
                  Actual Price: <span>{ord?.product_price}</span>
                </p>
                <p className="proce">
                  Price: <span>{ord?.period_price}</span>
                </p>
                <div className="qty">
                  <div>
                    Quantity: <span>{ord?.qty}</span>
                  </div>
                </div>
                <div className="color">
                  <div>
                    Colors: <span>{ord?.color}</span>
                  </div>
                </div>
                <div className="size">
                  Size: <span>{ord?.size}</span>
                </div>
                <div
                  className="btn "
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="customBtn px-2"
                    onClick={() =>
                      history.push({
                        pathname: "/mart/product-detail",
                        state: { product_id: ord?.product_id },
                      })
                    }
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* <div className="orderCover">
          <img
            src="/images/dev/del.png"
            alt="image"
            className="product_image"
          />
          <div className="product_info">
            <p>
              Order Data: <span>Jan 32, 2022</span>
            </p>
            <p className="stock">Out of stock</p>
            <h3 className="name">Product name</h3>
            <p className="proce">
              Price: <span>343</span>
            </p>
            <div className="qty">
              <div>
                Quantity: <span>7</span>
              </div>
            </div>
            <div className="color">
              <div>
                Colors: <span>Red</span>
              </div>
            </div>
            <div className="size">
              Size: <span>XL</span>
            </div>
          </div>
        </div> */}
      </RenderHirePurchasePage>
    </div>
  );
}

export default OrderDetailed;
