/* eslint-disable  */
import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "../../Components/Loader";
import { productActionCreators } from "../../services/Actions";
import ProductCard from "../Components/ProductCard";
import "../css/hirepurchase.css";
import ProductModal from "../Modal/AddProductModal";
import RenderHirePurchasePage from "../RenderHirePurchasePage";
function Products() {
  const dispatch = useDispatch()
  const {GetProductCategory,AddProduct, ResetProductResponse, GetProducts} = bindActionCreators(productActionCreators, dispatch)
  const [openModal, setOpenModal] = useState(false);
  const [addProductFormData, setAddProductFormData] = useState("");


  const [isFeaturedChecked, setIsFeaturedChecked] = useState(false);
  const [isBannerChecked, setBannerChecked] = useState(false);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const {category, response, isLoading, products} = useSelector(state => state?.product)
  
  console.log('category', category)
  console.log('products', products)

  const initialFormEditData = {};

  const handleAddProductChnage = (e) => {
    const { name, value } = e.target;
    setAddProductFormData({ ...addProductFormData, [name]: value });
  };

  const handleFeatureChecked = () => {
    setIsFeaturedChecked(!isFeaturedChecked);
  };
  const handleBannerChecked = () => {
    setBannerChecked(!isBannerChecked);
  };

  const handleCheckColors = (e) => {
    const { value, checked } = e.target;

    console.log("value", value);
    if (checked) {
      setColors([...colors, value]);
    } else {
      const filterColor = colors.filter((color) => color !== value);
      setColors(filterColor);
    }
  };

  const handleCheckSizes = (e) => {
    const { value, checked } = e.target;

    console.log("value", value);
    if (checked) {
      setSizes([...sizes, value]);
    } else {
      const filter = sizes.filter((size) => size !== value);
      setSizes(filter);
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...addProductFormData,
      colors: colors,
      sizes: sizes,
      banner: isBannerChecked,
      featured: isFeaturedChecked
    }

    
    AddProduct(data)
    setOpenModal(false)

    console.log("data", data);
    console.log("isFeaturedChecked", isFeaturedChecked);
    console.log("colors", colors);
    console.log("sizes", sizes);
  };

  useEffect(() => {
    GetProductCategory()
    GetProducts(true,1,10)

  }, [])

  useEffect(() => {
    if (response?.state === "SUCCESS") {
      toast.success(response?.message);
      setTimeout(() => {
        ResetProductResponse();
       
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
      <div className="Products">
        <div className="row">
          <div className="col-md-5">
            <label htmlFor="search">Search Query:</label>
            <input
              type="search"
              id="search"
              name="search"
              className="shadow-sm bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="search by name"

              // onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="search">Product Category:</label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={'all'}>All</option>
              {category?.map((cate, index) =>  <option key={index} value={cate?._id}>{cate?.name}</option>)}
            
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="search">List to show:</label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={'10'}>10</option>
              <option value={'50'}>50</option>
              <option value={'150'}>150</option>
              <option value={'500'}>500</option>
              <option value={'700'}>700</option>
              <option value={'1000'}>1000</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => setOpenModal(true)}
            >
              Add New
            </button>
          </div>
        </div>

        <div className="productContainer py-3">
          {products?.length > 0 ? (<>
           {products?.map((product, index) =>  <ProductCard key={index} product={product}/>)}
          </>) : (<>
          not found
          </>)}
          
          {/* <ProductCard /> */}
        </div>

        {/* <table className="table">
        <thead>
          <tr>
          
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
      </table> */}
      </div>
      {openModal && (
        <ProductModal
          closeModal={setOpenModal}
          width="70%"
          title={"Add New Product"}
        >
          <form>
            <div className="grid gap-6 mb-1 md:grid-cols-2">
              <div>
                <label
                  htmlFor="product_name"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="product_name"
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  // defaultValue={seletedUserData?.name}
                  name="product_name"
                  onChange={handleAddProductChnage}
                />
              </div>

              <div className="grid gap-6 mb-1 md:grid-cols-2">
                <div className="item1">
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Add Product as featured
                  </label>

                  <div>
                    <label
                      htmlFor="featured"
                      className="inline-flex relative items-center mb-4 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="featured"
                        className="sr-only peer"
                      
                        checked={isFeaturedChecked}
                        onChange={handleFeatureChecked}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Featured
                      </span>
                    </label>
                  </div>
                </div>
                <div className="item2">
                  <label
                    htmlFor="name"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Add Product as Banner
                  </label>

                  <div>
                    <label
                      htmlFor="banner"
                      className="inline-flex relative items-center mb-4 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="banner"
                        className="sr-only peer"
                      
                        checked={isBannerChecked}
                        onChange={handleBannerChecked}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Banner
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="short_description"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Short Description
              </label>
              <input
                type="text"
                id="short_description"
                className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="short_description"
                // defaultValue={seletedUserData.staff_code}
                onChange={handleAddProductChnage}
              />
            </div>
            <div className="email_nd_phone grid gap-6 mb-1 md:grid-cols-3">
              <div className="email">
                <label
                  htmlFor="input-group-1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  New Price
                </label>
                <div className="relative mb-1">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
                  <input
                    type="text"
                    id="input-group-1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    name="old_price"
                    // defaultValue={seletedUserData.email}
                    onChange={handleAddProductChnage}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="new_price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  New Price
                </label>
                <input
                  type="text"
                  name="new_price"
                  id="new_price"
                  onChange={handleAddProductChnage}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  // defaultValue={seletedUserData.phone_number}
                />
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  onChange={handleAddProductChnage}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  // defaultValue={seletedUserData.phone_number}
                />
              </div>
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-3">
              <div className="roles">
                <label
                  htmlFor="roles"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Add Colors
                </label>

                <div className="flex items-center mb-1">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value="black"
                    name="color"
                    onChange={handleCheckColors}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Black
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    onChange={handleCheckColors}
                    value="red"
                    name="color"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />

                  <label
                    htmlFor="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Red
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value="blue"
                    name="color"
                    onChange={handleCheckColors}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />

                  <label
                    htmlFor="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Blue
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value="yellow"
                    name="color"
                    onChange={handleCheckColors}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />

                  <label
                    htmlFor="checked-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Yellow
                  </label>
                </div>
              </div>
              <div>
                <div className="superRole">
                  <label
                    htmlFor="super_role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Sizes
                  </label>

                  <div className="flex items-center mb-1">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value="XL"
                      name="size"
                      onChange={handleCheckSizes}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      XL
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value="XLL"
                      name="size"
                      onChange={handleCheckSizes}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="checked-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      XLL
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value="S"
                      name="size"
                      onChange={handleCheckSizes}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="checked-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      S
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value="M"
                      name="size"
                      onChange={handleCheckSizes}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />

                    <label
                      htmlFor="checked-checkbox"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      M
                    </label>
                  </div>
                </div>
              </div>
              <div className="superRole">
                <label
                  htmlFor="super_role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Category
                </label>
                <select
                  id="category"
                  onChange={handleAddProductChnage}
                  name={"category"}
                  className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">choose</option>
                  {category?.map((cate, index) =>  <option key={index} value={cate?._id}>{cate?.name}</option>)}
                  {/* <option value="ADMIN">ADMIN</option>
                  <option value="LOAN_OFFICER">LOAN OFFICER</option>
                  <option value="MART_OFFICER">MART OFFICER</option>
                  <option value="INVESTMENT_OFFICER">INVESTMENT OFFICER</option> */}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="2"
                onChange={handleAddProductChnage}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="write your description..."
              ></textarea>
            </div>

            <div className="modalButton">
              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={handleAddProductSubmit}
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
    </RenderHirePurchasePage>
  );
}

export default Products;
