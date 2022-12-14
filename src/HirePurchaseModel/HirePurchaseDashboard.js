/* eslint-disable  */
import React, { useEffect } from "react";
import { FaAccusoft, FaRegChartBar } from "react-icons/fa";
import { MdOutlineShowChart } from "react-icons/md";
import { RiBarChartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../Components/Loader";
import { GetUserProfile } from "../services/Actions/authActions";
import "./css/hirepurchase.css";
import RenderHirePurchasePage from "./RenderHirePurchasePage";
import * as moment from "moment";
import { bindActionCreators } from "redux";
import { productActionCreators } from "../services/Actions";
import { Link } from "react-router-dom";

function HirePurchaseDashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { GetOrders, GetTotals } = bindActionCreators(
    productActionCreators,
    dispatch
  );
  const product = useSelector((state) => state.product);
  const { isLoading, orders, totals } = product;
  const {
    totalProducts,
    totalOrders,
    totalApprovedOrders,
    totalInitiatedOrders,
    totalRejectedOrders,
    totalShippedOrders,
    totalSubmitedOrders,
  } = totals;
  console.log("orders", orders);
  console.log("totals", totals);

  const data = [
    {
      products: {},
    },
  ];

  useEffect(() => {
    dispatch(GetUserProfile());
    GetOrders(true, 1, 5, "submitted", "");
    GetTotals();
  }, []);

  return (
    // <div className='HirePurchaseDashboard'>
    <RenderHirePurchasePage>
      {isLoading && <Loader />}
      <section className="cardContainer">
        <div className="card card1">
          <div className="icons">
            <div className="cover">
              <FaAccusoft />
            </div>
            <div className="">
              {/* <MdOutlineShowChart/> */}
              <FaRegChartBar />
            </div>
          </div>
          <div>Total products</div>
          <div className="value">{totalProducts}</div>
          <hr />
          <Link to={'/mart/product'}>view more</Link>
        </div>
        <div className="card card2">
          <div className="icons">
            <div className="cover">
              <FaAccusoft />
            </div>
            <div className="">
              {/* <FaAddressBook/> */}
              <MdOutlineShowChart />
            </div>
          </div>
          <div>Total Orders</div>
          <div className="value">{totalOrders}</div>
          <hr />
          <Link to={'/mart/order'}>view more</Link>
        </div>
        <div className="card card3">
          <div className="icons">
            <div className="cover">
              <FaAccusoft />
            </div>
            <div className="">
              {/* <FaAddressBook/> */}
              <RiBarChartLine />
            </div>
          </div>
          <div>Approved Orders</div>
          <div className="value">{totalApprovedOrders}</div>
          <hr />
          <Link to={'/mart/approved-order'}>view more</Link>
        </div>
        <div className="card card4">
          <div className="icons">
            <div className="cover">
              <FaAccusoft />
            </div>
            <div className="">
              {/* <FaAddressBook/> */}
              <RiBarChartLine />
            </div>
          </div>
          <div>Rejected Orders</div>
          <div className="value">{totalRejectedOrders}</div>
          <hr />
          <Link to={'/mart/rejected-order'}>view more</Link>
        </div>
      </section>

      {/* {data?.products.length > 0 && ( */}
      <section className="bg-white mt-4">
        <div className="mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight pb-3">
                New Orders
              </h2>
            </div>
            <div className="-mx-1 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
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
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order, index) => {
                      // console.log(loan)
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
                            {/* <p className="text-gray-600 whitespace-no-wrap">
                              USD
                            </p> */}
                          </td>
                          <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(order?.created_at).format("MMM Do YY")}
                            </p>
                            {/* <p className="text-gray-600 whitespace-no-wrap">
                              {'time ago here'}
                            </p> */}
                          </td>
                          <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                            {/* <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                            </span> */}
                            <span className="relative">{order?.division}</span>
                          </td>
                          <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                            {/* <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                            </span> */}
                            <span className="relative">{order?.facility}</span>
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
            </div>
          </div>
        </div>
      </section>
    </RenderHirePurchasePage>
    // </div>
  );
}

export default HirePurchaseDashboard;
