/* eslint-disable  */
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import RenderLoanPage from "../RenderLoanPage";
import "./LoanCalculator.css";

function LoanCalculator() {
  const [formData, setFormData] = useState({});
  const [loanTerm, setLoanTerm] = useState(null);
  const [calculator, setCalculator] = useState(0)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const FEE_CHARGE = 15;
  const INTEREST_RATE = 11 / 100; //11%


  const handleCalculator = (e) => {
    e.preventDefault()
      console.log(loanTerm)
      console.log(formData)

      if(!formData.loanAmount){
        toast.error('Enter loan loan amount')
      }else if(!formData?.affordability){
        toast.error('Enter affordability')
      }else if(!loanTerm){
        toast.error('Select loan term')
      }else{
        if (formData.loanAmount && formData?.affordability && loanTerm) {
            const principalAndCharge = Number(formData.loanAmount) + 15;
            let convertedDuration = 0;
            if (Number(loanTerm) === 24) {
              convertedDuration = 2;
            } else if (Number(loanTerm) === 36) {
              convertedDuration = 3;
            } else if (
              Number(loanTerm) === 1 ||
              Number(loanTerm) === 3 ||
              Number(loanTerm) === 6 ||
              Number(loanTerm) === 12
            ) {
              convertedDuration = 1;
            }
      
            const duration = Number(convertedDuration) * INTEREST_RATE;
            const calc = principalAndCharge * duration;
            const initialAmount = calc + principalAndCharge;
            const monthlyDed = initialAmount / Number(loanTerm);
            setCalculator(Number(monthlyDed).toFixed(2));
          }
      }

     
  };

 

  return (
    <RenderLoanPage>
      <div className="CalContainer">
        <div className="bg-white px-4 pt-4 pb-2 mt-4" style={{ width: "60%" }}>
          <h1 className="text-center text-2xl font-semibold">Calculator</h1>
          <form>
            <div className="mb-6">
              <label
                htmlFor="amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Loan Amount
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="loanAmount"
                id="amount"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <div className="grid gap-3 mb-1 md:grid-cols-2">
              <div className="mb-6">
                <label
                  htmlFor="afford"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Affordability
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="affordability"
                  id="afford"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value="3"
                      onChange={(e) =>  setLoanTerm(e.target.value)}
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-license"
                      className="py-1 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      3{" "}
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-id"
                      type="radio"
                      value="6"
                      onChange={(e) =>  setLoanTerm(e.target.value)}
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-id"
                      className="py-1 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      6
                    </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-millitary"
                      type="radio"
                      value="12"
                      onChange={(e) =>  setLoanTerm(e.target.value)}
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-millitary"
                      className="py-1 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      12
                    </label>
                  </div>
                </li>
                <li className="w-full dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-passport"
                      type="radio"
                      value="24"
                      onChange={(e) =>  setLoanTerm(e.target.value)}
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-passport"
                      className="py-1 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      24
                    </label>
                  </div>
                </li>
                <li className="w-full dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      id="horizontal-list-radio-passport"
                      type="radio"
                      value="36"
                      onChange={(e) =>  setLoanTerm(e.target.value)}
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor="horizontal-list-radio-passport"
                      className="py-1 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      36
                    </label>
                  </div>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              onClick={handleCalculator}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Calculate
            </button>
          </form>

          <div className="calcResults">
            <h1>{calculator}</h1>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000}/>
    </RenderLoanPage>
  );
}

export default LoanCalculator;
