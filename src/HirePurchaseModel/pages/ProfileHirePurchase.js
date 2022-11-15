/* eslint-disable  */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Components/Loader";
import { ChangePassword, GetUserProfile, ResetAuthResponse, UpdateProfileImage } from "../../services/Actions/authActions";
import RenderHirePurchasePage from "../RenderHirePurchasePage";
import "./ProfileHirePurchase.css";

function ProfileHirePurchase() {
    const dispatch = useDispatch()

  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState("");
  const [profilePublic_id, setProfilePublic_id] = useState("");
  const auth = useSelector(state => state.auth)
  const {response, user, isLoading} = auth

  console.log(auth)

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if(!formData.password || !formData.confirmPassword){
        toast.error('Please enter your new password')
    }else if(formData.password !== formData.confirmPassword){
        toast.error(`Your password don't match!!`)
    }else if(formData.password.length <= 5){
        toast.error(`Your password is too short!!`)
    } else{
        dispatch(ChangePassword(formData))
        console.log('formData', formData)
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setPreview([...preview, event.target.result]);
        dispatch(UpdateProfileImage(event.target.result, profilePublic_id))
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    dispatch(GetUserProfile())
    setProfilePublic_id(user?.profile_image_public_id)
  },[])

  useEffect(() => {
    if (response?.state === "SUCCESS") {
      toast.success(response?.message);
      dispatch(GetUserProfile())
      setTimeout(() => {
        dispatch(ResetAuthResponse())
      }, 1500);
    } else if (response?.state === "ERROR") {
      toast.error(response?.message);
      setTimeout(() => {
        dispatch(ResetAuthResponse())
      }, 1500);
    }
  }, [response?.state, response?.message]);


  return (
    <RenderHirePurchasePage>
        {isLoading && <Loader/>}
      <div className="ProfilePage">
        <img
          className="w-36 h-36 rounded"
        //   src="/images/dev/loan.png"
          src={user?.profile_image}
          alt="Extra large avatar"
        />

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center"
            htmlFor="multiple_files"
          >
            Upload Profile Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="multiple_files"
            type="file"
            onChange={handleFileChange}
          />
        </div>

        <div className="bg-white px-4 pt-4 pb-2 mt-4" style={{ width: "60%" }}>
          <h1 className="text-center text-2xl font-semibold">
            Change Password
          </h1>
          <form>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                name="confirmPassword"
                id="confirmpassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>

            <button
              type="submit"
              onClick={handlePasswordChange}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Change password
            </button>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={3000}/>
    </RenderHirePurchasePage>
  );
}

export default ProfileHirePurchase;
