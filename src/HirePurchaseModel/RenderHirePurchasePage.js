import React from 'react'
import "./HirePurchaseDashboard.css";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaHands } from "react-icons/fa";
import { TbMessage2 } from "react-icons/tb";
import { BsMenuButtonFill } from "react-icons/bs";
import { TiHomeOutline } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
// import Chart from "./Components/Chart";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function RenderHirePurchasePage({children, title}) {
    const history = useHistory()
  return (
    <div className='AdminDashboard'>
              <section className="sideBar">
          <div className="menuList">
            <div className="menu" onClick={()=> history.push('/hirepurchase/home')}>
                <TiHomeOutline className="icon"/>
                <div className="label" >Home</div>
            </div>
            <div className="menu" onClick={()=> history.push('/hirepurchase/product')}>
                <FaHands className="icon"/>
                <div className="label">Products</div>
            </div>
            <div className="menu" onClick={()=> history.push('/hirepurchase/order')}>
                <GrMoney className="icon"/>
                <div className="label">Orders</div>
            </div>
            <div className="menu" onClick={()=> history.push('/hirepurchase/processed-order')}>
                <GrMoney className="icon"/>
                <div className="label">Processed Order</div>
            </div>
            <hr/>
            <div className="menu" onClick={()=> history.push('/hirepurchase/report')}>
                <GrMoney className="icon"/>
                <div className="label">Report</div>
            </div>
            <div className="menu" onClick={()=> history.push('/hirepurchase/setting')}>
                <GrMoney className="icon"/>
                <div className="label">Settings</div>
            </div>
            <div className="menu" onClick={()=> history.push('/hirepurchase/support')}>
                <GrMoney className="icon"/>
                <div className="label">Support</div>
            </div>
            {/* <div className="menu" onClick={()=> history.push('/admin/dues')}>
                <RiHandCoinLine className="icon"/>
                <div className="label">Dues Deduction</div>
            </div> */}

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
                <li onClick={()=> history.push('/loans/home')}>Dashboard</li>
                
            
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
  )
}

export default RenderHirePurchasePage