/* eslint-disable  */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { bindActionCreators } from "redux";
import Loader from "../../Components/Loader";
import { dataActionCreators } from "../../services/Actions";
import RenderLoanPage from "../RenderLoanPage";
import "./Loan.css";

function LoanApplicationDetailed() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch()

  const {MarkedAsBookedAppliedLoans, ResetDataResponse} = bindActionCreators(dataActionCreators, dispatch)
  const data = useSelector(state => state?.data)
  const response = data?.response
  console.log("location", location);
  const loanDetailed = location?.state?.loan;
  const defaultImage = "/images/dev/success.png";

  console.log("loanDetailed", loanDetailed);

  const handleMarkedAsBooked = (loan_id) => {
    // alert(loan_id)
    const body = {
      status: true
    }
    MarkedAsBookedAppliedLoans(loan_id, body)
  }

  useEffect(() => {
    if (response?.state === "SUCCESS") {
      toast.success(response?.message);
      setTimeout(() => {
        ResetDataResponse();
        history.push('/loans/application')
      }, 1500);
    } else if (response?.state === "ERROR") {
      toast.error(response?.message);
      setTimeout(() => {
        ResetDataResponse();
        // history.push('')
      }, 1500);
    }
  }, [response?.state]);

  return (
    <div className="LoanApplicationDetailed">
      <RenderLoanPage title={""}>
        {data.isLoading && <Loader/>}
    <div className="flex justify-between">
    <div
          className="relative inline-block px-3 my-2 mx-2 py-1 font-semibold text-white leading-tight cursor-pointer"
          onClick={() => history.goBack()}
        >
          <span
            aria-hidden
            className="absolute inset-0 bg-gray-900 opacity-50 rounded-full"
          ></span>
          <span className="relative">Back</span>
        </div>
        <div className="mt-2">
          <span onClick={() => handleMarkedAsBooked(loanDetailed?._id)} className="customBtn">Marked as Booked</span>
        </div>
    </div>

        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <img
                src={
                  loanDetailed?.user?.profile_image
                    ? loanDetailed?.user?.profile_image
                    : defaultImage
                }
                style={{ width: "200px" }}
                alt=""
              />
            </div>
          
            <div className="mt-5 ">
              <h2>Send Message</h2>
              <textarea
                className="form-control"
                placeholder="Write your message here..."
              ></textarea>
              <button className="btn btn-success btn-sm mt-2">
                Send Message
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="displaySection">
              <div className="sideOne">
                <div className="item">
                  <div className="name">Full Name</div>
                  <div className="value">{loanDetailed?.user?.name}</div>
                </div>
                <div className="item">
                  <div className="name">Staff ID</div>
                  <div className="value">{loanDetailed?.user?.staff_id}</div>
                </div>
                <div className="item">
                  <div className="name">Facility</div>
                  <div className="value">{loanDetailed?.user?.facility}</div>
                </div>
                <div className="item">
                  <div className="name">Email Address</div>
                  <div className="value">{loanDetailed?.email}</div>
                </div>
                <div className="item">
                  <div className="name">Phone Number</div>
                  <div className="value">{loanDetailed?.personal_phone}</div>
                </div>
                <div className="item">
                  <div className="name">Date Of Birth</div>
                  <div className="value">{loanDetailed?.dateOfBirth}</div>
                </div>
                <div className="item">
                  <div className="name">Age</div>
                  <div className="value">{loanDetailed?.age}</div>
                </div>
                <div className="item">
                  <div className="name">Residential Address 1</div>
                  <div className="value">
                    <p>{loanDetailed?.residential_address1}</p>
                    <p>{loanDetailed?.residential_address2}</p>
                  </div>
                </div>
                <div className="item">
                  <div className="name">Work Address</div>
                  <div className="value">
                    <p>{loanDetailed?.work_address1}</p>
                    <p>{loanDetailed?.work_address2}</p>
                  </div>
                </div>
                <div className="item">
                  <div className="name">Work Phone</div>
                  <div className="value">{loanDetailed?.work_phone}</div>
                </div>
                <div className="item">
                  <div className="name">ID Card Type</div>
                  <div className="value">{loanDetailed?.IdCardType}</div>
                </div>
                <div className="item">
                  <div className="name">ID Number</div>
                  <div className="value">{loanDetailed?.IDCardNumber}</div>
                </div>

                <hr />
                <h3>Reference</h3>

                <div className="item">
                  <div className="name">Full name</div>
                  <div className="value">
                    {loanDetailed?.refSurname +
                      " " +
                      loanDetailed?.refMiddleName +
                      " "}
                  </div>
                </div>
                <div className="item">
                  <div className="name">Contact 1</div>
                  <div className="value">{loanDetailed?.refContact1}</div>
                </div>
                <div className="item">
                  <div className="name">Contact 2</div>
                  <div className="value">{loanDetailed?.refContact2}</div>
                </div>
                <div className="item">
                  <div className="name">Ghana Card Number</div>
                  <div className="value">
                    {loanDetailed?.RefGhanaNationIdentificationNo}
                  </div>
                </div>
              </div>
              <div className="sideTwo">
                <div className="item">
                  <div className="name">Loan Amount</div>
                  <div className="value">{loanDetailed?.loanAmount}</div>
                </div>
                <div className="item">
                  <div className="name">Loan Term</div>
                  <div className="value">{loanDetailed?.loanTerm}</div>
                </div>
                <div className="item">
                  <div className="name">Affordability</div>
                  <div className="value">{loanDetailed?.affordability}</div>
                </div>
                <div className="item">
                  <div className="name">Net Salary</div>
                  <div className="value">{loanDetailed?.netSalary}</div>
                </div>
                <div className="item">
                  <div className="name">Mandate Number</div>
                  <div className="value">{loanDetailed?.mandateNumber}</div>
                </div>
                <div className="item">
                  <div className="name">OTP Number</div>
                  <div className="value">{loanDetailed?.otpNumber}</div>
                </div>
                <div className="item">
                  <div className="name">Monthly Deduction</div>
                  <div className="value">{loanDetailed?.monthlyDeduction}</div>
                </div>

                <hr />
                <div className="item">
                  <div className="name">SNNIT Number</div>
                  <div className="value">{loanDetailed?.ssnit}</div>
                </div>
                <div className="item">
                  <div className="name">Bank Name</div>
                  <div className="value">{loanDetailed?.bank_name}</div>
                </div>
                <div className="item">
                  <div className="name">Account Holder Name</div>
                  <div className="value">
                    {loanDetailed?.bank_account_holder_name}
                  </div>
                </div>
                <div className="item">
                  <div className="name">Bank Branch</div>
                  <div className="value">{loanDetailed?.bank_branch}</div>
                </div>
                <div className="item">
                  <div className="name">Account Number</div>
                  <div className="value">
                    {loanDetailed?.bank_account_number}
                  </div>
                </div>
                <hr />

                <div className="item">
                  <div className="name">Employer Name</div>
                  <div className="value">{loanDetailed?.employer_name}</div>
                </div>
                <div className="item">
                  <div className="name">Employee Start Date</div>
                  <div className="value">
                    {loanDetailed?.employment_start_date}
                  </div>
                </div>

                <div
                  className="item"
                  style={{
                    alignItems: "center",
                  }}
                >
                  <img src={loanDetailed?.frontIDImage} alt="id_front" />
                  <a className="btn btn-sm bg-blue-500">Download</a>
                </div>
                <div
                  className="item"
                  style={{
                    alignItems: "center",
                  }}
                >
                  <img src={loanDetailed?.backIDImage} alt="id_back" />
                  <a className="btn btn-sm bg-blue-500" href={loanDetailed?.backIDImage}>Download</a>
                </div>
              </div>
            </div>
            <div>
              <h2>Loan Purpose</h2>
              <textarea
                readOnly
                style={{
                  width: "100%",
                  border: "none",
                  padding: "10px",
                  outline: "none",
                }}
                placeholder="ghehaj"
              >
                {loanDetailed?.purposeForLoan}
              </textarea>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={3000}/>
      </RenderLoanPage>
    </div>
  );
}

export default LoanApplicationDetailed;
