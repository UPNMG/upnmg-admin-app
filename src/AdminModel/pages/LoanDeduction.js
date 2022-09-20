import { Avatar } from "@material-ui/core";
import React from "react";
import '../css/pages.css'
import {IoMdMore} from 'react-icons/io'
import RenderAdminPage from "../RenderAdminPage";
function LoanDeduction() {
  return (
    <div className="LoanDeduction">
        <RenderAdminPage title={'Loans'}>
        <div className="row">
            <div className="col-md-7">
            <label htmlFor="search">Search Query:</label>
        <input type={'search'} id="search" placeholder="search by staff id, name" className="form-control"/>
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
              <Avatar alt="Remy Sharp" src="/images/dev/success.png" />
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




<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </RenderAdminPage>
       
    </div>
  );
}

export default LoanDeduction;
