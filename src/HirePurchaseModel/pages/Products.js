/* eslint-disable  */
import { Avatar } from '@material-ui/core'
import React from 'react'
import { IoMdMore } from 'react-icons/io'
import ProductCard from '../Components/ProductCard'
import '../css/hirepurchase.css'
import RenderHirePurchasePage from '../RenderHirePurchasePage'
function Products() {
  return (
    <div className='products'>
        <RenderHirePurchasePage>
        <div className="row">
            <div className="col-md-7">
            <label htmlFor="search">Search Query:</label>
        <input type={'search'} id="search" placeholder="search by staff id, name" className="form-control"/>
            </div>
            <div className="col-md-3">
            <label htmlFor="search">List to show:</label>
            <select className="form-control">
                <option value={15}>Featured</option>
                <option value={15}>25</option>
                <option value={15}>30</option>
                <option value={15}>50</option>
                <option value={15}>100</option>
                <option value={15}>200</option>
                <option value={15}>250</option>
            </select>
            </div>
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

       <div className='productContainer'>
            <ProductCard/>
            <ProductCard/>
       </div>

       <table className="table">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Profile</th>
            <th scope="col">staff Id</th>
            <th scope="col">Name</th>
            <th scope="col">email</th>
            <th scope="col">Amount</th>
            <th scope="col">Peroid</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
                <div className='image'>
                    <img src='/images/dev/del.png' alt='image' style={{width: '70px'}}/>
                </div>
              {/* <Avatar alt="Remy Sharp" src="/images/dev/success.png" /> */}
            </th>

            <td>657656</td>
            <td>Agyapong Derrick</td>
            <td>derrick@upnmg.com</td>
            <td>Loan</td>
            <td>Active</td>
            <td ><button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><IoMdMore/></button></td>
          </tr>
          <tr>
            <th scope="row">
              <Avatar alt="Remy Sharp" src="/images/dev/cancel.png" />
            </th>
            <td>657656</td>
            <td>Agyapong Derrick</td>
            <td>derrick@upnmg.com</td>
            <td>Loan</td>
            <td>Active</td>
            <td>del</td>
          </tr>
          <tr>
            <th scope="row">
              <Avatar alt="Remy Sharp" src="i/mages/dev/A.png" />
            </th>
            <td>657656</td>
            <td>Agyapong Derrick</td>
            <td>derrick@upnmg.com</td>
            <td>Loan</td>
            <td>Active</td>
            <td>del</td>
          </tr>
          <tr>
            <th scope="row">
              <Avatar alt="Remy Sharp" src="/images/dev/loan.png" />
            </th>
            <td>657656</td>
            <td>Agyapong Derrick</td>
            <td>derrick@upnmg.com</td>
            <td>Loan</td>
            <td>Active</td>
            <td>del</td>
          </tr>
        </tbody>
      </table>
        </RenderHirePurchasePage>
    </div>
  )
}

export default Products