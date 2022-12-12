/* eslint-disable  */
import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { productActionCreators } from "../../services/Actions";
import { GetUserProfile } from "../../services/Actions/authActions";
import RenderHirePurchasePage from "../RenderHirePurchasePage";
import * as moment from "moment";
import Loader from "../../Components/Loader";
import { debounce } from "lodash";
function OrderStatus() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { GetOrders } = bindActionCreators(productActionCreators, dispatch);
  const product = useSelector((state) => state.product);

  const { isLoading, orders } = product;
  const [limit, setLimit] = useState(20);
  const [currentStatus, setCurrentStatus] = useState("");

  console.log("orders", orders);

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
    GetOrders(true, 1, e.target.value, currentStatus, null);
    console.log("e.target.value", e.target.value);
  };

  const handleStatusChange = (e) => {
    GetOrders(true, 1, limit, e.target.value, null);
  };

  const onSearchTextChange = debounce((e) => {
    if (e?.target?.value) {
      GetOrders(true, 1, limit, currentStatus, e?.target?.value);
    } else {
      GetOrders(true, 1, limit, currentStatus, "");
    }
  }, 800);

  useEffect(() => {
    dispatch(GetUserProfile());
    GetOrders(true, 1, limit, currentStatus, null);
  }, []);
  return (
    <div className="ProcessedOrder">
      <RenderHirePurchasePage>
        {isLoading && <Loader />}
        <div>
          <div className="pt-3">
            <h2 className="text-2xl font-semibold leading-tight pb-3">
              Orders Status
            </h2>
          </div>
          <div className="row">
            <div className="col-md-5">
              <label htmlFor="search">Search Query:</label>
              <input
                type="search"
                id="search"
                name="search"
                className="shadow-sm bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="search by staff id"
                onChange={onSearchTextChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="search">Order status:</label>
              <select
                id="countries"
                onChange={handleStatusChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""}>All</option>
                <option value={"submitted"}>New Orders</option>
                <option value={"initiated"}>Initiated</option>
                <option value={"approved"}>Approved</option>
                <option value={"shipping"}>Shipped</option>
                <option value={"rejected"}>Rejected</option>
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="search">List to show:</label>
              <select
                id="countries"
                onChange={handleLimitChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={"2"}>2</option>
                <option value={"5"}>5</option>
                <option value={"10"}>10</option>
                <option value={"50"}>50</option>
                <option value={"150"}>150</option>
                <option value={"500"}>500</option>
                <option value={"700"}>700</option>
                <option value={"1000"}>1000</option>
              </select>
            </div>
            {/* <div className="col-md-2">
            <button
              type="button"
              className="mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 mb-2"
              onClick={() => setOpenModal(true)}
            >
              Add New
            </button>
          </div> */}
          </div>

          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Affordability
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Division
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Facility
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => {
                // console.log(loan)
                let orderStatusColor = "red";
                if (order?.status === "submitted") {
                  orderStatusColor = "rgb(163, 163, 163)";
                } else if (order?.status === "initiated") {
                  orderStatusColor = "rgb(221, 118, 0)";
                } else if (order?.status === "rejected") {
                  orderStatusColor = "red";
                } else if (order?.status === "approved") {
                  orderStatusColor = "#01a94b";
                } else if (order?.status === "shipping") {
                  orderStatusColor = "rgb(0, 103, 221)";
                }
                return (
                  <tr key={index}>
                    <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src={order?.user_id?.profile_image}
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {order?.user_id?.name}
                          </p>
                          <p className="text-gray-600 whitespace-no-wrap font-bold">
                            {order?.user_id?.staff_id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {order?.affordability}
                      </p>
                  
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {moment(order?.created_at).format("MMM Do YY")}
                      </p>
                 
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                   
                      <span className="relative">{order?.division}</span>
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
 
                        <span className="relative">{order?.facility}</span>
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold ${
                          order?.status === "rejected"
                            ? "text-green-900"
                            : "text-green-900"
                        } leading-tight`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0   opacity-50 rounded-full`}
                          style={{background: orderStatusColor}}
                        ></span>
                        <span className="relative">{order?.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm text-right">
                      <button
                        type="button"
                        className="inline-block text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          history.push({
                            pathname: "/mart/order-detailed",
                            state: order,
                          })
                        }
                      >
                        <svg
                          className="inline-block h-6 w-6 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </RenderHirePurchasePage>
    </div>
  );
}

export default OrderStatus;
