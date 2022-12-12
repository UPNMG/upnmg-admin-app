/* eslint-disable  */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { bindActionCreators } from "redux";
import Loader from "../../Components/Loader";
import { productActionCreators } from "../../services/Actions";
import ProductModal from "../Modal/AddProductModal";
import RenderHirePurchasePage from "../RenderHirePurchasePage";
import { RiDeleteBin2Line} from 'react-icons/ri'
import { FiEdit} from 'react-icons/fi'
import * as moment from 'moment'
import { GetUserProfile } from "../../services/Actions/authActions";
import PromptModal from "../../AdminModel/Components/PromptModal";
function ProductCategory() {
  const dispatch = useDispatch();
  const { GetProductCategory,AddProductCategory, ResetProductResponse, DeleteCategory,EditProductCategory } = bindActionCreators(
    productActionCreators,
    dispatch
  );
  const product = useSelector((state) => state?.product);
  const auth = useSelector((state) => state?.auth);
  const { category, response, isLoading } = product;
  const [openPromptModal, setPromptOpenModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState("");
  const [categoryEditFormData, setCategoryEditFormData] = useState({
    name: '',
    description:''
  });
  const [selectedEditData, setSelectedEditData] = useState(null);

  console.log("product", product);
  console.log("response", response);
  console.log("auth", auth);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };
  const handleEditProductChange = (e) => {
    const { name, value } = e.target;
    setCategoryEditFormData({ ...categoryEditFormData, [name]: value });
  };

  const handleSubmitCategory = (e) => {
      e.preventDefault()
      AddProductCategory(categoryFormData)
      setOpenModal(false)
      setCategoryFormData("")

      console.log(categoryFormData)
  }
  const handleSubmitEditCategory = (e) => {
      e.preventDefault()
      EditProductCategory(selectedEditData?._id,categoryEditFormData)
      setOpenEditModal(false)
      setCategoryEditFormData("")

      console.log(categoryFormData)
  }

  useEffect(() => {
    GetProductCategory();
    dispatch(GetUserProfile())
  }, []);

  useEffect(() =>{
    setCategoryEditFormData({
      name: selectedEditData?.name,
      description: selectedEditData?.description,
    })
  }, [selectedEditData])

  useEffect(() => {
    if (response?.state === "SUCCESS") {
      toast.success(response?.message);
      setTimeout(() => {
        ResetProductResponse();
        GetProductCategory();
      }, 1500);
    } else if (response?.state === "ERROR") {
      toast.error(response?.message);
      setTimeout(() => {
        ResetProductResponse();
      }, 1500);
    }
  }, [response?.state, response?.message]);


  return (
    <RenderHirePurchasePage>
        {isLoading && <Loader/>}
         <button
              type="button"
              class="mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"
              onClick={()=> setOpenModal(true)}
            >
              Add Category
            </button>
      <section className="bg-white mt-4">
          
        <div className="mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight pb-3">
              Product Category
              </h2>
            </div>
            <div className="-mx-1 sm:-mx-8 px-4 sm:px-8 py-0 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Categort Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>

                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.map((cate, index) => {
                      // console.log(loan)
                      return (
                        <tr key={index}>
                          <td className="px-1 py-3 border-b border-gray-200 bg-white text-sm">
                            <div className="flex">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {cate?.name}
                                </p>
                                <p className="text-gray-600 whitespace-no-wrap">
                                  {/* {loan?.staff_id} */}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {cate?.description}
                            </p>
                          </td>
                          <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(cate?.created_at).format("MMMM Do YYYY")}
                            </p>
                          </td>

                          <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm text-right">
                            <div  className="inline-block text-gray-500 hover:text-gray-700">
                            <FiEdit className="text-green-500" onClick={() => {
                              setSelectedEditData(cate)
                              setOpenEditModal(true)
                              }}/>

                            </div>
                            <div  className="inline-block px-3 text-gray-500 hover:text-gray-700">
                            <RiDeleteBin2Line className="text-red-500" onClick={() => {
                              setSelectedEditData(cate)
                              setPromptOpenModal(true)
                            }}/>

                            </div>
                          
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {openModal && (
        <ProductModal
          closeModal={setOpenModal}
          width="50%"
          title={"Add Category"}
        >
          <form>
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Electronics"
                // defaultValue={seletedUserData?.name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Description
              </label>
              <textarea id="description" name="description" rows="4" onChange={handleChange} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="write your description..."></textarea>
             
            </div>
          
            <div className="modalButton">
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={handleSubmitCategory}
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2"
                >
                  Add Category
                </button>
               
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-2 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </ProductModal>
      )}
      {openEditModal && (
        <ProductModal
          closeModal={setOpenEditModal}
          width="50%"
          title={"Edit Category"}
        >
          <form>
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Electronics"
                defaultValue={categoryEditFormData?.name}
                name="name"
                onChange={handleEditProductChange}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Description
              </label>
              <textarea id="description" name="description" rows="4" defaultValue={categoryEditFormData?.description} onChange={handleEditProductChange} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="write your description..."></textarea>
             
            </div>
          
            <div className="modalButton">
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={handleSubmitEditCategory}
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2"
                >
                  Edit Category
                </button>
              
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  onClick={() => setOpenEditModal(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-2 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </ProductModal>
      )}

{openPromptModal && (
        <PromptModal width={"35%"} title={"Delete"} closeModal={setPromptOpenModal}>
         
          <div class="p-6 text-center">
            <svg
              aria-hidden="true"
              class="mx-auto mb-3 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 class="mb-3 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this category?
            </h3>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={() => {
                DeleteCategory(selectedEditData?._id)
                setSelectedEditData(null)
                // console.log('first', first)
                setPromptOpenModal(false);
              }}
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={() => setPromptOpenModal(false)}
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </PromptModal>
      )}
      <ToastContainer autoClose={3000}/>
    </RenderHirePurchasePage>
  );
}

export default ProductCategory;
