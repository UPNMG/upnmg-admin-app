import axiosInstance from "../Axios/axios";
import { productConstants } from "../Constants/productConstant";

export const GetTotals = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get("/orders/totalOrders");
      if (response) {
        console.log("response", response);
        const {
          totalProducts,
          totalOrders,
          totalApprovedOrders,
          totalInitiatedOrders,
          totalRejectedOrders,
          totalShippedOrders,
          totalSubmitedOrders,
        } = response.data;
        dispatch({
          type: productConstants.GET_TOTALS,
          payload: {
            totals: {
              totalProducts,
              totalOrders,
              totalApprovedOrders,
              totalInitiatedOrders,
              totalRejectedOrders,
              totalShippedOrders,
              totalSubmitedOrders,
            },
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};
export const GetProductCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get("/products/category");
      if (response) {
        console.log("response", response);
        dispatch({
          type: productConstants.GET_PRODUCT_CATEGORY,
          payload: { category: response.data },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};
export const GetProductById = (product_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get(`/products/${product_id}`);
      if (response) {
        console.log("response", response);
        dispatch({
          type: productConstants.GET_PRODUCT_DETAILED,
          payload: { product_detailed: response.data },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const AddProductCategory = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const res = await axiosInstance.post("/products/category", data);
      console.log("res", res);
      if (res) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "New category added",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE_STATE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};
export const EditProductCategory = (category_id,data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const res = await axiosInstance.put(`/products/category/${category_id}`, data);
      console.log("res", res);
      if (res) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Category saved",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE_STATE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const DeleteCategory = (category_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      console.log("category", category_id);
      const res = await axiosInstance.delete(
        `/products/category/${category_id}`
      );
      console.log("resData", res);

      if (res) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Category deleted successfully",
          },
        });

        if (res.data.message) {
          dispatch({
            type: productConstants.RESPONSE,
            response: {
              state: "ERROR",
              message: res.data.message,
            },
          });
        } else {
          dispatch({
            type: productConstants.RESPONSE,
            response: {
              state: "SUCCESS",
              message: "Category deleted successfully",
            },
          });
        }

        // dispatch({
        //     type: productConstants.RESPONSE_STATE,
        //     response: {
        //         state: 'SUCCESS',
        //         message: 'Category deleted successfully'
        //     }
        // })
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const GetProducts = (isPaginated, page, size, category, search) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get(
        `/products?isPaginated=${isPaginated}&page=${page}&size=${size}${
          search ? search : ""
        }${category ? category : ""}`
      );
      if (response) {
        console.log("response", response);
        const {
          docs,
          page: currentPage,
          totalItems,
          totalPages,
          currentPageSize,
          links,
          size: currentSize,
        } = response.data;

        dispatch({
          type: productConstants.GET_PRODUCT,
          payload: {
            products: docs,
            paginate: {
              total: totalPages,
              totalItems,
              page: currentPage,
              size: currentSize,
              previousPage: links?.previousPage,
              currentPageSize,
              nextPage: links?.nextPage,
              previousNumber: links?.previous,
              nextNumber: links?.next,
            },
          },
        });

        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const GetOrders = (isPaginated, page, size, status, search) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get(
        `/orders/admin/orders?isPaginated=${isPaginated}&page=${page}&size=${size}${
          status ? `&status=` + status : ""
        } ${search ? `&search=` + search : ""}`
      );
      if (response) {
        console.log("response", response);
        const {
          docs,
          page: currentPage,
          totalItems,
          totalPages,
          currentPageSize,
          links,
          size: currentSize,
        } = response.data;

        dispatch({
          type: productConstants.GET_ORDERS,
          payload: {
            products: docs,
            paginate: {
              total: totalPages,
              totalItems,
              page: currentPage,
              size: currentSize,
              previousPage: links?.previousPage,
              currentPageSize,
              nextPage: links?.nextPage,
              previousNumber: links?.previous,
              nextNumber: links?.next,
            },
          },
        });

        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const UpdateOrderToInitiated = (order_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.put(
        `/orders/update/initiated/${order_id}`,
        body
      );
      if (response) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Order moved to Initiated or proccessed",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};
export const UpdateOrderToShipped = (order_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.put(
        `/orders/update/shipped/${order_id}`,
        body
      );
      if (response) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Order moved to shipped ",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};
export const UpdateOrderToApproved = (order_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.put(
        `/orders/update/approved/${order_id}`,
        body
      );
      if (response) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Order moved to approved ",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};
export const UpdateOrderToRejected = (order_id, body) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.put(
        `/orders/update/rejected/${order_id}`,
        body
      );
      if (response) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Order moved to rejected ",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const AddProduct = (data, images) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const formData = new FormData();

      formData.append("category", data?.category);
      formData.append("old_price", data?.old_price);
      formData.append("product_name", data?.product_name);
      formData.append("quantity", data?.quantity ?? 1);
      formData.append("description", data?.description);
      formData.append("new_price", data?.new_price);
      formData.append("short_description", data?.short_description);
      formData.append("banner", data?.banner);
      formData.append("featured", data?.featured);
      formData.append("supplier", data?.supplier);

      if (data?.banner_image) {
        formData.append("banner_image", data?.banner_image);
      }

      for (const image of images) {
        console.log("image", image);
        formData.append("files", image, image?.name);
      }

      for (const size of data?.sizes) {
        formData.append("sizes", size);
      }

      for (const color of data?.colors) {
        formData.append("colors", color);
      }

      console.log("formData", formData.getAll("colors"));
      console.log("formData", formData.getAll("sizes"));

      console.log("formData", formData.getAll("product_name"));
      console.log("formData", formData.getAll("files"));

      const res = await axiosInstance.post(`/products/add`, formData);
      console.log("resData", res);

      if (res) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "New product added",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};
export const EditProduct = (product_id, data, images) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      // data.files = file
      const formData = new FormData();

      formData.append("category", data?.category);
      formData.append("old_price", data?.old_price);
      formData.append("product_name", data?.product_name);
      formData.append("quantity", data?.quantity);
      formData.append("description", data?.description);
      formData.append("new_price", data?.new_price);
      formData.append("short_description", data?.short_description);
      formData.append("banner", data?.banner);
      formData.append("featured", data?.featured);
      formData.append("supplier", data?.supplier);

      for (const image of images) {
        console.log("image", image);
        formData.append("files", image, image?.name);
      }

      for (const size of data?.sizes) {
        formData.append("sizes", size);
      }

      for (const color of data?.colors) {
        formData.append("colors", color);
      }

      const res = await axiosInstance.put(`/products/${product_id}`, formData);
      // const imagesResponse = await axiosInstance.put(`/products/upload-image/${product_id}`, formData)

      console.log("resData", res);

      if (res) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Product edited",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const DeleteProduct = (product_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const res = await axiosInstance.delete(`/products/delete/${product_id}`);
      console.log("resData", res);

      if (res) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Product deleted successfully",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const DeleteProductImages = (product_id, public_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const res = await axiosInstance.delete(
        `/products/product-image/${product_id}?public_id=${public_id}`
      );
      console.log("resData", res);

      if (res) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Image deleted successfully",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

//SUPPLERS  *********** START ******* START (*)
export const GetSuppliers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get(`/supplier`);
      if (response) {
        console.log("response", response);
        dispatch({
          type: productConstants.GET_SUPPLIERS,
          payload: { suppliers: response.data },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};
export const AddSupplier = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.post(`/supplier`, data);
      if (response) {
        console.log("response", response);
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message:  "New supplier added",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const EditSupplier = (supplier_id, data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.put(`/supplier/${supplier_id}`, data);
      if (response) {
        console.log("response", response);
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message:  "New supplier added",
          },
        });
        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};

export const DeleteSupplier = (supplier_id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

     
      const res = await axiosInstance.delete(
        `/supplier/${supplier_id}`
      );
   

      if (res) {
        dispatch({
          type: productConstants.RESPONSE,
          response: {
            state: "SUCCESS",
            message: "Vendor deleted successfully",
          },
        });

        dispatch({
          type: productConstants.LOADING,
          isLoading: false,
        });
      }
    } catch (e) {
      dispatch({
        type: productConstants.RESPONSE,
        response: {
          state: "ERROR",
          message: e?.response?.data?.message ?? "Opps something bad happend",
        },
      });
      dispatch({
        type: productConstants.LOADING,
        isLoading: false,
      });
    }
  };
};


//SUPPLERS  *********** END ******* END (*)

export const ResetProductResponse = () => {
  return async (dispatch) => {
    dispatch({
      type: productConstants.RESPONSE,
      response: {
        state: null,
        message: "",
      },
    });
  };
};
