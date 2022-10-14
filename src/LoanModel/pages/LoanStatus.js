import {
  Avatar,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { dataActionCreators } from "../../services/Actions";
import RenderLoanPage from "../RenderLoanPage";
import { format } from "timeago.js";
import * as moment from "moment";
import NotFoundComponent from "../../Components/NotFoundComponent";
import Loader from "../../Components/Loader";
import { debounce } from "lodash";
import ReactPaginate from "react-paginate";

function LoanStatus() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { GetAppliedLoans } = bindActionCreators(dataActionCreators, dispatch);
  const [checkSouthLoan, setCheckSouthLoan] = useState(false);
  const [checkNorthLoan, setCheckNorthLoan] = useState(false);
  const [search, setSearch] = useState(null);
  const [limit, setLimit] = useState(5);
  const data = useSelector((state) => state?.data);
  const status = "all"
 

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = limit;
  const [currentPage, setCurrentPage] = useState(0);

  const { appliedLoans, paginate, isLoading } = data;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(appliedLoans?.slice(itemOffset, endOffset));
    setPageCount(Number(paginate?.total));
  }, [itemOffset, itemsPerPage, appliedLoans]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log("event", event);
    GetAppliedLoans(true, event.selected + 1, limit, status);

    console.log("currentPage", currentPage);

    const newOffset = (event.selected * itemsPerPage) % paginate?.total;

    setItemOffset(newOffset);
  };

  const handleSouthChange = (e) => {
    setCheckSouthLoan(e.target.checked);
  };
  const handleNorthChange = (e) => {
    setCheckNorthLoan(e.target.checked);
  };

  const onSearchTextChange = debounce((e) => {
    if (e?.target?.value) {
      setSearch(e?.target?.value ?? null);
      GetAppliedLoans(
        true,
        1,
        limit,
        status,
        `${e?.target?.value ? "&search=" + e?.target?.value : ""}`
      );
      // GetAllFunds(true, 1, limit, `${e?.target?.value ? "&search=" + e?.target?.value : ""}`)
    } else {
      setSearch(null);
      GetAppliedLoans(true, 1, limit, status);
    }
  }, 800);
  const Northern = checkNorthLoan && "Northern";
  const Southern = checkSouthLoan && "Southern";



  useEffect(() => {
    GetAppliedLoans(true, 1, limit, status);
    setCheckNorthLoan(false);
    setCheckSouthLoan(false);
  }, []);

  useEffect(() => {
    if (Northern && Southern) {
      GetAppliedLoans(true, 1, limit, status);
    } else if (Northern) {
      GetAppliedLoans(
        true,
        1,
        limit,
        status,
        `${Northern ? "&filter=" + "Northern" : ""}`
      );
    } else if (Southern) {
      GetAppliedLoans(
        true,
        1,
        limit,
        status,
        `${Southern ? "&filter=" + "Southern" : ""}`
      );
    } else {
      GetAppliedLoans(true, 1, limit, status);
    }

    // GetAppliedLoans("booked");
  }, [Southern, Northern]);

  useEffect(() => {
    GetAppliedLoans(
      true,
      1,
      limit,
      status,
      `${Northern ? "&filter=" + "Northern" : ""}`
    );
    // GetAppliedLoans("booked");
  }, [Northern]);

  return (
    <div className="LoanApplication">
      <RenderLoanPage title={""}>
        {isLoading && <Loader />}
        <div className="row">
          <div className="col-md-7">
            <label htmlFor="search">Search Query:</label>
            <input
              type={"search"}
              id="search"
              placeholder="search by staff id, name"
              className="form-control"
              onChange={onSearchTextChange}
            />
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <label htmlFor="search">List to show:</label>
            <select
              className="form-control"
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
            </select>
          </div>
        </div>

        {/* {appliedLoans.length > 0 ? ( */}
        <section className="bg-white mt-4">
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold leading-tight">
                  Booked Applications
                </h2>
                <div className="flex items-center justify-between">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checkSouthLoan}
                        onChange={handleSouthChange}
                      />
                    }
                    label="South Loans"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checkNorthLoan}
                        onChange={handleNorthChange}
                      />
                    }
                    label="North Loans"
                  />
                </div>
              </div>
              {/* here */}
              {appliedLoans?.length > 0 ? (
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
                          {/* <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100"></th> */}
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
                                    {loan?.user?.profile_image ? (
                                      <img
                                        className="w-full h-full rounded-full"
                                        src={loan?.user?.profile_image}
                                        alt=""
                                      />
                                    ) : (
                                      <>
                                        {loan?.user?.name?.split(" ")[0] ===
                                        "Mr." ? (
                                          <img
                                            className="w-full h-full rounded-full"
                                            src="/images/dev/avarta2.jpeg"
                                            alt=""
                                          />
                                        ) : (
                                          <img
                                            className="w-full h-full rounded-full"
                                            src="/images/dev/woman-avarta.jpeg"
                                            alt=""
                                          />
                                        )}
                                      </>
                                    )}
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
                                    className={`absolute inset-0 ${
                                      loan?.sector === "Northern"
                                        ? "bg-red-300"
                                        : "bg-blue-300"
                                    } opacity-50 rounded-full`}
                                  ></span>
                                  <span className="relative">
                                    {loan?.sector}
                                  </span>
                                </span>
                              </td>
                              {/* <td className="px-3 py-1 border-b border-gray-200 bg-white text-sm text-right">
                                <IconButton
                                  onClick={() => {
                                    history.push({
                                      pathname: "/loans/booked-detailed",
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
                              </td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {appliedLoans.length > 0 && (
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=">"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={5}
                      pageCount={pageCount}
                      previousLabel="<"
                      renderOnZeroPageCount={null}
                      containerClassName="pagination"
                      pageLinkClassName="page-num"
                      previousLinkClassName="page-num"
                      nextLinkClassName="page-num"
                      activeLinkClassName="active"
                    />
                  )}
                </div>
              ) : (
                <>
                  <NotFoundComponent
                    title={"No initiated loans at the monent"}
                  />
                </>
              )}

              {/* here */}
            </div>
          </div>
        </section>
    
      </RenderLoanPage>
    </div>
  );
}

export default LoanStatus;
