/* eslint-disable  */
// import Chart from "./Components/Chart";
import { Avatar } from "@material-ui/core";
import React from 'react';
import { BsMenuButtonFill, BsUiChecks } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineLocalShipping, MdOutlineNotificationsNone } from "react-icons/md";
import { TbMessage2 } from "react-icons/tb";
import { GoRepoClone, GoSettings } from "react-icons/go";
import { BiArchive, BiCategory, BiExpand } from "react-icons/bi";
import { AiFillGold, AiOutlineSlack } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "./HirePurchaseDashboard.css";
import { RiShoppingCartFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../services/Actions/authActions";
import { TiCancel } from "react-icons/ti";
import { FaPeopleCarry } from "react-icons/fa";

function RenderHirePurchasePage({children, title}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const { user} = auth
    const handleLogout = () => {
      dispatch(SignOut())
      setTimeout(() => {
        window.location.reload(false)
      },500)
    }
  return (
    <div className='RenderHirePurchasePage'>
              <section className="sideBar">
          <div className="menuList">
            <div className="menu" onClick={()=> history.push('/mart/home')}>
                <AiFillGold className="icon"/>
                <div className="label" >Home</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/vendors')}>
                <FaPeopleCarry className="icon"/>
                <div className="label">Suppliers</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/category')}>
                <BiCategory className="icon"/>
                <div className="label">Category</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/product')}>
                <BiArchive className="icon"/>
                <div className="label">Products</div>
            </div>
            
            <div className="menu" onClick={()=> history.push('/mart/order')}>
                <GiShoppingCart className="icon"/>
                <div className="label">Orders</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/processed-order')}>
                <RiShoppingCartFill className="icon"/>
                <div className="label">Processed Order</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/shipped-order')}>
                <MdOutlineLocalShipping className="icon"/>
                <div className="label">Shipped Order</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/approved-order')}>
                <BsUiChecks className="icon"/>
                <div className="label">Approved Order</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/rejected-order')}>
                <TiCancel className="icon"/>
                <div className="label">Rejected Order</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/status-order')}>
                <AiOutlineSlack className="icon"/>
                <div className="label">Status of orders</div>
            </div>
            <hr className="my-4"/>
            <div className="menu" onClick={()=> history.push('/mart/report')}>
                <GoRepoClone className="icon"/>
                <div className="label">Report</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/setting')}>
                <GoSettings className="icon"/>
                <div className="label">Settings</div>
            </div>
            <div className="menu" onClick={()=> history.push('/mart/support')}>
                <BiExpand className="icon"/>
                <div className="label">Support</div>
            </div>
            {/* <div className="menu" onClick={()=> history.push('/admin/dues')}>
                <RiHandCoinLine className="icon"/>
                <div className="label">Dues Deduction</div>
            </div> */}

          </div>
          <div className="profile">
          <img className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={`${user?.profile_image ? user?.profile_image : '/images/dev/avatar1.png'}`} alt="Bordered avatar"/>
          <p>{user?.name}</p>
          <button className="button" onClick={() => handleLogout()}><span style={{paddingRight: '10px'}}> </span>Logout</button>
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
                <li onClick={()=> history.push('/mart/home')}>Dashboard</li>
                
            
            </div>
          </div>
          <div className="prodileInfo">
            <div className="">
              <TbMessage2 className="icon" />
            </div>
            <div className="">
              <MdOutlineNotificationsNone className="icon" />
            </div>
<img onClick={()=> history.push('/mart/profile')} className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={`${user?.profile_image ? user?.profile_image : '/images/dev/avatar1.png'}`} alt="Bordered avatar"/>
            {/* <div className="userImage"> */}


              {/* <img src="/images/dev/loan.png" alt="" /> */}
            {/* </div> */}
          </div>
        </div>

        <div className="DashboardContent pt-3 px-3">
            <h2>{title}</h2>
            {children}
        </div>

 
      </section>

      
    </div>
  )
}

export default RenderHirePurchasePage