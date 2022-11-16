/* eslint-disable  */
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "../../Components/Loader";
import { dataActionCreators } from "../../services/Actions";
import "../css/fundDed.css";
import "../css/pages.css";
import RenderAdminPage from "../RenderAdminPage";
function UPNMGMembers() {
  const dispatch = useDispatch();
  const { GetAllFunds, GetMembers } = bindActionCreators(
    dataActionCreators,
    dispatch
  );
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState(null);
  const [pageRange, setPageRange] = useState({
    page: 1,
    totalToShow: 1,
  });
  const data = useSelector((state) => state.data);
  // const paginate = data?.paginate;
  const { members, paginate, isLoading } = data;
  console.log("paginate", paginate);

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = limit;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;

    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(members?.slice(itemOffset, endOffset));
    setPageCount(Number(paginate?.total));
  }, [itemOffset, itemsPerPage, members]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log("event", event);

    GetMembers(true, event.selected + 1, limit);

    console.log("currentPage", currentPage);

    const newOffset = (event.selected * itemsPerPage) % paginate?.total;

    setItemOffset(newOffset);
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
  };
  //TODO:: IMPLEMENT SEARCH FUNCTIONALITY ON THE BACKEND
  const onSearchTextChange = debounce((e) => {
    if (e?.target?.value) {
      setSearch(e?.target?.value ?? null);
      console.log("search", search);
      console.log("e?.target?.value", e?.target?.value);
      GetMembers(
        true,
        1,
        15,
        `${e?.target?.value ? "&search=" + e?.target?.value : ""}`
      );
    } else {
      setSearch(null);
      GetMembers(true, 1, 15, null);
    }
  }, 800);

  useEffect(() => {
    GetMembers(true, 1, limit);
  }, []);

  useEffect(() => {
    GetMembers(true, 1, limit);
  }, [limit]);

  return (
    <div className="UPNMGMembers">
      <RenderAdminPage>
        {isLoading && <Loader />}
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
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={250}>250</option>
            </select>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Members</h2>
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
                        Email
                        {/* deducted */}
                      </th>
                      <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        District
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Department
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
                    {members?.length > 0 ? (
                      <>
                        {members?.map((member) => {
                          return (
                            <tr>
                              <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                <div className="flex">
                                  <div className="flex-shrink-0 w-10 h-10">
                                    {member?.profile_image ? (
                                      <img
                                        className="w-full h-full rounded-full"
                                        src={member?.profile_image}
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        className="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt=""
                                      />
                                    )}
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap ">
                                      {member?.name}
                                    </p>
                                    <p className="text-gray-600 whitespace-no-wrap font-semibold">
                                      {member?.staff_id}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {member?.email}
                                </p>
                              </td>
                              <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {member?.district}
                                </p>
                              </td>
                              <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {member?.department}
                                </p>
                              </td>
                              <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {member?.facility}
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
              {members?.length > 0 && (
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

      
      </RenderAdminPage>
    </div>
  );
}

export default UPNMGMembers;
