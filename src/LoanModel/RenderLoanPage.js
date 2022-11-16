/* eslint-disable  */
// import Chart from "./Components/Chart";
import { Avatar } from "@material-ui/core";
import React from "react";
import { AiFillGold } from "react-icons/ai";
import { BiBookAlt } from "react-icons/bi";
import { BsCalculator, BsMenuButtonFill } from "react-icons/bs";
import { FaHands } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { GrMoney, GrStatusUnknown } from "react-icons/gr";
import { MdLogout, MdOutlineLibraryBooks, MdOutlineNotificationsNone } from "react-icons/md";
import { TbMessage2 } from "react-icons/tb";
import { TiHomeOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SignOut } from "../services/Actions/authActions";
import "./LoansDashboard.css";
function RenderLoanPage({ children, title }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const { user} = auth
  

  const handleLogout = () => {
    dispatch(SignOut())
    setTimeout(() => {
      window.location.reload(false)
    },1000)
  }
  return (
    <div className="LoansDashboard">
      <section className="LoanSideBar">
        <div className="menuList">
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/home")}
          >
           <AiFillGold className="icon"/>
            <div className="label cursor-pointer">Home</div>
          </div>
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/fund-deduction")}
          >
            <FaHands className="icon" />
            <div className="label">Fund Deduction</div>
          </div>
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/application")}
          >
            <GiMoneyStack className="icon" />
            <div className="label">Loan Applications</div>
          </div>
     
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/booked")}
          >
            <BiBookAlt className="icon" />
            <div className="label">Booked Loans </div>
          </div>
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/initiated")}
          >
            <MdOutlineLibraryBooks className="icon" />
            <div className="label">Initiated Loans</div>
          </div>
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/paid")}
          >
            <GiTakeMyMoney className="icon" />
            <div className="label">Loans Paid</div>
          </div>
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/status")}
          >
            <GrStatusUnknown className="icon" />
            <div className="label">Loan Status</div>
          </div>
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/calculator")}
          >
            <BsCalculator className="icon" />
            <div className="label">Loan Calculator</div>
          </div>
         
        </div>
        <div className="profile">
         
          <img className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={`${user?.profile_image ? user?.profile_image : '/images/dev/avatar1.png'}`} alt="Bordered avatar"/>
          <p>{user?.name}</p>
          <button className="button flex items-center justify-center">
            <FiLogOut  className="mx-2"/>
            <div onClick={handleLogout}>Logout</div>
          </button>
        </div>
      </section>

      <section className="mainPage">
        <div className="topBar">
          <div className="icon_nd_search">
            <div>
              <BsMenuButtonFill />
            </div>
            <div className="menus">
              <li>settings</li>
              <li onClick={() => history.push("/loans/home")}>Dashboard</li>
            </div>
          </div>
          <div className="prodileInfo">
            <div className="" onClick={() => history.push("/loans/messages")}>
              <TbMessage2 className="icon" />
            </div>
            <div className="">
              <MdOutlineNotificationsNone className="icon" />
            </div>

            <img onClick={()=> history.push('/loans/profile')} className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={`${user?.profile_image ? user?.profile_image : '/images/dev/avatar1.png'}`} alt="Bordered avatar"/>

            {/* <div className="userImage">
              <MdLogout className="text-white"  onClick={handleLogout}/>
             
            </div> */}

          </div>
        </div>

        <div className="px-3 pt-2 DashboardContent">
          <h2>{title}</h2>
          {children}
        </div>
      </section>
    </div>
  );
}

export default RenderLoanPage;
