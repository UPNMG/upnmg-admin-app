/* eslint-disable  */
import { Delete, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import PromptModal from "../../AdminModel/Components/PromptModal";
import CediSymbol from "../../Components/CediSymbol";
import { productActionCreators } from "../../services/Actions";
import ProductModal from "../Modal/AddProductModal";

function ProductCard({ product, category }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { DeleteProduct, EditProduct, DeleteProductImages, GetSuppliers } =
    bindActionCreators(productActionCreators, dispatch);
  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const [openPromptModal, setPromptOpenModal] = useState(false);
  const [editProductFormData, setEditProductFormData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [preview, setPreview] = useState([]);
  const [seletedFiles, setSeletedFiles] = useState([]);

  const [isFeaturedChecked, setIsFeaturedChecked] = useState(product?.featured);
  const [isBannerChecked, setBannerChecked] = useState(false);

  const { suppliers } = useSelector((state) => state.product);

  console.log("suppliers", suppliers);

  const handleEditProductChnage = (e) => {
    const { name, value } = e.target;
    setEditProductFormData({ ...editProductFormData, [name]: value });
  };
  const handleFileChange = (e) => {
    // const { name, value } = e.target;
    // setEditProductFormData({ ...editProductFormData, [name]: value });

    console.log("e", e.target.files);

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = function (event) {
      // The file's text will be printed here
      setPreview([...preview, event.target.result]);
      // console.log(event.target.result)
    };
    setSeletedFiles([...seletedFiles, file]);
    reader.readAsDataURL(file);
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
      const filterColorExist = colors.find((color) => color === value);
      if (!filterColorExist) {
        setColors([...colors, value]);
      }
    } else {
      const filterColor = colors.filter((color) => color !== value);
      setColors(filterColor);
    }
  };

  const handleCheckSizes = (e) => {
    const { value, checked } = e.target;

    console.log("value", value);
    if (checked) {
      const filterSizeExist = sizes.find((size) => size === value);
      if (!filterSizeExist) {
        setSizes([...sizes, value]);
      }
      setSizes([...sizes, value]);
    } else {
      const filter = sizes.filter((size) => size !== value);
      setSizes(filter);
    }
  };

  const handleDeleteCloudImage = (public_id, product_id) => {
    DeleteProductImages(product_id, public_id);
  };

  const handleDeletePrevImage = (prevImg) => {
    const newPrevImages = preview.filter((img) => img !== prevImg);
    setPreview(newPrevImages);
  };

  const handleEditProductSubmit = (e) => {
    e.preventDefault();
    // const fileData = new FormData();
    // fileData.append("files", seletedFiles);

    const data = {
      ...editProductFormData,
      colors: colors,
      sizes: sizes,
      banner: isBannerChecked,
      featured: isFeaturedChecked,
    };

    // console.log("editProductFormData", editProductFormData);
    // TODO:: NEXT TODO AFTER CODE // WORKING ON UPDATE PRODUCT IMAGE FAILING
    //ERROR:: UNEXPECTED FILED // CHECK ON BACKEND
    EditProduct(product?._id, data, seletedFiles);
    setPreview(null);
    setOpenEditProductModal(false);

    // console.log("data", data);
    // console.log("seletedFiles", seletedFiles);
  };
  console.log("product", product);

  useEffect(() => {
    setEditProductFormData({
      category: product?.category?._id,
      description: product?.description,
      featured: product?.featured,
      new_price: product?.new_price,
      old_price: product?.old_price,
      product_name: product?.product_name,
      quantity: product?.quantity,
      short_description: product?.short_description,
      banner: product?.banner,
    });
    setColors(product?.colors);
    setSizes(product?.sizes);
    GetSuppliers();
  }, []);

  useEffect(() => {
    setIsFeaturedChecked(product?.featured);
    setBannerChecked(product?.banner);
    setColors(product?.colors);
    setSizes(product?.sizes);
  }, [product]);

  console.log("product", product);
  return (
    <>
      <div className="productCard">
        <div className="items">
          <div className="image">
            {console.log("images", product?.images)}
            {product?.images?.length > 0 ? (
              <>{<img src={product?.images[0]?.url} alt="product" />}</>
            ) : (
              <img src="/images/dev/del.png" alt="product" />
            )}
          </div>
          <div className="product-name">{product?.product_name}</div>
          <div className="price">
            <CediSymbol /> {product?.new_price}
          </div>
          <div className="ordered_date">
            {product?.quantity > 0 ? "Available in stock" : "Out of stock"}
          </div>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={() =>
                history.push({
                  pathname: "/mart/product-detail",
                  state: { product_id: product?._id },
                })
              }
            >
              view detail
            </button>
            <div
              className="editBtn mx-1"
              onClick={() => setOpenEditProductModal(true)}
            >
              <Edit className="icon" />
            </div>
            <div
              className="delBtn"
              onClick={() => {
                //  setSelectedProduct(product)
                setPromptOpenModal(true);
              }}
            >
              {" "}
              <div onClick={() => {
                setSelectedProduct(product)
                setPromptOpenModal(true)
              }}><Delete className="icon" /></div>
            </div>
          </div>
        </div>
      </div>

      {openEditProductModal && (
        <ProductModal
          closeModal={setOpenEditProductModal}
          width="70%"
          title={"Edit Product"}
          height={"90vh"}
          overflowY={"scroll"}
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
                  defaultValue={product?.product_name}
                  className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  // defaultValue={seletedUserData?.name}
                  name="product_name"
                  onChange={handleEditProductChnage}
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

            <div className="grid gap-6 mb-1 md:grid-cols-2">
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
                  defaultValue={product?.short_description}
                  className="bg-gray-50 mb-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="short_description"
                  // defaultValue={seletedUserData.staff_code}
                  onChange={handleEditProductChnage}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Supplier
                </label>
                <select
                  id="supplier"
                  onChange={handleEditProductChnage}
                  name={"supplier"}
                  className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={product?.supplier?._id}>
                    {product?.supplier?.name}
                  </option>
                  {suppliers?.map((supplier, index) => (
                    <option key={index} value={supplier?._id}>
                      {supplier?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="email_nd_phone grid gap-6 mb-1 md:grid-cols-3">
              <div className="email">
                <label
                  htmlFor="new_price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  New Price
                </label>
                <div className="relative mb-1">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"></div>
                  <input
                    type="text"
                    id="new_price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    defaultValue={product?.new_price}
                    name="new_price"
                    // defaultValue={seletedUserData.email}
                    onChange={handleEditProductChnage}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="old_price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Old Price
                </label>
                <input
                  type="text"
                  name="old_price"
                  id="old_price"
                  defaultValue={product?.old_price}
                  onChange={handleEditProductChnage}
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
                  defaultValue={product?.quantity}
                  onChange={handleEditProductChnage}
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
                <div className="pb-2">
                  <p>selected:</p>
                  <div className="flex">
                    {product?.colors?.map((color, index) => (
                      <p key={index}>
                        {/* <span>{color}</span> */}
                        <span
                          style={{ background: `${color}` }}
                          className="text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
                        >
                          {color}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

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

                  <div className=" pb-2">
                    <p>selected:</p>
                    <div className="flex">
                      {product?.sizes?.map((size, index) => (
                        <p key={index}>
                          {/* <span>{size}</span> */}
                          <span className="bg-gray-800 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            {size}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>

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
              <div className="category">
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    onChange={handleEditProductChnage}
                    name={"category"}
                    className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={product?.category?._id}>
                      {product?.category?.name}
                    </option>
                    {category?.map((cate, index) => (
                      <option key={index} value={cate?._id}>
                        {cate?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Upload Images
                  </label>
                  <div className="flex justify-center items-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col justify-center items-center w-full h-34 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col justify-center items-center pt-2 pb-2">
                        <svg
                          aria-hidden="true"
                          className="mb-3 w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        onChange={handleFileChange}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                        accept="images/*"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 mb-1 md:grid-cols-2">
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
                  defaultValue={product?.description}
                  rows="2"
                  onChange={handleEditProductChnage}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="write your description..."
                ></textarea>
              </div>
              <div
                className="previewImages"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "5px",
                  border: "1px solid gray",
                  borderRadius: "10px",
                  padding: "5px",
                  overflowX: "scroll",
                }}
              >
                {product?.images?.map((img, index) => {
                  console.log("img", img);
                  return (
                    <img
                      key={index}
                      src={img?.url}
                      width="30"
                      alt="preview"
                      onDoubleClick={() =>
                        handleDeleteCloudImage(img?.public_id, product?._id)
                      }
                    />
                  );
                })}
                {preview.map((prev, index) => {
                  return (
                    <img
                      key={index}
                      src={prev}
                      width="30"
                      alt="preview"
                      onDoubleClick={() => handleDeletePrevImage(prev)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="modalButton">
              <div className="flex items-center p-2 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={handleEditProductSubmit}
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
                  onClick={() => setOpenEditProductModal(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
              Are you sure you want to delete this product?
            </h3>
            <button
              data-modal-toggle="popup-modal"
              type="button"
              onClick={() => {
                DeleteProduct(product?._id);
                
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
    </>
  );
}

export default ProductCard;
