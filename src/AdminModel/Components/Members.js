/* eslint-disable  */
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

function Members(props) {
    const {data} = props
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.members.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.members.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.members.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

 
  return (
      <>
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
                    {data?.members?.length > 0 ? (
                      <>
                        {data?.members?.map((member) => {
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
                                {/* <p className="text-gray-600 whitespace-no-wrap">USD</p> */}
                              </td>
                              <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {member?.district}
                                </p>
                                {/* <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p> */}
                              </td>
                              <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                {/* <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">Paid</span>
                  </span> */}
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {member?.department}
                                </p>
                              </td>
                              <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                                {/* <span
                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">Paid</span>
                  </span> */}
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

                <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
            </>
  )
}

export default Members