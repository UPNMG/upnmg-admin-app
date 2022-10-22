/* eslint-disable  */
import React from "react";
import { useHistory } from "react-router-dom";
import "../css/hirepurchase.css";
import RenderHirePurchasePage from "../RenderHirePurchasePage";
function OrderDetailed() {
  const history = useHistory();
  return (
    <div className="OrderDetailed">
      <RenderHirePurchasePage>
        <div className="user_profile_section" style={{
            background: "url(/images/dev/del.png) no-repeat center center/cover"
        }}>
        <div className="overlay">
        {/* <h2>User Information</h2> */}
          <div className="profile">
            <div className="items">
              <div className="image">
                <img src="/images/dev/del.png" alt="product" />
              </div>
              <div className="profile-name">Mr. Agyapong Derrick</div>
              <div className="staff_id">
                Staff Id: <span>1009234</span>
              </div>

              <div className="ordered_date">
                Facility: <span>Osu governmanet hospital</span>
              </div>
              <button
                onClick={() => history.push("/mart/order-detailed")}
              >
                view detail
              </button>
            </div>
          </div>
        </div>
        </div>

        <div className="orderCover">
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
        </div>
        <div className="orderCover">
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
        </div>
      </RenderHirePurchasePage>
    </div>
  );
}

export default OrderDetailed;
