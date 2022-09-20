import React from "react";
import "./AdminDashboard.css";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaHands, FaUsers, FaUsersCog } from "react-icons/fa";
import { TbMessage2 } from "react-icons/tb";
import { BsMenuButtonFill } from "react-icons/bs";
import { TiHomeOutline } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { RiHandCoinLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function RenderAdminPage({children, title}) {
    const history = useHistory()
  return (
    <div className="AdminDashboard">
      <section className="sideBar">
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
          <Avatar alt="Remy Sharp" src="/images/dev/success.png" />
          <p>Derrick</p>
          <button className="button"><span style={{paddingRight: '10px'}}> <FiLogOut /></span>Logout</button>
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
              <img src="/images/dev/loan.png" alt="" />
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

export default RenderAdminPage;
