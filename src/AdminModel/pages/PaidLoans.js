
import {
    Avatar,
    FormControlLabel,
    FormGroup,
    IconButton,
    Switch,
  } from "@material-ui/core";
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useHistory } from "react-router-dom";
  import { bindActionCreators } from "redux";
  import { dataActionCreators } from "../../services/Actions";
  import { format } from "timeago.js";
  import * as moment from "moment";
import RenderAdminPage from "../RenderAdminPage";
import Loader from "../../Components/Loader";
import NotFoundComponent from "../../Components/NotFoundComponent";
  
  
  function PaidLoans() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { GetAppliedLoans } = bindActionCreators(dataActionCreators, dispatch);
  
    const data = useSelector((state) => state?.data);
    console.log("data", data);
    const {isLoading, appliedLoans} = data
  
    useEffect(() => {
      GetAppliedLoans(`?status=paid`);
    }, []);
  
    return (
      <div className="LoanApplication">
        <RenderAdminPage title={""}>
            {isLoading && <Loader/>}
          <div className="row">
            <div className="col-md-7">
              <label htmlFor="search">Search Query:</label>
              <input
                type={"search"}
                id="search"
                placeholder="search by staff id, name"
                className="form-control"
              />
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-2">
              <label htmlFor="search">List to show:</label>
              <select className="form-control">
                <option value={15}>15</option>
                <option value={15}>25</option>
                <option value={15}>30</option>
                <option value={15}>50</option>
                <option value={15}>100</option>
                <option value={15}>200</option>
                <option value={15}>250</option>
              </select>
            </div>
          </div>
  
          {appliedLoans.length > 0 ? (
            <section className="bg-white mt-4">
              <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold leading-tight">
                      Paid Loans
                    </h2>
                    <div className="flex items-center justify-between" >
                      <FormControlLabel
                        control={<Switch />}
                        label="South Loans"
                      />
                      <FormControlLabel
                  
                        control={<Switch />}
                        label="North Loans"
                      />
                    </div>
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
                          {appliedLoans.map((loan, index) => {
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
                                        pathname: "/admin/loans-paid-detailed",
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
          ): (<>
          <NotFoundComponent title={'No Paid loans available'}/>
          </>)}
  
        
  
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RenderAdminPage>
      </div>
    );
  }
  
  export default PaidLoans;
  