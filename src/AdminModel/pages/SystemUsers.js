import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "../css/pages.css";
import "./SystemUsers.css";
import { IoMdMore } from "react-icons/io";
import RenderAdminPage from "../RenderAdminPage";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { authActionCreators, dataActionCreators } from "../../services/Actions";
import { format } from "timeago.js";
import { useHistory } from "react-router-dom";
import Modal from "../Components/Modal";

import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Components/Loader";
function SystemUsers() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { GetSystemUsers } = bindActionCreators(dataActionCreators, dispatch);
  const { AddNewSystemUser, ResetAuthResponse } = bindActionCreators(
    authActionCreators,
    dispatch
  );
  const data = useSelector((state) => state.data);
  const auth = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const initialFormData = {
    name: "",
    email: "",
    staff_code: "",
    phone_number: "",
    password: "",
    super_role: "ADMIN",
    title: "Mr."
  };
  const [formData, setFormData] = useState(initialFormData);
  const [seletedRoles, setSelectedRoles] = useState([]);
const roles = []
  const rolesValues = [
    "ADMIN",
    "LOAN",
    "MART",
    "INVESTMENT",
    // {
    //   ADMIN: "ADMIN",
    // },
    // {
    //   LOAN_OFFICER: "LOAN",
    // },
    // {
    //   MART_OFFICER: "MART",
    // },
    // {
    //   INVESTMENT_OFFICER: "INVESTMENT",
    // },
  ];

  console.log("roles", roles);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("formData", formData);
  };

  const handleChipAdmin = () => {};
  const handleChipLoan = () => {};
  const handleChipMart = () => {};
  const handleChipInvestment = () => {};

  const handleModalSubmit = (e) => {
    e?.preventDefault();
    // console.log('e', e)
    const newName =  `${formData.title} ${formData.name}`
    console.log("formData", {...formData, name: newName, user_type: 'SYSTEM_USER', role: ["ADMIN", "LOAN_OFFICER"], staff_id: formData.staff_code});
    if (formData?.name) {
      AddNewSystemUser({...formData, name: newName, user_type: 'SYSTEM_USER', role: ["ADMIN", "LOAN_OFFICER"], staff_id: formData.staff_code});
      setFormData(initialFormData)
      setOpenModal(false)
    }
  };

  useEffect(() => {
    GetSystemUsers();
  }, []);

  useEffect(() => {
    if (auth?.response?.state === "SUCCESS") {
      toast.success(auth?.response?.message);
      setTimeout(() => {
        ResetAuthResponse();
        GetSystemUsers();
      }, 300);
    } else if (auth?.response?.state === "ERROR") {
      toast.error(auth?.response?.message);
      setTimeout(() => {
        ResetAuthResponse();
      }, 300);
    }
  }, [auth?.response?.state, auth?.response?.message]);

  return (
    <div className="LoanDeduction SystemUsers">
      <RenderAdminPage title={""}>
        {auth.isLoading && <Loader />}
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-2xl font-semibold leading-tight ">
            System users
          </div>
          <div>
            {/* <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              data-modal-toggle="defaultModal"
            >
              Toggle modal
            </button> */}
            <button className="customBtn" onClick={() => setOpenModal(true)}>
              Add Member
            </button>
          </div>
        </div>

        <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Email
                        {/* deducted */}
                      </th>
                      <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Roles
                        {/* Type */}
                      </th>
                      <th className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Main Role
                      </th>
                      <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100">
                        {/* Date */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.system_users?.length > 0 ? (
                      <>
                        {data?.system_users?.map((user, index) => {
                          return (
                            <tr key={index}>
                              <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                                <div className="flex">
                                  <div className="flex-shrink-0 w-10 h-10">
                                    {user?.profile_image ? (
                                      <img
                                        className="w-full h-full rounded-full"
                                        src={user?.profile_image}
                                        alt=""
                                      />
                                    ) : (
                                      <>
                                      {user?.name?.split(' ')[0] === "Mr." ? (
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
                                      {user?.name}
                                    </p>
                                    <p className="text-gray-600 whitespace-no-wrap">
                                      {user?.staff_id}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                 
                                  {user?.email}
                                </p>
                                {/* <p className="text-gray-600 whitespace-no-wrap">USD</p> */}
                              </td>
                              <td className="px-2 py-1 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user?.phone_number}
                                </p>
                                {/* <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p> */}
                              </td>
                              <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                    
                                <p className="text-gray-900 whitespace-no-wrap">
                                {user?.role.map((rol) => {
                        return <span className="mr-2">{rol}</span>;
                      })}
                                </p>
                              </td>
                              <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                            
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {user?.super_role}
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

    

        {openModal && (
          <Modal
            closeModal={setOpenModal}
            // submitFunction={handleModalSubmit()}
            title={"Add User"}
            width={"50%"}
          >
            <form>
              <div className="" style={{
                display: 'grid',
                gridTemplateColumns: '20% 80%',
                gap: '3px'
              }}>
              <div className="superRole">
                    <label
                      htmlFor="super_role"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Title
                    </label>
                    <select
                      id="title"
                      onChange={handleChange}
                      name={"title"}
                      value={formData.title}
                      class="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Miss">Miss</option>
                      
                    </select>
                  </div>
                  <div>
                <label
                  for="name"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>
              </div>
         
              <div>
                <label
                  for="staff_id"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Staff Code
                </label>
                <input
                  type="text"
                  id="staff_id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  name="staff_code"
                  value={formData.staff_code}
                  onChange={handleChange}
                />
              </div>
              <div className="email_nd_phone grid gap-6 mb-1 md:grid-cols-2">
                <div className="email">
                  <label
                    for="input-group-1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your Email
                  </label>
                  <div className="relative mb-1">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example@gmail.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    id="phone"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={formData.phone_number}
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="roles">
                  <label
                    for="roles"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Add Roles
                  </label>
                  <div className="chips">
                    {/* <div className="chip" onClick={() => setSelectedRoles({...seletedRoles, })}>ADMIN</div> */}
                    {/* <div
                      className="chip"
                      onClick={() =>
                        setSelectedRoles({ ...seletedRoles, admin: "ADMIN" })
                      }
                    >
                      LOAN{" "}
                    </div> */}
                    {rolesValues.map((rol, index) => {
                      return (
                        <div
                          key={index}
                          className="chip"
                          onClick={() => {
                            console.log(rol);
                           
                            // roles.push(rol)
                            // setSelectedRoles({...seletedRoles, rol})
                          }}
                        >
                          {rol}{" "}
                        </div>
                      );
                    })}
                    {/* <div className="chip" onClick={handleChipInvestment}>
                      INVESTMENT{" "}
                    </div> */}
                  </div>
                  {/* <div className="flex items-center mb-1">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    ADMIN
                  </label>
                </div> */}
                  {/* <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />

                  <label
                    for="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    LOAN OFFICER
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />

                  <label
                    for="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    MART OFFICER
                  </label>
                </div> */}
                  {/* <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />

                  <label
                    for="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                   INVESTMENT OFFICER
                  </label>
                </div> */}
                </div>
                <div>
                  <div className="superRole">
                    <label
                      htmlFor="super_role"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Choose Main Role
                    </label>
                    <select
                      id="super_role"
                      onChange={handleChange}
                      name={"super_role"}
                      class="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="LOAN_OFFICER">LOAN OFFICER</option>
                      <option value="MART_OFFICER">MART OFFICER</option>
                      <option value="INVESTMENT_OFFICER">
                        INVESTMENT OFFICER
                      </option>
                    </select>
                  </div>
                  <div className="password">
                    <label
                      htmlFor="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Default Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modalButton">
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  data-modal-toggle="defaultModal"
                  type="submit"
                  onClick={handleModalSubmit}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Continue
                </button>
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Decline
                </button>
              </div>
            </div>
            </form>
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </RenderAdminPage>
    </div>
  );
}

export default SystemUsers;
