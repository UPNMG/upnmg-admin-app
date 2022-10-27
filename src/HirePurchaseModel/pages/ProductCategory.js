import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { bindActionCreators } from "redux";
import Loader from "../../Components/Loader";
import { productActionCreators } from "../../services/Actions";
import ProductModal from "../Modal/AddProductModal";
import RenderHirePurchasePage from "../RenderHirePurchasePage";

function ProductCategory() {
  const dispatch = useDispatch();
  const { GetProductCategory,AddProductCategory, ResetProductResponse } = bindActionCreators(
    productActionCreators,
    dispatch
  );
  const product = useSelector((state) => state?.product);
  const { category, response, isLoading } = product;

  const [openModal, setOpenModal] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState("");

  console.log("product", product);
  console.log("response", response);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({ ...categoryFormData, [name]: value });
  };

  const handleSubmitCategory = (e) => {
      e.preventDefault()
      AddProductCategory(categoryFormData)
      setOpenModal(false)
      setCategoryFormData("")

      console.log(categoryFormData)
  }

  useEffect(() => {
    GetProductCategory();
  }, []);

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
              class="mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={()=> setOpenModal(true)}
            >
              Add Category
            </button>
      <section className="bg-white mt-4">
          
        <div className="mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight pb-3">
                New Orders
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
                              {cate?.created_at}
                            </p>
                          </td>

                          <td className="px-5 py-1 border-b border-gray-200 bg-white text-sm text-right">
                            <button
                              type="button"
                              className="inline-block text-gray-500 hover:text-gray-700"
                            >
                              <svg
                                className="inline-block h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                              </svg>
                            </button>
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
                  classNamE="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Save Product
                </button>
                {/* <button
                onClick={(e) => handleEditModalSubmit(e, seletedUserData?._id)}
                    data-modal-toggle="defaultModal"
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save User
                  </button> */}
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </ProductModal>
      )}
      <ToastContainer autoClose={3000}/>
    </RenderHirePurchasePage>
  );
}

export default ProductCategory;
