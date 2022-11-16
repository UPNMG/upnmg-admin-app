/* eslint-disable  */
import {
  IconButton
} from "@material-ui/core";
import * as moment from "moment";
import React, { useEffect } from "react";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { format } from "timeago.js";
import NotFoundComponent from "../Components/NotFoundComponent";
import { dataActionCreators } from "../services/Actions";
import "./LoansDashboard.css";
import RenderLoanPage from "./RenderLoanPage";

function LoansDashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { GetAppliedLoans } = bindActionCreators(dataActionCreators, dispatch);

  const data = useSelector((state) => state?.data);
  const totalLoans = data?.appliedLoans?.length
  const totalLoansBooked = data?.appliedLoans?.filter((loan) => loan.status === "booked").length
  const totalLoansInitiated = data?.appliedLoans?.filter((loan) => loan.status === "initiated").length
  const totalLoansSubmitted = data?.appliedLoans?.filter((loan) => loan.status === "submitted").length
  console.log("data", data);

  useEffect(() => {
    GetAppliedLoans(true, 1, 5, 'submitted');
  }, []);

  return (
   
      <RenderLoanPage title={""}>
        <div className="">
          <div className="loanCardContainer ">
            <div
              className="card"
              onClick={() => history.push("/loans/application")}
            >
              
              <div
                className="iconCover"
                style={{ background: "var(--success)" }}
              >
                {" "}
                <BsArrowUpRightCircle className="icon" />
              </div>
              <div className="title">Loan Application</div>
              <div className="subtitle">View all</div>
              <div className="value">{totalLoans}</div>
            </div>
            <div
              className="card"
              // onClick={() => history.push("/loans/application")}
            >
              
              <div
                className="iconCover"
                style={{ background: "var(--primary)" }}
              >
                {" "}
                <BsArrowUpRightCircle className="icon" />
              </div>
              <div className="title">Unprocessed Loans</div>
              <div className="subtitle">View submitted</div>
              <div className="value">{totalLoansSubmitted}</div>
            </div>
            <div className="card">
            <div
                className="iconCover"
                style={{ background: "var(--danger)" }}
              >
                {" "}
                <BsArrowUpRightCircle className="icon" />
              </div>
              <div className="title">Loan Booked</div>
              <div className="subtitle">View booked</div>
              <div className="value">{totalLoansBooked}</div>
            </div>
            <div className="card">
            <div
                className="iconCover"
                style={{ background: "var(--warning)" }}
              >
                {" "}
                <BsArrowUpRightCircle className="icon" />
              </div>
              <div className="title">Loan Initiated</div>
              <div className="subtitle">View initiated</div>
              <div className="value">{totalLoansInitiated}</div>
            </div>
            <div></div>
          </div>

          <section className="bg-white mt-4 ">
            <div className=" mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold leading-tight pb-3">
                    Loan Request
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
                            Mandate Number
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            OTP
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Sector
                          </th>
                          <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.appliedLoans.length > 0 ? (
                          <>
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
                                      {loan?.mandateNumber}
                                    </p>
                                    {/* <p className="text-gray-600 whitespace-no-wrap">
                              USD
                            </p> */}
                                  </td>
                                  <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {loan?.otpNumber}
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
                                  <td className="px-3 py-1 border-b border-gray-200 bg-white text-sm">
                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                      <span
                                        aria-hidden
                                        className={`absolute inset-0 ${loan?.sector === 'Northern' ? 'bg-red-300': 'bg-blue-300'} opacity-50 rounded-full`}
                                      ></span>
                                      <span className="relative">
                                        {loan?.sector}
                                      </span>
                                    </span>
                                  </td>
                                  <td className="px-3 py-1 border-b border-gray-200 bg-white text-sm text-right">
                                    <IconButton
                                      onClick={() => {
                                        history.push({
                                          pathname:
                                            "/loans/application-detailed",
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
                          </>
                        ): (<div className="flex justify-center">
                        <NotFoundComponent title={'No Loan application available'}/>
                        </div>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

         
        </div>
      </RenderLoanPage>
    
  );
}

export default LoansDashboard;
