import axiosInstance from "../Axios/axios";
import { productConstants } from "../Constants/productConstant";

export const GetProductCategory = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get('/products/category')
      if(response){
       console.log('response', response)
        dispatch({
            type: productConstants.GET_PRODUCT_CATEGORY,
            payload: {category: response.data}  
        })
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
export const AddProductCategory = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const res = await axiosInstance.post('/products/category', data)
      console.log('res', res)
      if(res){
        dispatch({
            type: productConstants.RESPONSE_STATE,
            response: {
                state: 'SUCCESS',
                message: 'New category added'
            }  
        })
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

export const GetProducts = (isPaginated, page, size, search) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const response = await axiosInstance.get(`/products?isPaginated=${isPaginated}&page=${page}&size=${size}${search ? search : ''}`)
      if(response){
       console.log('response', response)
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

export const AddProduct = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: productConstants.LOADING,
        isLoading: true,
      });

      const res = await axiosInstance.post(`/products/add`, data)
      console.log('resData', res)

      if(res){
        dispatch({
            type: productConstants.RESPONSE_STATE,
            response: {
                state: 'SUCCESS',
                message: 'New product added'
            }  
        })
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


export const ResetProductResponse = () => {
    return async (dispatch) => {
      dispatch({
        type: productConstants.RESPONSE_STATE,
        response: {
          state: null,
          message: "",
        },
      });
    };
  };
  