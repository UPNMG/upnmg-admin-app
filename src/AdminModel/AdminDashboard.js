/* eslint-disable  */
import {
  IconButton
} from "@material-ui/core";
import * as moment from "moment";
import React, { useEffect } from "react";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { bindActionCreators } from "redux";
import { format } from "timeago.js";
import CediSymbol from "../Components/CediSymbol";
import NotFoundComponent from "../Components/NotFoundComponent";
import { dataActionCreators } from "../services/Actions";
import "./AdminDashboard.css";
import Chart from "./Components/Chart";
import RenderAdminPage from "./RenderAdminPage";

function AdminDashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { GetAppliedLoans,GetAllDues, ResetDataResponse, GetTotal } = bindActionCreators(dataActionCreators, dispatch);

  const data = useSelector((state) => state?.data);
  const {isLoading, appliedLoans, paginate, response, totalMembers, totalFunds, totalLoans, totalDues} = data
 

  useEffect(() => {
    GetAppliedLoans(true, 1, 5, 'initiated');
    GetTotal()
  }, []);

  useEffect(() => {
    if(response?.state === "SUCCESS"){
      toast.success(response?.message)
      setTimeout(() => {
        ResetDataResponse()
    }, 1500);
    }else if(response?.state === "ERROR"){
      toast.success(response?.message)
      setTimeout(() => {
          ResetDataResponse()
      }, 1500);
    }
  })

  return (
    <div className="">
      <RenderAdminPage title={"Dashboard"}>
        {/* <div className="DashboardContent"> */}

        <div className="cardContainer">
          <div
            className="card"
            style={{ borderLeft: "3px solid rgba(51, 155, 252, 0.842)" }}
          >
            <div className="section1">
              <div className="imgCover">
                <img
                  src="/images/dev/loan.png"
                  className="rounded-full"
                  alt=""
                />
              </div>
              <div>Loan Model</div>
            </div>
            <Link to={"/loans/home"} target="_blank" className="section2">
              <div>learn more</div>
              <div>
                <BsArrowUpRightCircle />
              </div>
            </Link>
          </div>
          <div
            className="card"
            style={{ borderLeft: "3px solid rgba(7, 155, 69, 0.568)" }}
          >
            <div className="section1">
              <div className="imgCover">
                <img src="/images/dev/loan.png" alt="" />
              </div>
              <div>Users Model</div>
            </div>
            <div className="section2">
              <div>learn more</div>
              <div>
                <BsArrowUpRightCircle />
              </div>
            </div>
          </div>
          <div
            className="card"
            style={{ borderLeft: "3px solid rgba(255, 0, 0, 0.473)" }}
          >
            <div className="section1">
              <div className="imgCover">
                <img src="/images/dev/loan.png" alt="" />
              </div>
              <div>Hire Purchase Model</div>
            </div>
            <div className="section2">
              <div>learn more</div>
              <div>
                <BsArrowUpRightCircle />
              </div>
            </div>
          </div>
          <div
            className="card"
            style={{ borderLeft: "3px solid rgba(252, 232, 51, 0.842)" }}
          >
            <div className="section1">
              <div className="imgCover">
                <img src="/images/dev/loan.png" alt="" />
              </div>
              <div>Hire Purchase Model</div>
            </div>
            <div className="section2">
              <div>learn more</div>
              <div>
                <BsArrowUpRightCircle />
              </div>
            </div>
          </div>
         
        </div>

        <section className="chart_nd_deductions">
          <div className="chart">
            <Chart />
          </div>
          <div className="deductions">
            <div
              className="card cursor-pointer"
              onClick={() => history.push("/admin/loans")}
            >
              <div
                className="iconCover"
                style={{ background: "var(--success)" }}
              >
                {" "}
                <BsArrowUpRightCircle className="icon" />
              </div>
              <div className="title">Loans Ded</div>
              <div className="subTitle">loan deductions</div>
              <div className="value">
                <CediSymbol /> {totalLoans}
              </div>
            </div>

            <div
              className="card cursor-pointer"
              onClick={() => history.push("/admin/dues")}
            >
              <div
                className="iconCover"
                style={{ background: "var(--warning)" }}
              >
                {" "}
                <BsArrowUpRightCircle className="icon" />
              </div>
              <div className="title">Dues Ded</div>
              <div className="subTitle">Dues deductions</div>
              <div className="value">
                <CediSymbol /> {totalDues}
              </div>
            </div>
            <div
              className="card cursor-pointer"
              onClick={() => history.push("/admin/funds")}
            >
              <div
                className="iconCover"
                style={{ background: "var(--primary)" }}
              >
                {" "}
                <BsArrowUpRightCircle className="icon" />
              </div>
              <div className="title">Fund Ded</div>
              <div className="subTitle">Fund deductions</div>
              <div className="value">
                <CediSymbol /> {totalFunds}
              </div>
            </div>
            <div
              className="card cursor-pointer"
              onClick={() => history.push("/admin/funds")}
            >
              <div
                className="iconCover"
                style={{ background: "var(--default)" }}
              >
                {" "}
                <BsArrowUpRightCircle className="icon" />
              </div>
              <div className="title">Total Members</div>
              <div className="subTitle">Current Members</div>
              <div className="value">
                {totalMembers}
              </div>
            </div>
          </div>
        </section>

        <section className="usersDisplayyyyyyy">
          <div className="">
            <>
              {data?.appliedLoans.length > 0 ? (
                <section className="bg-white mt-4">
                  <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold leading-tight">
                          Loans Initiated
                        </h2>
                        {/* <div className="flex items-center justify-between">
                          <FormControlLabel
                            control={<Switch />}
                            label="South Loans"
                          />
                          <FormControlLabel
                            control={<Switch />}
                            label="North Loans"
                          />
                        </div> */}
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
                                  Loan Amount
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  Loan Term
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  Net Salary
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  Date
                                </th>
                                <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                  Status
                                </th>
                                {/* <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Region
                            </th> */}
                                <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.appliedLoans.map((loan, index) => {
                                console.log(loan);
                                return (
                                  <tr key={index}>
                                    <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                      <div className="flex">
                                        <div className="flex-shrink-0 w-10 h-10">
                                          <img
                                            className="w-full h-full rounded-full"
                                            src={loan?.user?.profile_image}
                                            alt=""
                                          />
                                        </div>
                                        <div className="ml-3">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {loan?.user?.name}
                                          </p>
                                          <p className="text-gray-600 whitespace-no-wrap">
                                            {loan?.staff_id}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        &#8373;{loan?.loanAmount}
                                      </p>
                                      <p className="text-gray-600 whitespace-no-wrap">
                                        MD : {loan?.monthlyDeduction}
                                      </p>
                                    </td>
                                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {loan?.loanTerm}
                                      </p>
                                      {/* <p className="text-gray-600 whitespace-no-wrap">
                                USD
                              </p> */}
                                    </td>
                                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {loan?.netSalary}
                                      </p>
                                      {/* <p className="text-gray-600 whitespace-no-wrap">
                                USD
                              </p> */}
                                    </td>

                                    <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {moment(loan?.created_at).format(
                                          "MMMM Do YYYY"
                                        )}
                                      </p>
                                      <p className="text-gray-600 whitespace-no-wrap">
                                        {/* {'time ago here'} */}
                                        {format(loan?.created_at)}
                                      </p>
                                    </td>
                                    <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                      <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span
                                          aria-hidden
                                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                        ></span>
                                        <span className="relative">
                                          {loan?.status}
                                        </span>
                                      </span>
                                    </td>
                                    {/* <td className="px-3 py-1 border-b border-gray-200 bg-white text-sm">
                                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">
                                      {loan?.user?.district}
                                    </span>
                                  </span>
                                </td> */}
                                    <td className="px-3 py-1 border-b border-gray-200 bg-white text-sm text-right">
                                      <IconButton
                                        onClick={() => {
                                          history.push({
                                            pathname:
                                              "/admin/loans-paid-detailed",
                                            state: { loan },
                                          });
                                        }}
                                      >
                                        <button
                                          type="button"
                                          className="inline-block text-gray-500 hover:text-gray-700"
                                        >
                                          <svg
                                            className="inline-block h-6 w-6 fill-current"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                                          </svg>
                                        </button>
                                      </IconButton>
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
              ) : (
                <>
                  <NotFoundComponent title={"No Paid loans available"} />
                </>
              )}
            </>
          </div>
          <div>
            <h2>Chart</h2>
          </div>
        </section>
        {/* </div> */}
        <ToastContainer autoClose={3000}/>
      </RenderAdminPage>
    </div>
  );
}

export default AdminDashboard;
