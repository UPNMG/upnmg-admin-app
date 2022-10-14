import React from "react";
import "./LoansDashboard.css";
import { MdLogout, MdOutlineNotificationsNone } from "react-icons/md";
import { FaHands } from "react-icons/fa";
import { TbMessage2 } from "react-icons/tb";
import { BsMenuButtonFill } from "react-icons/bs";
import { TiHomeOutline } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
// import Chart from "./Components/Chart";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function RenderLoanPage({ children, title }) {
  const history = useHistory();
  const handleLogout = () => {
    history.push('/logout')
  }
  return (
    <div className="LoansDashboard">
      <section className="LoanSideBar">
        <div className="menuList">
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/home")}
          >
            <TiHomeOutline className="icon" />
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
            <FaHands className="icon" />
            <div className="label">Loan Applications</div>
          </div>
     
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/booked")}
          >
            <GrMoney className="icon" />
            <div className="label">Booked Loans </div>
          </div>
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/initiated")}
          >
            <GrMoney className="icon" />
            <div className="label">Initiated Loans</div>
          </div>
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/paid")}
          >
            <GrMoney className="icon" />
            <div className="label">Loans Paid</div>
          </div>
          <div
            className="menu cursor-pointer"
            onClick={() => history.push("/loans/status")}
          >
            <GrMoney className="icon" />
            <div className="label">Loan Status</div>
          </div>
         
        </div>
        <div className="profile">
          <Avatar alt="Remy Sharp" src="/images/dev/success.png" />
          <p>Derrick</p>
          <button className="button flex items-center justify-center">
            <FiLogOut  className="mx-2"/>
            <div>Logout</div>
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
            <div className="">
              <TbMessage2 className="icon" />
            </div>
            <div className="">
              <MdOutlineNotificationsNone className="icon" />
            </div>
            <div className="userImage">
              <MdLogout className="text-white"  onClick={handleLogout}/>
             
            </div>
          </div>
        </div>

        <div className="DashboardContent">
          <h2>{title}</h2>
          {children}
        </div>
      </section>
    </div>
  );
}

export default RenderLoanPage;
