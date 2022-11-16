/* eslint-disable  */
import React, { useEffect } from "react";
import { BsMenuButtonFill } from "react-icons/bs";
import { FaHands, FaUsers, FaUsersCog } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { MdLogout, MdOutlineNotificationsNone } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";
import { TbMessage2 } from "react-icons/tb";
import { TiHomeOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../Components/Loader";
import { SignOut } from "../services/Actions/authActions";
import "./AdminDashboard.css";

function RenderAdminPage({children, title}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const auth = useSelector(state => state?.auth)
    const user = JSON.parse(localStorage.getItem('user'))
   
    const handleLogout = () => {
      // history.push('/logout')
      dispatch(SignOut())
      setTimeout(() => {
        window.location.reload(false)
      },1000)
    }


    
  return (
    <div className="AdminDashboard">
      {/* {auth.isLoading && <Loader/>} */}
      <section className="sideBar">
      <div className="sec1">

      </div>
      <div className="sec2">
      <div className="menuList">
            <div className="menu" onClick={()=> history.push('/admin/home')}>
                <TiHomeOutline className="icon"/>
                <div className="label" >Home</div>
            </div>
            <div className="menu" onClick={()=> history.push('/admin/funds')}>
                <FaHands className="icon"/>
                <div className="label">Funds deduction</div>
            </div>
            <div className="menu" onClick={()=> history.push('/admin/loans')}>
                <GrMoney className="icon"/>
                <div className="label">Loan Deduction</div>
            </div>
            <div className="menu" onClick={()=> history.push('/admin/loans-bookings')}>
                <GrMoney className="icon"/>
                <div className="label">Initiated Loans</div>
            </div>
            <div className="menu" onClick={()=> history.push('/admin/loans-paid')}>
                <GrMoney className="icon"/>
                <div className="label">Paid Loans</div>
            </div>
            <div className="menu" onClick={()=> history.push('/admin/dues')}>
                <RiHandCoinLine className="icon"/>
                <div className="label">Dues Deduction</div>
            </div>
            <div className="menu" onClick={()=> history.push('/admin/members')}>
                <FaUsers className="icon"/>
                <div className="label">UPNMG members</div>
            </div>
            <div className="menu" onClick={()=> history.push('/admin/users')}>
                <FaUsersCog className="icon"/>
                <div className="label">System Users</div>
            </div>
          </div>
          <div className="profile">
          {/* <Avatar alt="Remy Sharp" src="/images/dev/success.png" /> */}
          {/* <p>Derrick</p> */}
          <button className="button">
            {/* <p>Welcome</p> */}
            <span style={{paddingRight: '10px'}}></span>Welcome, {user?.name?.split(' ')[0]}</button>
          </div>
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
                <li onClick={()=> history.push('/admin/home')}>Dashboard</li>
                <li onClick={()=> history.push('/admin/users')}>Add users</li>
            
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
              <MdLogout className="text-white"  onClick={() => handleLogout()}/>
             
            </div>
          </div>
        </div>

        <div className="DashboardContent container">
            <h2>{title}</h2>
            {children}
        </div>

 
      </section>

      
    </div>
  );
}

export default RenderAdminPage;
