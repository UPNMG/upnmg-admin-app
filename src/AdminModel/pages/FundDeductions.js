import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../css/pages.css";
import { IoMdMore } from "react-icons/io";
import RenderAdminPage from "../RenderAdminPage";
import { bindActionCreators } from "redux";
import { dataActionCreators } from "../../services/Actions";
import { useDispatch, useSelector } from "react-redux";
import CediSymbol from "../../Components/CediSymbol";
import { debounce } from "lodash";
import {
  ArrowBackIosSharp,
  ArrowBackOutlined,
  DoubleArrowOutlined,
} from "@material-ui/icons";
import "../css/fundDed.css";
import ReactPaginate from "react-paginate";
import Loader from "../../Components/Loader";
function FundDeductions() {
  const dispatch = useDispatch();
  const { GetAllFunds } = bindActionCreators(dataActionCreators, dispatch);
  const [limit, setLimit] = useState(20);
  
  const [search, setSearch] = useState(null);


  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = limit;
  const [currentPage, setCurrentPage] = useState(0);
  const data = useSelector((state) => state.data);
  // const paginate = data?.paginate
  const { funds, paginate, isLoading } = data;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(funds?.slice(itemOffset, endOffset));
    setPageCount(Number(paginate?.total));
  }, [itemOffset, itemsPerPage, funds]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log("event", event);

    GetAllFunds(true, event.selected + 1, limit);

    console.log("currentPage", currentPage);

    const newOffset = (event.selected * itemsPerPage) % paginate?.total;

    setItemOffset(newOffset);
  };

  console.log("data", data);

  const handleLimit = (e) => {
    setLimit(e.target.value);
  };

  const onSearchTextChange = debounce((e) => {
    if (e?.target?.value) {
      setSearch(e?.target?.value ?? null);
      console.log("search", search);
      console.log("e?.target?.value", e?.target?.value);
      GetAllFunds(
        true,
        1,
        15,
        `${e?.target?.value ? "&search=" + e?.target?.value : ""}`
      );
    } else {
      setSearch(null);
      GetAllFunds(true, 1, 15, null);
    }
  }, 800);

  // const handleSearch = debounce((e) => {
  //     setSearch(prevState => {
  //       return {
  //         ...prevState,
  //         [e.target.name] : e.target.value
  //       }
  //     })
  //     if(search){
  //       console.log('search', search)
  //        GetAllFunds(true, 1, 15, `&search=${search}`)
  //     }else{
  //       GetAllFunds(true, 1, 15, null)
  //     }
  // }, 800)

  // const handleSearch = (e) => {
  //   setSearch(e.target.value)
  // }

  useEffect(() => {
    GetAllFunds(true, 1, limit);
  }, []);

  useEffect(() => {
    GetAllFunds(true, 1, limit);
  }, [limit]);

  return (
    <div className="LoanDeduction">
      <RenderAdminPage>
        {isLoading && <Loader/>}
        <div className="row container pt-2">
          <div className="col-md-7">
            <label htmlFor="search">Search Query:</label>
            <input
              type={"search"}
              onChange={onSearchTextChange}
              id="search"
              placeholder="search by staff id, name"
              className="form-control"
            />
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-2">
            <label htmlFor="search">List to show:</label>
            <select className="form-control " onChange={handleLimit}>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={70}>70</option>
              <option value={100}>100</option>
              <option value={150}>150</option>
              <option value={250}>250</option>
              <option value={350}>350</option>
              <option value={500}>500</option>
              <option value={600}>600</option>
            </select>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">
                Fund Deductions
              </h2>
            </div>
            <div className="-mx-1 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Member Info
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Amount
                        {/* deducted */}
                      </th>
                      <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Transaction
                        {/* Type */}
                      </th>
                      <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Facility
                      </th>
                      <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {funds?.length > 0 ? (
                      <>
                        {funds?.map((fund) => {
                          return (
                            <tr>
                              <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                <div className="flex">
                                  <div className="flex-shrink-0 w-10 h-10">
                                    {fund?.user?.profile_image ? (
                                      <img
                                        className="w-full h-full rounded-full"
                                        src={fund?.user?.profile_image}
                                        alt=""
                                      />
                                    ) : (
                                      <>
                                      {fund?.user?.name?.split(' ')[0] === "Mr." ? (
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
                                      {fund?.user?.name}
                                    </p>
                                    <p className="text-gray-600 whitespace-no-wrap">
                                      {fund?.staff_id}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  <CediSymbol />
                                  {fund?.deduction}
                                </p>
                                {/* <p className="text-gray-600 whitespace-no-wrap">USD</p> */}
                              </td>
                              <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {fund?.period}
                                </p>
                                {/* <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p> */}
                              </td>
                              <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                    
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {fund?.transaction_type}
                                </p>
                              </td>
                              <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                            
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {fund?.user?.facility}
                                </p>
                              </td>
                              <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm text-right">
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
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    ) : (
                      <>Data is not available</>
                    )}
                  </tbody>
                </table>
              </div>

              {funds.length > 0 && (
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
          </div>
        </div>

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

export default FundDeductions;
