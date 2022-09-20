import React from "react";
import "./AdminDashboard.css";
import {BsArrowUpRightCircle } from "react-icons/bs";

import Chart from "./Components/Chart";
import { Avatar } from "@material-ui/core";
import RenderAdminPage from "./RenderAdminPage";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function AdminDashboard() {
    const history = useHistory()
  return (
    <div className="">
        <RenderAdminPage title={'Dashboard'}>
        {/* <div className="DashboardContent"> */}
      
        <div className="cardContainer">
          <div className="card">
            <div className="section1">
              <div className="imgCover">
                <img src="/images/dev/loan.png" alt="" />
              </div>
              <div>Loan Model</div>
              <div>+23</div>
            </div>
            <div className="section2">
              <div>learn more</div>
              <div>
                <BsArrowUpRightCircle />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="section1">
              <div className="imgCover">
                <img src="/images/dev/loan.png" alt="" />
              </div>
              <div>Users Model</div>
              <div>5</div>
            </div>
            <div className="section2">
              <div>learn more</div>
              <div>
                <BsArrowUpRightCircle />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="section1">
              <div className="imgCover">
                <img src="/images/dev/loan.png" alt="" />
              </div>
              <div>Hire Purchase Model</div>
              <div>8</div>
            </div>
            <div className="section2">
              <div>learn more</div>
              <div>
                <BsArrowUpRightCircle />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="section1">
              <div className="imgCover">
                <img src="/images/dev/loan.png" alt="" />
              </div>
              <div>Hire Purchase Model</div>
              <div>8</div>
            </div>
            <div className="section2">
              <div>learn more</div>
              <div>
                <BsArrowUpRightCircle />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="section1">
              <div className="imgCover">
                <img src="/images/dev/loan.png" alt="" />
              </div>
              <div>Loan Model</div>
              <div>+23</div>
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
          <div className="card" onClick={() => history.push('/admin/loans')}>
            <BsArrowUpRightCircle className="icon" />
            <div className="title">Loans Ded</div>
            <div className="subTitle">loan deductions</div>
            <div className="value">200</div>
          </div>
          <div className="card">
            <BsArrowUpRightCircle className="icon" />
            <div className="title">Dues Ded</div>
            <div className="subTitle">Dues deductions</div>
            <div className="value">200</div>
          </div>
          <div className="card">
            <BsArrowUpRightCircle className="icon" />
            <div className="title">Fund Ded</div>
            <div className="subTitle">Fund deductions</div>
            <div className="value">200</div>
          </div>
        </div>
      </section>

      <section className="usersDisplayyyyyyy">
        <div className="">
         
          {/* <div className="usersTable">
            <table className="table">
              <thead>
                <tr>
                 
                  <th scope="col">Profile</th>
                  <th scope="col">Name</th>
                  <th scope="col">email</th>
                  <th scope="col">role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <Avatar alt="Remy Sharp" src="images/dev/success.png" />
                  </th>
                  <td>Agyapong Derrick</td>
                  <td>derrick@upnmg.com</td>
                  <td>Loan</td>
                  <td>Active</td>
                  <td>del</td>
                </tr>
                <tr>
                  <th scope="row">
                    <Avatar alt="Remy Sharp" src="images/dev/cancel.png" />
                  </th>
                  <td>Agyapong Derrick</td>
                  <td>derrick@upnmg.com</td>
                  <td>Loan</td>
                  <td>Active</td>
                  <td>del</td>
                </tr>
                <tr>
                  <th scope="row">
                    <Avatar alt="Remy Sharp" src="images/dev/A.png" />
                  </th>
                  <td>Agyapong Derrick</td>
                  <td>derrick@upnmg.com</td>
                  <td>Loan</td>
                  <td>Active</td>
                  <td>del</td>
                </tr>
                <tr>
                  <th scope="row">
                    <Avatar alt="Remy Sharp" src="images/dev/loan.png" />
                  </th>
                  <td>Agyapong Derrick</td>
                  <td>derrick@upnmg.com</td>
                  <td>Loan</td>
                  <td>Active</td>
                  <td>del</td>
                </tr>
              </tbody>
            </table>
          </div> */}
      <>
      <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Client / Invoice
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Issued / Due
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
              ></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Molly Sanders
                    </p>
                    <p className="text-gray-600 whitespace-no-wrap">000004</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">$20,000</p>
                <p className="text-gray-600 whitespace-no-wrap">USD</p>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span className="relative">Paid</span>
                </span>
              </td>
              <td
                className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-right"
              >
                <button
                  type="button"
                  className="inline-block text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="inline-block h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Molly Sanders
                    </p>
                    <p className="text-gray-600 whitespace-no-wrap">000004</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">$20,000</p>
                <p className="text-gray-600 whitespace-no-wrap">USD</p>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span className="relative">Paid</span>
                </span>
              </td>
              <td
                className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-right"
              >
                <button
                  type="button"
                  className="inline-block text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="inline-block h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <div className="flex">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Molly Sanders
                    </p>
                    <p className="text-gray-600 whitespace-no-wrap">000004</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">$20,000</p>
                <p className="text-gray-600 whitespace-no-wrap">USD</p>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
              </td>
              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                <span
                  className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                  ></span>
                  <span className="relative">Paid</span>
                </span>
              </td>
              <td
                className="px-5 py-2 border-b border-gray-200 bg-white text-sm text-right"
              >
                <button
                  type="button"
                  className="inline-block text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="inline-block h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                    />
                  </svg>
                </button>
              </td>
            </tr>

           
          </tbody>
        </table>

      </>
        </div>
        <div>
          <h2>Chart</h2>
        </div>
      </section>
        {/* </div> */}
        </RenderAdminPage>
    </div>
  );
}

export default AdminDashboard;
